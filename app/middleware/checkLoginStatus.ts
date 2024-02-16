import { useEffect } from "react";

const checkLoginStatus = (WrappedComponent: any) => {
  return (props: any) => {
    useEffect(() => {
      console.log("check login status");
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/account/signin";
      }
    }, []);

    // If there’s a token, render the component that was passed with all its props
    return WrappedComponent(props);
  };
};

export default checkLoginStatus;
