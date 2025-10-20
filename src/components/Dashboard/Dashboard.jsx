import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <h1>Dashboard - Welcome {user.username}.</h1>
    </main>
  );
};

export default Dashboard;
