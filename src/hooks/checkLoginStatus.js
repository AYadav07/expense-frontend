import { useState, useEffect } from "react";
import axios from "axios";

export const useLoginStatus = () => {
  const [login, setLogin] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    async function checkUsername() {
      try {
        const token = localStorage.getItem("token");
        const resData = await axios.get(
          `${apiUrl}/api/auth/check-login-status`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (resData.status == 200) setLogin(true);
      } catch (err) {
        console.log(err);
        setLogin(false);
      }
    }
    checkUsername();

    return () => {};
  }, []);

  return login;
};
