

"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import ThemeContext from "@/context/themeContext";


import { FaUserCircle } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

import Image from 'next/image';

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 py-6 px-4 container mx-auto text-xl bg-white dark:bg-black transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-tertiary-dark text-2xl">
            Stutor
          </Link>
          <ul className='flex items-center ml-5'>
          <li className='flex items-center'>
            {session?.user ? (
              <Link href={`/users/${session.user.id}`}>
                {session.user.image ? (
                  <div className='w-10 h-10 rounded-full overflow-hidden'>
                    <Image
                      src={session.user.image}
                      alt={session.user.name!}
                      width={40}
                      height={40}
                      className='scale-animation img'
                    />
                  </div>
                ) : (
                  <FaUserCircle className='cursor-pointer' />
                )}
              </Link>
            ) : (
              <Link href='/auth'>
                <FaUserCircle className='cursor-pointer' />
              </Link>
            )}
          </li>
         
        </ul>
          {darkTheme ? (
            <MdOutlineLightMode
              className="cursor-pointer text-2xl"
              onClick={() => {
                setDarkTheme(false);
                localStorage.removeItem("cou-theme");
              }}
            />
          ) : (
            <MdDarkMode
              className="cursor-pointer text-2xl"
              onClick={() => {
                setDarkTheme(true);
                localStorage.setItem("cou-theme", "true");
              }}
            />
          )}
        </div>
        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 font-bold btn-primary">
          <li className="hover:-translate-y-2 duration-500 transition-all">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:-translate-y-2 duration-500 transition-all">
            <Link href="/courses">Tutors</Link>
          </li>
          <li className="hover:-translate-y-2 duration-500 transition-all">
            <Link href="/about">Become a Tutor</Link>
          </li>
          <li className="hover:-translate-y-2 duration-500 transition-all">
            <Link href="/auth">How it works</Link>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Hamburger Button */}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 font-bold btn-primary">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/courses" onClick={() => setMenuOpen(false)}>
            Tutors
          </Link>
          <Link href="/becomeatutor" onClick={() => setMenuOpen(false)}>
            Become a Tutor
          </Link>

          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About us
          </Link>
          {/* <li className="hover:-translate-y-2 duration-500 transition-all">
            <Link href="/about">About us</Link>
          </li> */}

          {/* <li className="hover:-translate-y-2 duration-500 transition-all">
            <Link href="/about">Become a Tutor</Link>
          </li> */}
          {/* <li className="hover:-translate-y-2 duration-500 transition-all">
            <Link href="/about">How it works</Link>
          </li> */}
        </div>
      )}
    </header>
  );
};

export default Header;


















