import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";

import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const getUserRefreshToken = useRefreshToken();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await getUserRefreshToken();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken

    !userInfo?.data ? verifyRefreshToken() : setIsLoading(false);
    console.log(userInfo);
    return () => {
      isMounted = false;
    };
  }, []);
  if (isLoading) return <LoadingSpinner />;
  return <>{<Outlet />}</>;
};

export default PersistLogin;
