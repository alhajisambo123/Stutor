
"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to user's profile page after login
  useEffect(() => {
    if (session?.user) {
      router.push(`/users/${session.user.id}`);
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Login to continue</h1>
      <button
        onClick={() => signIn("credentials")}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Login
      </button>
    </div>
  );
}
