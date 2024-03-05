"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { checkUserLoggedIn } from "../routes/user";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/account/signin" && pathname !== "/account/signup") {
      if (localStorage.getItem("user") === null) {
        window.location.href = "/account/signin";
        return;
      }
      const user = JSON.parse(localStorage.getItem("user")!);

      if (user.role === "employer") {
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
