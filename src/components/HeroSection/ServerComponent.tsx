
import Image from "next/image";
import Link from "next/link";

export const heading1 = (
  <>
 <p className="text-4xl sm:text-5xl font-bold text-gray-600 mb-4">
            Stutor – Your Peer Tutors at University of Ghana <span className="text-[#006400]"></span>
</p>    <p className="text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg">
     Learn from fellow Legon students who have already mastered the courses. 
  Book sessions easily and improve your grades together.
    </p>
    <Link href="/courses">
      <button className="btn-primary">Browse Tutors</button>
    </Link>
  </>
);

export const section2 = (
  <div className="md:grid hidden gap-8 grid-cols-1">
    <div className="rounded-2xl overflow-hidden h-4 8">
      <Image
        src="/images/hero12.jpg"
        alt="hero-1"
        width={300}
        height={300}
        className="img scale-animation"
      />
    </div>

    <div className="grid grid-cols-2 gap-8 h-48">
      <div className="rounded-2xl overflow-hidden">
        <Image
          src="/images/mc-business-analytics.jpg"
          alt="hero-2"
          width={300}
          height={300}
          className="img scale-animation"
        />
      </div>
      <div className="rounded-2xl overflow-hidden">
        <Image
          src="/images/hero8.jpg"
          alt="hero-4"
          width={300}
          height={300}
          className="img scale-animation"
        />
      </div>
    </div>
  </div>
);

