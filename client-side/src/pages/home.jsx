import Heroes from "../components/heroes";
import { Hive } from "../components/hive";
// import { Navbar } from "../components/navbar";

const token = localStorage.getItem("token");

export const HomePage = () => {
  return <div>{token ? <Hive /> : <Heroes />}</div>;
};
