"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ENABLED_TRACKERS, HAS_TRACKERS, TRACKER_IDS } from "@/lib/trackers";

/**
 * Opt-in consent for optional trackers.
 * - Nothing loads before an explicit "Accept".
 * - "Reject" is as easy and as prominent as "Accept".
 * - Global Privacy Control / Do Not Track = automatic opt-out, no banner nagging.
 * - If no trackers are configured, this renders nothing at all.
 */
type Choices = Record<string, boolean>;
const KEY = "skydoze-consent-v1";
const OPEN_EVENT = "skydoze:open-privacy-choices";

function readStored(): Choices | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Choices) : null;
  } catch {
    return null;
  }
}
function store(choices: Choices) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(choices));
  } catch {
    /* storage blocked: choice applies to this page view only */
  }
}
function optOutSignal() {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true || nav.doNotTrack === "1";
}

const loaded = new Set<string>();
function addScript(src: string) {
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
}
function loadTracker(id: string) {
  if (loaded.has(id)) return;
  loaded.add(id);
  const w = window as unknown as Record<string, unknown>;
  if (id === "meta" && TRACKER_IDS.meta) {
    type Fbq = ((...args: unknown[]) => void) & { queue: unknown[]; loaded: boolean; version: string; push: unknown; callMethod?: (...a: unknown[]) => void };
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;
    w.fbq = fbq;
    w._fbq = fbq;
    addScript("https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", TRACKER_IDS.meta);
    fbq("track", "PageView");
  }
  if (id === "ga4" && TRACKER_IDS.ga4) {
    const dl = ((w.dataLayer as unknown[]) ||= []);
    const gtag = (...args: unknown[]) => {
      dl.push(args);
    };
    w.gtag = gtag;
    gtag("js", new Date());
    gtag("config", TRACKER_IDS.ga4, { anonymize_ip: true, allow_google_signals: false });
    addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(TRACKER_IDS.ga4)}`);
  }
}

export function PrivacyChoicesButton() {
  return (
    <button type="button" className="linklike" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Your Privacy Choices
    </button>
  );
}

export default function ConsentManager() {
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [gpc, setGpc] = useState(false);
  const [draft, setDraft] = useState<Choices>({});

  const apply = useCallback((choices: Choices) => {
    store(choices);
    for (const t of ENABLED_TRACKERS) if (choices[t.id]) loadTracker(t.id);
    // A withdrawn consent can't unload a script already running; a reload clears it.
    const hadLoaded = ENABLED_TRACKERS.some((t) => loaded.has(t.id) && !choices[t.id]);
    if (hadLoaded) window.location.reload();
  }, []);

  // Reads browser-only state (GPC/DNT signal, localStorage) after mount; it can't run during
  // server rendering, so setting state from this effect is intentional.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!HAS_TRACKERS) return;
    const signal = optOutSignal();
    setGpc(signal);
    const stored = readStored();
    const base: Choices = Object.fromEntries(ENABLED_TRACKERS.map((t) => [t.id, false]));
    if (stored) {
      const effective = signal ? base : { ...base, ...stored };
      setDraft(effective);
      for (const t of ENABLED_TRACKERS) if (effective[t.id]) loadTracker(t.id);
    } else if (signal) {
      store(base);
      setDraft(base);
    } else {
      setDraft(base);
      setOpen(true);
    }
    const onOpen = () => {
      setCustomize(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!HAS_TRACKERS || !open) return null;

  const all = (value: boolean) => Object.fromEntries(ENABLED_TRACKERS.map((t) => [t.id, value && !gpc]));
  const finish = (choices: Choices) => {
    setDraft(choices);
    apply(choices);
    setOpen(false);
    setCustomize(false);
  };

  return (
    <section className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title">
      <h2 id="consent-title">Your privacy choices</h2>
      <p>
        We use optional cookies to measure our ads and see how the site is used. They stay off unless you turn them on.
        Checkout is handled by Stripe and never runs our trackers. <Link href="/privacy#cookies">Learn more</Link>.
      </p>
      {gpc && (
        <p>
          <strong>We detected a Global Privacy Control or Do Not Track signal from your browser, so these stay off.</strong>
        </p>
      )}
      {customize && (
        <div>
          {ENABLED_TRACKERS.map((t) => (
            <label key={t.id} className="consent-option">
              <input
                type="checkbox"
                checked={Boolean(draft[t.id])}
                disabled={gpc}
                onChange={(e) => setDraft({ ...draft, [t.id]: e.target.checked })}
              />
              <span>
                <strong>
                  {t.name} ({t.category})
                </strong>
                <br />
                {t.purpose} Provided by {t.company}.
              </span>
            </label>
          ))}
        </div>
      )}
      <div className="consent-actions">
        <button type="button" className="btn btn-ghost" onClick={() => finish(all(false))}>
          Reject all
        </button>
        {customize ? (
          <button type="button" className="btn btn-primary" onClick={() => finish(gpc ? all(false) : draft)}>
            Save choices
          </button>
        ) : (
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setCustomize(true)}>
              Customize
            </button>
            <button type="button" className="btn btn-primary" onClick={() => finish(all(true))} disabled={gpc}>
              Accept all
            </button>
          </>
        )}
      </div>
    </section>
  );
}
