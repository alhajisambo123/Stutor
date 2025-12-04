import Link from "next/link";
import {
  BsTelephoneOutbound,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="mt-16 bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Logo & About */}
          <div className="flex-1">
            <Link href="/" className="font-black text-3xl">
              Stutor
            </Link>
            <p className="mt-4 text-gray-200 max-w-sm">
              Stutor is a platform for University of Ghana students to find 
              peer tutors and promote academic excellence. Browse tutors, 
              check their courses, and book sessions directly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
            
              <li>
                <Link href="/How-it-works" className="hover:text-gray-300">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
                <li>
                <Link href="/privacy-policy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-gray-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Course Categories */}
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-4">Course Categories</h4>
            <ul className="space-y-2">
              <li>Basic & Applied Sciences</li>
              <li>Health Sciences</li>
              <li>Engineering</li>
              <li>Humanities</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <p className="flex items-center gap-2">
              <BsTelephoneOutbound /> 0547038272/0505650521
            </p>
            <p className="flex items-center gap-2 mt-2">
              <BiMessageDetail /> stutor88@gmail.com
            </p>
            <p className="mt-2">Legon, Accra</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start mt-8 space-x-6">
          <Link href="https://www.facebook.com" target="_blank">
            <BsFacebook className="text-2xl hover:text-blue-600 transition duration-300" />
          </Link>
          <Link href="https://www.twitter.com" target="_blank">
            <BsTwitter className="text-2xl hover:text-blue-400 transition duration-300" />
          </Link>
          <Link href="https://www.instagram.com" target="_blank">
            <BsInstagram className="text-2xl hover:text-pink-600 transition duration-300" />
          </Link>
          <Link href="https://www.linkedin.com" target="_blank">
            <BsLinkedin className="text-2xl hover:text-blue-700 transition duration-300" />
          </Link>
        </div>

        <p className="text-center text-gray-400 mt-10">
          &copy; {new Date().getFullYear()} Stutor. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
