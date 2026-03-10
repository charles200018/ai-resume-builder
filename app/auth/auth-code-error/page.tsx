import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function AuthCodeError() {
    return (
        <main className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-surface)" }}>
            <div className="glass-card p-8 max-w-md text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle size={32} className="text-red-400" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
                <p className="text-gray-400 mb-6">
                    Something went wrong during sign in. This could happen if:
                </p>
                <ul className="text-left text-sm text-gray-400 mb-6 space-y-2">
                    <li>• The authorization code has expired</li>
                    <li>• You denied access to your Google account</li>
                    <li>• There was a network issue</li>
                </ul>
                <Link href="/">
                    <button className="btn-primary w-full">
                        Return Home
                    </button>
                </Link>
            </div>
        </main>
    );
}
