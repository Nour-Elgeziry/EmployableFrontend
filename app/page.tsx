"use client";

import Link from "next/link";
import Image from "next/image";

import { logoutUser } from "./routes/user";
import { useEffect, useState } from "react";

export default function Home() {
  // get user role from local storage
  const [role, setRole] = useState<string>();

  useEffect(() => {
    const userObj = localStorage.getItem("user");
    if (userObj) {
      const user = JSON.parse(userObj);
      setRole(user.role);
    }
  }, []);

  return (
    <main className="bg-white dark:bg-gray-900">
      {/* Header Section */}
      <header className="flex items-center justify-between h-16 px-4 shrink-0 md:px-6 bg-gradient-to-r from-blue-500 to-teal-400 dark:from-blue-900 dark:to-gray-800">
        {/* Navigation */}
        <nav className="w-full justify-between  gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {/* Logo */}
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="#"
          >
            <Image
              src="/logo_transparent.png"
              alt="Employable Logo"
              width={96}
              height={96}
            />
          </Link>
          {/* Sign in and Sign Up Buttons */}
          <div className="flex gap-4 justify-end">
            {role ? (
              <>
                <Link href="/account/signin">
                  <button
                    onClick={() => {
                      // clear local storage user
                      localStorage.removeItem("user");
                      logoutUser;
                    }}
                    className="btn bg-blue-500 hover:bg-blue-600 dark:bg-blue-800 border-0"
                  >
                    Sign out
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/account/signin">
                  <button className="btn bg-green-500 hover:bg-green-600 dark:bg-green-800 hover:dark:bg-green-600 border-0">
                    Sign in
                  </button>
                </Link>
                <Link href="/account/signup">
                  <button className="btn bg-blue-500 hover:bg-blue-600 dark:bg-blue-800 border-0">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      {/* Main Content Section */}
      <section className="h-screen flex flex-col justify-center items-center py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-500 to-green-500 dark:from-blue-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          {/* Title Section */}
          <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-200 dark:text-blue-200">
              <span className="block">Revolutionizing Job Seeking</span>
            </h2>
          </div>
          {/* Employer and Job Seeker Sections */}
          <div className="grid items-center justify-center gap-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Employer Section */}
              <div className="bg-[F0F5F9] rounded-lg shadow-md p-6 flex flex-col justify-center">
                <h2 className="text-gray-900 dark:text-gray-200 font-bold text-xl mb-4">
                  Employer looking for talent?
                </h2>
                <p className="text-gray-700 dark:text-gray-400">
                  Welcome to our revolutionary platform where employers take the
                  reins in the job search process. Say goodbye to sifting
                  through endless applications – now, you are in control.
                </p>
              </div>
              {/* Job Seeker Section */}
              <div className="bg-[FDF2E9] rounded-lg shadow-md p-6 flex flex-col justify-center lg:ml-auto lg:mr-auto">
                <h2 className="text-gray-900 dark:text-gray-200 font-bold text-xl mb-4">
                  Job seeker looking for work?
                </h2>
                <p className="text-gray-700 dark:text-gray-400">
                  Are you tired of the traditional job hunt? Take charge of your
                  career journey with us. No more mass applications, just
                  opportunities tailored to your skills and aspirations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
