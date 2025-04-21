'use client'
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import { useSession } from "next-auth/react"; // For session-related logic
import Loading from "@/components/Loading"; // Optional: add a loading screen
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      {/* Admin-specific layout with session context */}
      <div className="bg-gray-100 mt-20 min-h-screen">
        <div className="p-4 bg-indigo-600 text-white">
          <Link href={'/alpha-admin/dashboard'} className="text-2xl">Travel to Edge - Admin Panel</Link>
        </div>

        {/* Optionally show a loading state while checking the session */}
        <Loading />

        <main className="p-6">{children}</main>

      </div>
    </SessionProvider>
  );
}
