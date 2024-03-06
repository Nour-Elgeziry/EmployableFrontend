import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

import { logoutUser } from "@/app/routes/user";
const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className="navbar h-0 bg-gradient-to-r from-blue-500 to-teal-400 dark:from-blue-900 dark:to-gray-800">
      <div className="navbar-start">
        <Link
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          href="/"
        >
          <Image
            src="/logo_transparent.png"
            alt="Employable Logo"
            width={96}
            height={96}
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a
              className={
                pathname === "/employer/dashboard"
                  ? " bg-slate-200 dark:bg-slate-800"
                  : ""
              }
              href="/employer/dashboard"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              className={
                pathname === "/employer/shortlisted" ? "bg-slate-200" : ""
              }
              href="/employer/shortlisted"
            >
              Shortlisted
            </a>
          </li>
          <li>
            <a
              className={
                pathname === "/employer/contacted" ? "bg-slate-200" : ""
              }
            >
              Contacted
            </a>
          </li>
          <li>
            <a
              className={
                pathname === "/employer/settings" ? "bg-slate-200" : ""
              }
            >
              Settings
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a
          onClick={() => {
            localStorage.removeItem("user");
            logoutUser().then(() => (window.location.href = "/"));
          }}
          className="btn"
        >
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default NavBar;
