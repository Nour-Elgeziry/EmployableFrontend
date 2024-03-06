"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { checkUserLoggedIn } from "../routes/user";
import NavBar from "./components/navBar";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.href = "/account/signin";
    }
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      {children}
    </div>
  );
}
