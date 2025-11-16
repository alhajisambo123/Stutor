"use client";
import { useState } from "react";

export default function RegisterTutor() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const payload = {
      fullName: form.get("fullName"),
      email: form.get("email"),
      phone: form.get("phone"),
      courseName: form.get("courseName"),
      description: form.get("description"),
      price: Number(form.get("price")),
      discount: Number(form.get("discount")),
      type: form.get("type"),
      session: form.get("session"),
      experience: form.get("experience"),
      coverImage: { asset: { _ref: form.get("coverImage") } },
      images: [],
    };

    const res = await fetch("/api/create-student-tutor", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(data.message);

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-lg mx-auto p-6">
      <input name="fullName" placeholder="Full Name" required className="input" />
      <input name="email" placeholder="Email" required className="input" />
      <input name="phone" placeholder="Phone Number" required className="input" />
      <input name="courseName" placeholder="Course Name" required className="input" />
      <textarea name="description" placeholder="Description" className="textarea" />
      <textarea name="experience" placeholder="Experience" className="textarea" />
      <input name="price" type="number" placeholder="Price" className="input" />
      <input name="discount" type="number" placeholder="Discount" className="input" />
      <input name="session" placeholder="Tutor Session" className="input" />
      <input name="type" placeholder="Course Type" className="input" />

      {/* Cover Image should be uploaded via Sanity uploader */}
      <input name="coverImage" placeholder="Sanity Asset ID" className="input" />

      <button disabled={loading} className="btn-primary">
        {loading ? "Submitting..." : "Register Tutor"}
      </button>
    </form>
  );
}
