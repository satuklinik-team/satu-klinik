import { AppFeatures } from "../components/app-features";
import { ClinicIssues } from "../components/clinic-issues";
import { DataSecurity } from "../components/data-security";
import { DemoCta } from "../components/demo-cta";
import { DigitalMarketing } from "../components/digital-marketing";
import { Digitalization } from "../components/digitalization";
import { Hero } from "../components/hero";
import { OperationalReadiness } from "../components/operational-readiness";
import { Standardization } from "../components/standardization";

export function Home(): JSX.Element {
  return (
    <>
      <Hero />
      <ClinicIssues />
      <Digitalization />
      <Standardization />
      <DigitalMarketing />
      <AppFeatures />
      <DataSecurity />
      <OperationalReadiness />
      <DemoCta />
    </>
  );
}
