import { useRefreshMutation } from "../features/authUser/usersApiSlice";
import { setCredentials } from "../features/authUser/authSlice";
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();

  const getRefreshToken = async () => {
    try {
      const res = await refresh().unwrap();

      if (res.data !== null) {
        const data = {
          token: res.accessToken,
          user: res.data,
        };

        dispatch(setCredentials({ data }));
      }
    } catch (err) {
      console.error(err.status);
      console.error(err);

      // Handle error as needed, e.g., toast.error(err.data.message || err.error);
    }
  };

  return getRefreshToken;
};

export default useRefreshToken;
