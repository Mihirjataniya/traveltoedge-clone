'use client'

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function AdminLayout({children}){
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/alpha-admin/signin');
      }
    }, [status, router]);

    return (children)
}