import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Body";
import Feed from "./Feed";
import Login from "./Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./Profile";
import Connection from "./Connection";
import Request from "./Request";
const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <Body/>,
    children : [
      { index: true, element: <Feed /> },
      { path: "/login", element: <Login /> },
      { path : "/profile", element : <Profile/>},
      { path: "/connection", element: <Connection /> },
      { path: "/request", element: <Request /> },
    ]
  }
])
function App() {
  return (
      <Provider store={appStore}>
    <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
