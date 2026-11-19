import { RecoveryScreen } from "@/app/_components/shared/recovery-screen";

/** Fallback for URLs that do not enter a configured locale route. */
export default function RootNotFound() {
  return (
    <RecoveryScreen
      variant="notFound"
      title="This page is off the map"
      description="We couldn’t find the page you were looking for. Head back to the hostel or explore a few useful places."
      primaryLabel="Back to home"
      homeHref="/en"
      secondaryLabel="Contact us"
      secondaryHref="/en/contact-us"
      links={[
        { label: "Our tours", href: "/en/our-tours", icon: "compass" },
        { label: "Location", href: "/en/location", icon: "map" },
      ]}
    />
  );
}
