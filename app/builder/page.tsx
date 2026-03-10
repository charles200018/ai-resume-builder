import StepController from "@/components/builder/StepController";
import PageShell from "@/components/layout/PageShell";

export const metadata = {
    title: "Builder | Resume AI",
};

export default async function BuilderPage() {
    return (
        <PageShell>
        <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
            <StepController />
        </div>
        </PageShell>
    );
}
