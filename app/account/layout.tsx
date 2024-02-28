"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { checkUserLoggedIn, logoutUser } from "./utils/routes";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/account/signin" && pathname !== "/account/signup") {
      checkUserLoggedIn().then(async (response) => {
        if (!response.ok) {
          window.location.href = "/account/signin";
          return;
        }

        const res = await response.json();
        if (res.role === "employer") {
          window.location.href = "/";
        } else setIsLoggedIn(true);
      });
    }
  }, [pathname]);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-green-500 dark:from-blue-900 dark:to-gray-800">
      {(pathname === "/account/signin" ||
        pathname === "/account/signup" ||
        isLoggedIn) && <>{children}</>}
    </div>
  );
}
