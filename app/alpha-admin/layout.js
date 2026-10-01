import AdminShell from "./AdminShell";

// Keep the admin panel out of search results.
export const metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
