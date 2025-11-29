
// "use client";

// import { useSession, signIn } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   // Redirect to user's profile page after login
//   useEffect(() => {
//     if (session?.user) {
//       router.push(`/users/${session.user.id}`);
//     }
//   }, [session, router]);

//   if (status === "loading") {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-4">
//       <h1 className="text-2xl font-bold">Login to continue</h1>
//       <button
//         onClick={() => signIn("credentials")}
//         className="px-6 py-2 bg-blue-600 text-white rounded"
//       >
//         Login
//       </button>
//     </div>
//   );
// }





























"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputStyles =
    "border border-gray-300 text-black rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-primary";

  // Redirect after logging in
  useEffect(() => {
    if (session?.user) {
      router.push(`/users/${session.user.id}`);
    }
  }, [session, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className={inputStyles}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className={inputStyles}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button type="submit" className="btn-primary w-full py-3 rounded-lg">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
