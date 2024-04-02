import { ClinicIssues } from "../components/clinic-issues";
import { Digitalization } from "../components/digitalization";
import { Hero } from "../components/hero";

export function Home(): JSX.Element {
  return (
    <>
      <Hero />
      <ClinicIssues />
      <Digitalization />
    </>
  );
}
