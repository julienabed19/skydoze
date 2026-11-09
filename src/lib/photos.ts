import type { StaticImageData } from "next/image";
import comparePillow from "../../public/products/compare-pillow.jpg";
import compareSkydoze from "../../public/products/compare-skydoze.jpg";
import heroWrap from "../../public/products/hero-wrap.jpg";
import set from "../../public/products/set.jpg";
import step1 from "../../public/products/step-1.jpg";
import step2 from "../../public/products/step-2.jpg";
import step3 from "../../public/products/step-3.jpg";
import step4 from "../../public/products/step-4.jpg";

/**
 * Product photos supplied by the store owner (Nov 2026). Text that was baked into the
 * original graphics has been cropped out and rebuilt as real HTML so it's readable by
 * screen readers and search engines, and so every claim is one we can stand behind.
 */
export type Photo = { src: StaticImageData; alt: string };

export const PHOTOS = {
  set: { src: set, alt: "The SkyDoze 3-in-1 set in black: arm wrap, sleep mask, head support and zip carry pouch" },
  hero: { src: heroWrap, alt: "Woman asleep in an airplane seat wearing the SkyDoze sleep mask and black arm wrap" },
  steps: [
    { src: step1, alt: "Hands buckling the head support's strap around an airplane seat headrest" },
    { src: step2, alt: "Hands hanging the black arm wrap over the head support on the headrest" },
    { src: step3, alt: "Woman in a seat with the sleep mask over her eyes, attached to the head support" },
    { src: step4, alt: "Woman relaxing by an airplane window with her arms tucked into the wrap" },
  ],
  compareSkydoze: { src: compareSkydoze, alt: "Traveler using the SkyDoze Blanket Wrap and sleep mask in a plane seat" },
  comparePillow: { src: comparePillow, alt: "Black-and-white photo of a traveler asleep with a U-shaped neck pillow" },
} satisfies Record<string, Photo | Photo[]>;

export const GALLERY: Photo[] = [PHOTOS.set, PHOTOS.hero, PHOTOS.steps[3], PHOTOS.steps[0]];
