import { createBrowserRouter } from "react-router";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    Component: Body,
    children: [
      { path: "login", Component: Login },
      { path: "profile", Component: Profile },
    ],
  },
]);

export default AppRouter;
