import Link from "next/link";

export default function NotFound() {
  return (
    <section className="legal-hero" style={{ paddingBottom: 96 }}>
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>This page dozed off.</h1>
        <p>We couldn&apos;t find what you were looking for.</p>
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
