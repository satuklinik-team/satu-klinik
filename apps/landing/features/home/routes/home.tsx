import { ClinicIssues } from "../components/clinic-issues";
import { Features } from "../components/features";
import { Hero } from "../components/hero";

export function Home(): JSX.Element {
  return (
    <>
      <Hero />
      <ClinicIssues />
      <Features />
    </>
  );
}
