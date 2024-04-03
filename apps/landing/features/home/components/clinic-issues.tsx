import { clinicIssues } from "../utils";
import { SectionContainer } from "./shared/section-container";

export function ClinicIssues(): JSX.Element {
  return (
    <div className="w-screen bg-foreground">
      <SectionContainer>
        <h2 className="text-background text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-[64px] 2xl:text-[64px] font-extrabold mb-20">
          Masalah klinik saat ini
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-10">
          {clinicIssues.map((item) => (
            <div key={item.title}>
              <div className="w-10 h-3 bg-primary rounded-md" />
              <p className="font-bold text-[32px] text-background mb-2 mt-5">
                {item.title}
              </p>
              <p className="text-xl	text-background">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
