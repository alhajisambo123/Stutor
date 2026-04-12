import Image from "next/image";

const Services = () => {
  return (
    <div className="mx-auto container py-16">

      {/* ====================== SERVICES SECTION ====================== */}
      

       <div className="text-center mb-12 text-gray-600">
          <h2 className="text-4xl font-bold mb-4">          What We Offer at Stutor
</h2>
          <p className="text-lg text-gray-600">          Tailored academic support designed specifically for University of Ghana students
</p>
        </div>

      <div className="flex flex-col gap-20">
        
        {/* Service 1 - One-on-One */}
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full md:w-1/2">
            <Image
              alt="One-on-One Tutoring at University of Ghana"
              className="img rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              src="/images/one-one.jpg"
              width={550}
              height={370}
            />
          </div>
          <div className="w-full md:w-1/2 text-center text-gray-600 md:text-left">
            <h3 className="text-3xl font-bold mb-5">
              Personalized One-on-One Tutoring
            </h3>
            <p className="text-gray-600 text-[17px] leading-relaxed">
              Get tailored support from fellow Legon students who understand your 
              struggles. Learn difficult topics in a friendly, patient, and 
              approachable way — at your own pace.
            </p>
          </div>
        </div>

        {/* Service 2 - Group Study */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 lg:gap-16">
          <div className="w-full md:w-1/2">
            <Image
              alt="Collaborative Group Study Sessions at Legon"
              className="img rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              src="/images/group.jpg"
              width={550}
              height={370}
            />
          </div>
          <div className="w-full md:w-1/2 text-center text-gray-600 md:text-left">
            <h3 className="text-3xl font-bold mb-5">
              Collaborative Group Study Sessions
            </h3>
            <p className="text-gray-600 text-[17px] leading-relaxed">
              Study together with other University of Ghana students in small, 
              interactive groups. Discuss past questions, share ideas, and make 
              learning more engaging and effective.
            </p>
          </div>
        </div>

        {/* Service 3 - Exam Preparation */}
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full md:w-1/2">
            <Image
              alt="Exam Preparation at University of Ghana"
              className="img rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              src="/images/examprep.jpg"
              width={550}
              height={370}
            />
          </div>
          <div className="w-full md:w-1/2 text-center text-gray-600 md:text-left">
            <h3 className="text-3xl font-bold mb-5">
              Targeted Exam Preparation
            </h3>
            <p className="text-gray-600 text-[17px] leading-relaxed">
              Get focused help with past papers, marking schemes, tough topics, 
              and smart exam strategies so you can walk into your exams feeling 
              confident and well-prepared.
            </p>
          </div>
        </div>

      </div>

      {/* ====================== WHY STUTOR SECTION ====================== */}
      <div className="mt-24 py-16 bg-gray-50 rounded-3xl text-gray-600 dark:bg-black">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-600">Why Choose Stutor?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built by Legon students, for Legon students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 text-gray-600">
          <div className="bg-white p-8 rounded-2xl shadow-sm dark:bg-black">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="font-bold text-xl mb-3">100% University of Ghana Students</h3>
            <p className="text-gray-600">
              All our tutors are current or recent Legon students who understand the curriculum, 
              lecturers, and examination style.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm dark:bg-black">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="font-bold text-xl mb-3">Verified Profiles & Ratings</h3>
            <p className="text-gray-600">
              Read honest reviews from other UG students before booking any session.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm dark:bg-black">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="font-bold text-xl mb-3">Affordable & Flexible</h3>
            <p className="text-gray-600">
              Student-friendly prices with flexible timing — including evenings and weekends.
            </p>
          </div>
        </div>
      </div>

      {/* ====================== TESTIMONIALS SECTION ====================== */}
      <div className="mt-24">
        <div className="text-center mb-12 text-gray-600">
          <h2 className="text-4xl font-bold mb-4">What Legon Students Are Saying</h2>
          <p className="text-lg text-gray-600">Real experiences from real University of Ghana students</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm dark:bg-black">
            <p className="text-gray-600 italic mb-6 leading-relaxed">
             &quot; Thanks to my Stutor for Financial Accounting, I finally understood the difficult parts. 
              My quiz score jumped from 14/30 to 27/30! Highly recommended.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/student1.jpeg"
                  alt="Akosua Mensah"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-500"> Kojo Appiah</p>
                <p className="text-sm text-gray-500">Level 300, Accounting</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm dark:bg-black">
            <p className="text-gray-600 italic mb-6 leading-relaxed">
             &quot;The group sessions are the best decision I made this semester. Studying alone was stressful, 
              but discussing with others made everything clearer.&quot;
            </p>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/student2.jpg"
                  alt="Kojo Appiah"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-500">Akosua Mensah</p>
                <p className="text-sm text-gray-500">Level 200, Computer Engineering</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm dark:bg-black">
            <p className="text-gray-600 italic mb-6 leading-relaxed">
              &quot; My tutor explained Microeconomics so well that I actually started enjoying the course. 
              I went from barely passing to getting A in my mid-semester exams! &quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/student3.jpg"
                  alt="Nana Yaa Asante"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-500">Nana Yaa Asante</p>
                <p className="text-sm text-gray-500">Level 300, Economics</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Services;