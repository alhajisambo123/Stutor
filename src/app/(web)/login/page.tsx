"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (session) router.push("/dashboard");
  }, [session, router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Login successful!");
    router.push("/dashboard");
  };

  const socialLogin = async () => {
    try {
      await signIn();
      router.push("/dashboard");
    } catch (_) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="container mx-auto">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto">
        <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Login
          </h1>

          <span className="inline-flex items-center">
            <AiFillGithub
              onClick={socialLogin}
              className="mr-3 text-4xl cursor-pointer text-black dark:text-white"
            />
            |
            <FcGoogle
              onClick={socialLogin}
              className="ml-3 text-4xl cursor-pointer"
            />
          </span>
        </div>

        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="name@company.com"
            required
            className="border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5"
            value={formData.email}
            onChange={handleInputChange}
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            required
            minLength={6}
            className="border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5"
            value={formData.password}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        </form>

        <p
          onClick={() => router.push("/auth")}
          className="text-blue-700 underline cursor-pointer text-center mt-4"
        >
          Don’t have an account? Register
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
