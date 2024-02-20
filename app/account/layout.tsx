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
      checkUserLoggedIn().then((response) => {
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          window.location.href = "/account/signin";
        }
      });
    }
  }, [pathname]);

  return (
    <div>
      {pathname !== "/account/signin" &&
        pathname !== "/account/signup" &&
        isLoggedIn && (
          <button
            onClick={() => {
              logoutUser();
              window.location.href = "/account/signin";
            }}
          >
            Logout
          </button>
        )}
      {(pathname === "/account/signin" ||
        pathname === "/account/signup" ||
        isLoggedIn) && <>{children}</>}
    </div>
  );
}
