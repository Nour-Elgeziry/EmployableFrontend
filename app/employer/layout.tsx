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
    const user = JSON.parse(localStorage.getItem("user")!);
    setUser(user);
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
