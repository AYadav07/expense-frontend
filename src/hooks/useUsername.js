import { useState, useEffect } from "react";
import axios from "axios";

export const useUsername = (inputVal, milliSeconds) => {
  const [data, setData] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    async function checkUsername() {
      try {
        const resData = await axios.get(
          `${apiUrl}/api/auth/check-username?username=${inputVal}`
        );
        console.log(resData);
        setData(resData.data.avail);
      } catch (err) {
        console.log(err);
      }
    }

    const handler = setTimeout(checkUsername, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [inputVal, milliSeconds]);

  return data;
};
