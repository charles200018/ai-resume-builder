import { getUser } from "@/lib/supabase/serverClient";
import TopNav from "@/components/layout/TopNav";

export default async function PageShell({ children }: { children: React.ReactNode }) {
    const user = await getUser();

    return (
        <>
            <TopNav user={user} />
            {children}
        </>
    );
}
