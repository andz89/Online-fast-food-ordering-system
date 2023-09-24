import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/panda.png";
import { useSellerLogoutMutation } from "../features/authUser/usersApiSlice";
import { logout } from "../features/authUser/authSlice";
// import LoadingSpinner from "./LoadingSpinner";

const Header = () => {
  const navigage = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall, { isLoading }] = useSellerLogoutMutation();
  const logoutHanler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigage("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* {isLoading && <LoadingSpinner />} */}
      <header className=" bg-slate-200  flex flex-col sm:flex-row justify-between items-center p-2">
        <div className="text-center sm:text-left">
          <Link className="flex ml-2 md:mr-24">
            <img src={logo} className="h-8 mr-3" alt="FlowBite Logo" />
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              Online Fast Food Ordering System
            </span>
          </Link>
        </div>
        <ul className="flex  sm:text-base    gap-4 mx-3 items-center font-semibold">
          {userInfo ? (
            <>
              {userInfo.data?.user.roles[0] === "user" ? (
                <>
                  <li className="hover:bg-[#F1418C] hover:text-white rounded p-1">
                    <Link to={"/"}>Foods</Link>
                  </li>
                  <li className="hover:bg-[#F1418C] hover:text-white rounded p-1">
                    <Link to={"/profile-user"}>Profile</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={"/dashboard"}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to={"/postsOrganizer"}>Posts</Link>
                  </li>
                  <li>
                    <Link to={"/profile-organizer"}>Profile</Link>
                  </li>
                </>
              )}
              <li>
                <button
                  className="flex items-center gap-2 bg-[#D70F64] px-2 py-1 text-white rounded"
                  onClick={logoutHanler}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className="flex items-center p-1  gap-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="flex-1 whitespace-nowrap   ">Sign In</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center   p-1  gap-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="flex-1   whitespace-nowrap ">Sign Up</span>
                </Link>
              </li>
              <li className="bg-[#D70F64] text-white p-1 rounded hover:bg-[#C81661] ">
                <Link to={"/seller"}>Seller</Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
};

export default Header;
