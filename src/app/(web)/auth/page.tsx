"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const defaultFormData = {
  email: "",
  name: "",
  password: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const { data: session } = useSession();
  const router = useRouter();

  const inputStyles =
    "border border-gray-300 text-black rounded-lg block w-full p-3 focus:outline-none focus:ring-2 focus:ring-primary";

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOAuthLogin = async () => {
    try {
      await signIn();
      router.push("/");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await signUp(formData);
      if (user) toast.success("Account created! Please sign in.");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setFormData(defaultFormData);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 dark:bg-black">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl text-gray-600  font-bold mb-6 text-center">
          Create an Account
        </h1>

        {/* Social Login */}
        <div className="flex items-center justify-center gap-6 mb-6">
       
          <FcGoogle
            onClick={handleOAuthLogin}
            className="text-4xl cursor-pointer hover:opacity-70 transition"
          />
        </div>

        <p className="text-center text-gray-500 mb-4">Or register with email</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className={inputStyles}
            value={formData.email}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="name"
            placeholder="Full name"
            required
            className={inputStyles}
            value={formData.name}
            onChange={handleInputChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            required
            minLength={6}
            className={inputStyles}
            value={formData.password}
            onChange={handleInputChange}
          />

          <button type="submit" className="btn-primary w-full py-3 rounded-lg">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Auth;
