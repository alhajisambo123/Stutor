"use client";

import React from "react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Effective Date: 2nd December, 2025
        </p>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
            <p>
              Welcome to Stutor !. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website (the “Site”) and services. 
              By using our Site, you agree to this Privacy Policy. If you do not agree, please do not use our Site.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>

            <h3 className="font-semibold mb-1">1.1 Personal Information</h3>
            <p>Includes information that identifies you:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number </li>
                            <li>Some other necessary informations </li>

            </ul>

            <h3 className="font-semibold mt-4 mb-1">1.2 Non-Personal Information</h3>
            <p>Includes data that does not directly identify you:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website URLs</li>
              <li>Pages viewed and time spent on our Site</li>
            </ul>

            <h3 className="font-semibold mt-4 mb-1">1.3 Information from Tutors and Students</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>Academic preferences, schedules, and goals</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Facilitate connections between students and tutors</li>
              <li>Schedule and manage lessons</li>
              <li>Improve platform experience through personalized content</li>
              <li>Analyze usage trends to improve services</li>
              <li>Ensure safety and compliance by screening tutors and providing monitoring access to parents</li>
            </ul>
          </section>

          {/* How We Protect Your Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">3. How We Protect Your Information</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>SSL encryption to protect data</li>
              <li>Regular security audits and updates</li>
              <li>Restricted access to personal data to authorized personnel only</li>
            </ul>
          </section>

          {/* Sharing Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Sharing Your Information</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li><strong>With Your Consent:</strong> When you give explicit permission</li>
              <li><strong>With Service Providers:</strong> To trusted third-party vendors (e.g., payment processors)</li>
              <li><strong>Legal Obligations:</strong> When required by law or to protect legal rights</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Cookies and Tracking</h2>
            <p>
              We use cookies to enhance your browsing experience. Cookies are small data files stored on your device. You can adjust your browser settings to decline cookies if preferred.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">6. Third-Party Links</h2>
            <p>
              Our Site may contain links to third-party websites. STutor is not responsible for the privacy practices or content of these sites. Review their privacy policies before sharing personal information.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">7. Data Retention</h2>
            <p>
              Personal information is retained only as long as necessary to fulfill purposes outlined in this Privacy Policy or as required by law.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">8. Your Rights</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Access, update, or delete personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
            <p>Contact us at <strong>admin@stutor.com</strong> to exercise these rights.</p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this policy occasionally. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
            <p>Address: University of Ghana, Legon, Accra, Ghana</p>
            <p>Email: <strong>@stutor88@gmail.com</strong></p>
            <p>Support Line: +233 54 703 8272/ 0505650521 (Mon-Sun: 8 AM – 6 PM)</p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
