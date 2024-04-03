import { ClinicIssues } from "../components/clinic-issues";
import { DigitalMarketing } from "../components/digital-marketing";
import { Digitalization } from "../components/digitalization";
import { Hero } from "../components/hero";
import { Standardization } from "../components/standardization";

export function Home(): JSX.Element {
  return (
    <>
      <Hero />
      <ClinicIssues />
      <Digitalization />
      <Standardization />
      <DigitalMarketing />
    </>
  );
}
