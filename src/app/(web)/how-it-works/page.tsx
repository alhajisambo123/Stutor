"use client";

import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">
          How Stutor Works
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          {/* For Students */}
          <h2 className="text-2xl font-bold mb-4 text-black text-center">
            For Students
          </h2>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-black">
              1. Browse Tutors Without Logging In
            </h3>
            <p>
              Students at the University of Ghana can browse tutors directly, without creating an account. 
              You can search by course, department, or year level to find the right tutor for your needs.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-black">
              2. View Course & Tutor Details
            </h3>
            <p>
              Each course displays information including: course name, description of topics, 
              cost, tutor picture, session details, tutor bio, and experience. 
              This helps you choose the best tutor for your academic challenges.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-black">
              3. Book a Session
            </h3>
            <p>
              When you find a tutor, click the &quot;Book&quot; button. Your booking message is automatically sent to the tutor. 
              The tutor will contact you by phone or your preferred method to discuss arrangements.
            </p>
          </div>

          <hr className="my-8" />

          {/* For Tutors */}
          <h2 className="text-2xl font-bold mb-4 text-black text-center">
            For Tutors
          </h2>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-black">
              4. Create a Tutor Account
            </h3>
            <p>
              New tutors must register and log in to create courses. This ensures that every course is linked to a verified tutor.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-black">
              5. Add Course Details
            </h3>
            <p>
              Tutors can create courses with all necessary information, including course name, description, price, 
              session details, tutor picture, experience, and a short bio. Images can also be uploaded for better visibility.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-black">
              6. Receive Bookings from Students
            </h3>
            <p>
              When a student books a session, a message is sent to the tutor. The tutor then contacts the student directly 
              to finalize the session and provide help.
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-700">
          Are you a tutor?{" "}
          <Link href="/auth" className="text-primary font-semibold">
            Create a tutor account
          </Link>
        </p>
      </div>
    </section>
  );
}
