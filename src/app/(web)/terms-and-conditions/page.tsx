"use client";

import React from "react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        
        <h1 className="text-3xl font-bold mb-6 text-center">Terms & Conditions</h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Please read these terms carefully before using the Stutor platform.
        </p>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

          {/* INTRO */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
            <p>
              Welcome to Stutor. By accessing or using www.stutor.com (“Website”), you agree to be bound 
              by these Terms and Conditions. These Terms govern your use of our platform and services.
              STutor reserves the right to revise these Terms at any time by posting updates on the Website.
            </p>
          </section>

          {/* PURPOSE */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Purpose of the Website</h2>
            <p>
              Stutor connects students and tutors. The platform allows users to create profiles, book lessons,
              and access academic support. Stutor acts only as an intermediary between students and independent tutors.
            </p>
          </section>

          {/* REGISTRATION */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">2. Registration, Access and Termination</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>Registration for tutors or students can only be completed through this Website.</li>
              <li>All information provided must be truthful and accurate.</li>
       
              <li>
                Both the tutors and Stutor may terminate the account at any time. tutors may request termination via 
                the contact form or email.
              </li>
              <li>
                Stutor may suspend or delete accounts that violate these Terms.
              </li>
            </ul>
          </section>

          {/* RESTRICTIONS */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">3. Restrictions and Limitations</h2>

            <p className="mb-2">Users are strictly prohibited from:</p>

            <ul className="list-disc ml-5 space-y-2">
              <li>Providing false, misleading, or doctored information.</li>
              <li>Using explicit, offensive, or inappropriate language or content.</li>
              <li>Sharing personal contact information directly with other users.</li>
              <li>Using the platform for non-academic or non-educational purposes.</li>
              <li>
              </li>
            </ul>
          </section>

          {/* TUITION */}
           

          <section>
           
          </section>

          {/* STATUS */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">6. Student and Tutor Status</h2>
            <p className="mb-3">
              Students engage Stutor to provide services delivered by independent student tutors. Tutors are 
              not employees of Stutor; they operate as independent contractors.
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Stutor does not control how tutors deliver their lessons.</li>
              <li>
                Tutors may not make contracts or commitments on behalf of Stutor unless permitted in writing.
              </li>
            </ul>
          </section>

          {/* USER CONTENT */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">7. Your Content</h2>
            <p>
              Any media, text, or content uploaded by users (“Your Content”) grants Stutor a non-exclusive, 
              global license to use, publish, and display it. Content must not violate third-party rights.
              STutor reserves the right to remove any content at any time.
            </p>
          </section>

          {/* INTELLECTUAL PROPERTY */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">8. Intellectual Property Rights</h2>
            <p>
              All Website content (excluding user content) is owned by Stutor and/or its licensors.
              Users are granted a limited license for viewing purposes only.
            </p>
          </section>

          {/* NO WARRANTIES */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">9. No Warranties</h2>
            <p>
              Stutor provides the Website “as is” without any warranties regarding accuracy, reliability, 
              or fitness for purpose.
            </p>
          </section>

          {/* LIABILITY */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">10. Limitation of Liability</h2>
            <p>
              Stutor, its directors, and employees are not liable for any damages arising from the use of 
              this Website.
            </p>
          </section>

          {/* INDEMNIFICATION */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">11. Indemnification</h2>
            <p>
              Users agree to indemnify Stutor from any claims arising from misuse of the Website or violation of these Terms.
            </p>
          </section>

          {/* SEVERABILITY */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">12. Severability</h2>
            <p>
              If any part of the Terms becomes invalid, the remaining sections will remain in full effect.
            </p>
          </section>

          {/* VARIATION */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">13. Variation of Terms</h2>
            <p>
              Stutor may update these Terms at any time. Users are encouraged to check periodically for changes.
            </p>
          </section>

          {/* ASSIGNMENT */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">14. Assignment</h2>
            <p>
              Stutor may transfer or subcontract its rights at any time. Users may not transfer their obligations.
            </p>
          </section>

          {/* ENTIRE AGREEMENT */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">15. Entire Agreement</h2>
            <p>
              These Terms represent the full agreement between Stutor and the User, superseding all prior agreements.
            </p>
          </section>

          {/* GOVERNING LAW */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">16. Governing Law & Jurisdiction</h2>
            <p>
              These Terms are governed by the laws of Ghana. Any disputes shall be resolved under the jurisdiction 
              of the courts of Ghana.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsPage;
