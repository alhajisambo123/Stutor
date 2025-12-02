"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

interface ContactFormData {
  name: string;
  contact: string;
  message: string;
}

const ContactPage = () => {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    contact: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Ghana phone number validation
  const validateGhanaNumber = (number: string) => {
    // Accepts: 024xxxxxxx, 054xxxxxxx, 059xxxxxxx, 020xxxxxxx, 027..., 026..., 028..., 050..., 0302...
    const ghanaPattern = /^(02|03|05|024|027|026|028|054|055|059|020|050)\d{7}$/;
    return ghanaPattern.test(number);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateGhanaNumber(form.contact)) {
      setPhoneError("Please enter a valid Ghana phone number.");
      return;
    }

    setStatus("Sending...");
    setPhoneError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setForm({
          name: "",
          contact: "",
          message: "",
        });
        setStatus("");
      } else {
        toast.error("Failed to send message.");
        setStatus("Error sending message.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10">

        <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">
          Contact Us
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto">
          Have a question, feedback, or need assistance?  
          Our support team is always ready to help you.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 p-5 rounded-xl mb-10">
          <p className="text-blue-700 dark:text-blue-200 font-semibold text-center leading-relaxed">
            Can&apos;t find your preferred course on our platform?  
            Send us the course name and we will help connect you to the right tutor.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              required
            />
          </div>

          {/* GHANA PHONE NUMBER */}
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300 mb-1 block">
               Phone Number
            </label>

            <input
              type="text"
              placeholder="e.g. 0541234567"
              value={form.contact}
              onChange={(e) => {
                setForm({ ...form, contact: e.target.value });
                if (!validateGhanaNumber(e.target.value)) {
                  setPhoneError("Enter a valid phone number.");
                } else {
                  setPhoneError("");
                }
              }}
              className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary outline-none transition ${
                phoneError ? "border-red-500" : ""
              }`}
              required
            />

            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Message
            </label>
            <textarea
              placeholder="Tell us how we can assist you. You may also request a specific course..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full h-36 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn-primary w-full p-4 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Send Message
          </button>

          <p className="text-center text-sm mt-3 text-gray-500 dark:text-gray-400">
            {status}
          </p>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
