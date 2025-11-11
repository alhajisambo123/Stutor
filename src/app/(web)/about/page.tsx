"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  images: File[];
}

const RegistrationDetails: React.FC = () => {
  const [form, setForm] = useState<RegistrationFormData>({
    name: "",
    email: "",
    phone: "",
    images: [],
  });
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  // ✅ Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.error("You can only upload up to 3 images.");
      return;
    }
    setForm({ ...form, images: files });
  };

  // ✅ Handle form submission (send to your email API)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      form.images.forEach((file, index) =>
        formData.append(`image${index + 1}`, file)
      );

      // 🔹 Replace with your backend/email endpoint
      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Registration submitted successfully!");
        setForm({ name: "", email: "", phone: "", images: [] });
        setShowForm(false);
        setStatus("");
      } else {
        toast.error("Failed to submit registration.");
        setStatus("Error submitting form.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
      setStatus("Error submitting form.");
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <div className="md:grid md:grid-cols-12 gap-10 px-3">
        <div className="md:col-span-8 md:w-full">
          <div className="shadow dark:shadow-white rounded-lg p-6">
            <h2 className="font-bold text-3xl mb-6 text-center text-primary">
              Member Registration
            </h2>

            {/* ✅ Toggle registration form */}
            {!showForm ? (
              <div className="text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  Register Now
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 border rounded focus:ring focus:ring-primary"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-3 border rounded focus:ring focus:ring-primary"
                  required
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-3 border rounded focus:ring focus:ring-primary"
                  required
                />

                <div>
                  <label className="block mb-2 font-medium">
                    Upload up to 3 images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary text-white w-full py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  Submit Registration
                </button>
                <p className="text-center text-sm mt-2">{status}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;
