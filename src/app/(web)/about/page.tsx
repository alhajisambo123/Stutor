"use client";

export default function AboutUsPage() {
  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">
          About Stutor
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Stutor is a student-built academic support platform created by a team 
            from the University of Ghana. Our mission is to help students succeed 
            by connecting them with peers who have excelled in specific courses.
          </p>

          <p>
            We realized that many students struggle not because they lack ability, 
            but because they need the right guidance from someone who understands 
            the course from a student&apos;s perspective. Stutor bridges that gap.
          </p>

          <h2 className="text-2xl font-semibold text-black mt-6">
            Our Purpose
          </h2>

          <p>
            Stutor was developed to promote academic excellence on the University 
            of Ghana campus. We believe that learning is stronger when students 
            support each other. The platform allows students to find peer tutors 
            easily, without creating an account, and book help instantly.
          </p>

          <h2 className="text-2xl font-semibold text-black mt-6">
            What We Offer
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>Search for tutors without logging in</li>
            <li>Explore detailed course descriptions</li>
            <li>View tutor profiles, sessions, experience, and pricing</li>
            <li>Book instantly and receive a follow-up call from the tutor</li>
            <li>Tutors can register, log in, and create courses</li>
            <li>Built specifically for the University of Ghana community</li>
          </ul>

          <h2 className="text-2xl font-semibold text-black mt-6">
            Built by Students, for Students
          </h2>

          <p>
            Stutor was created by passionate University of Ghana students 
            who wanted to solve a real problem affecting their peers. 
            Every feature on this platform is designed with student needs in mind.
          </p>

          <p>
            We are committed to improving Stutor continuously and helping 
            students reach their academic goals.
          </p>
        </div>

        <p className="text-center mt-10 text-gray-600">
          Thank you for using Stutor. Together, we learn better.
        </p>
      </div>
    </section>
  );
}
