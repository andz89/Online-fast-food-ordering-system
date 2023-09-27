import Dashboard from "./pages/seller/Dashboard";
import Register from "./pages/users/Register";
import SellerRegistration from "./pages/seller/Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import Private from "./components/Private";
import ProfileUser from "./pages/users/Profile";
import UpdatePasswordUser from "./pages/users/UpdatePassword";
import FoodList from "./pages/users/Food_list";
import Login from "./pages/users/Login";
import NoPageFound from "./components/NoPageFound";
import { useSelector } from "react-redux";
import SellerLogin from "./pages/seller/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./components/headerAndSidebar/Main";
import Foods from "./pages/seller/Foods";
import Orders from "./pages/seller/Orders";
import Users from "./pages/seller/Users";
import Tasks from "./pages/seller/Tasks";
import Store from "./pages/seller/Store";
import StoreList from "./pages/users/Store_list";
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/seller" element={<SellerLogin />} />
              <Route
                path="/seller-registration"
                element={<SellerRegistration />}
              />

              {/*users view */}

              <Route path="" element={<Private allowedRoles={["user"]} />}>
                <Route path="/profile-user" element={<ProfileUser />} />
                {/* <Route path="/" element={<FoodList />} />
                 */}

                <Route path="/" element={<StoreList />} />

                <Route path="*" element={<NoPageFound />} />
                <Route
                  path="/updatePasswordUser"
                  element={<UpdatePasswordUser />}
                />
              </Route>

              <Route path="" element={<Private allowedRoles={["seller"]} />}>
                <Route element={<Main />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/store" element={<Store />} />

                  <Route path="/foods" element={<Foods />} />

                  <Route path="/orders" element={<Orders />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/tasks" element={<Tasks />} />

                  <Route path="*" element={<NoPageFound />} />
                </Route>
                {/* <Route
                path="/profile-organizer"
                element={<ProfileOrganizer />}
              />
         
              <Route
                path="/updatePasswordOrganizer"
                element={<UpdatePasswordOrganizer />}
              />
              <Route path="/postsOrganizer" element={<PostsOrganizer />} /> */}
              </Route>
            </Route>
          </Routes>
        </div>
        ;
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
