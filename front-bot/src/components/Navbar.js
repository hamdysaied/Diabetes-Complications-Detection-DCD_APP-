import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import diaLogo from "../assets/logo_black-removebg-preview 1.png";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      <div
        className={`container mx-auto p-4 flex justify-around items-center ${
          user ? "border-b border-[#178DC2]" : ""
        }`}
      >
        <div id="logo" className="flex items-center">
          <Link to="/" className="w-full mr-2">
            <img src={logo} alt="" className="w-full" />
          </Link>
          <img src={diaLogo} alt="" className="max-w-[100px]" />
        </div>
        <div className="w-full">
          <ul className="flex basis-full items-center justify-end font-roboto font-semibold text-black/60">
            {!user && (
              <li className=" px-4 py-3 text-xl">
                <Link
                  to="/"
                  className="hover:border-b-2 hover:border-b-black/60"
                >
                  Home
                </Link>
              </li>
            )}
            {!user && (
              <li className="px-4 py-3 text-xl">
                <Link
                  to="/about"
                  className="hover:border-b-2 hover:border-b-black/60"
                >
                  About us
                </Link>
              </li>
            )}
            {!user && (
              <li className=" px-4 py-3 text-xl">
                <Link
                  to="/auth/login"
                  className="hover:border-b-2 hover:border-b-black/60"
                >
                  Login
                </Link>
              </li>
            )}
            {!user && (
              <li className=" px-4 py-3 text-xl">
                <Link
                  to="/auth/register"
                  className="hover:border-b-2 hover:border-b-black/60"
                >
                  Sign up
                </Link>
              </li>
            )}
            {user && (
              <li className="flex items-center px-4 py-3 text-xl">
                <p className="mr-5">{user.name}</p>
                <FontAwesomeIcon
                  className="fa-2x text-[#178DC2]"
                  icon={faUser}
                ></FontAwesomeIcon>
              </li>
            )}
            {user && (
              <li className="cursor-pointer px-4 py-3 text-xl">
                <div
                  onClick={handleLogout}
                  className="hover:border-b-2 hover:border-b-black/60"
                >
                  logout
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
