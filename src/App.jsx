import { createBrowserRouter } from "react-router";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    Component: Body,
    children: [
      { index: true, Component: Feed },
      { path: "login", Component: Login },
      { path: "profile", Component: Profile },
    ],
  },
]);

export default AppRouter;
