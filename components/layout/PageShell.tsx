import { getUser } from "@/lib/supabase/serverClient";
import Sidebar from "@/components/layout/Sidebar";

export default async function PageShell({ children }: { children: React.ReactNode }) {
    const user = await getUser();

    return (
        <>
            <Sidebar user={user} />
            {children}
        </>
    );
}
