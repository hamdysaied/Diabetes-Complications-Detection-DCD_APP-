import { useSelector } from "react-redux";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Dashboard></Dashboard> : <Landing></Landing>;
};

export default Home;
