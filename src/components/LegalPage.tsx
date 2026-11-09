import { BUSINESS } from "@/lib/business";

export function LegalPage({ title, intro, children, updated = true }: { title: string; intro?: React.ReactNode; children: React.ReactNode; updated?: boolean }) {
  return (
    <>
      <section className="legal-hero">
        <div className="container">
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
          {updated && <p>Last updated: {BUSINESS.policiesUpdated}</p>}
        </div>
      </section>
      <article className="container prose">{children}</article>
    </>
  );
}

/** Shows a TODO_ business value as a highlighted placeholder so it can't be missed before launch. */
export function Fact({ value, label }: { value: string; label: string }) {
  if (value.startsWith("TODO_")) return <mark className="todo">[{label}: add before launch]</mark>;
  return <>{value}</>;
}

export function Email() {
  return <a href={`mailto:${BUSINESS.supportEmail}`}>{BUSINESS.supportEmail}</a>;
}
