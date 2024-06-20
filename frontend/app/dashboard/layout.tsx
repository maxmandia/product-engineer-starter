import { DashboardProvider } from "@/context/dashboard-context";
import Header from "@/components/header";

export default function PriorAuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardProvider>
            <Header />
            <div className="w-full max-w-6xl mx-auto">{children}</div>
        </DashboardProvider>
    );
}
