"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { checkUserLoggedIn } from "../routes";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/account/signin" && pathname !== "/account/signup") {
      if (localStorage.getItem("role") === null) {
        window.location.href = "/account/signin";
        return;
      }

      if (localStorage.getItem("role") === "employer") {
        window.location.href = "/";
      } else setIsLoggedIn(true);
    }
  }, [pathname]);

  return (
    <div>
      {(pathname === "/account/signin" ||
        pathname === "/account/signup" ||
        isLoggedIn) && <>{children}</>}
    </div>
  );
}
