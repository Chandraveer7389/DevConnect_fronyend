import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Body";
import Feed from "./Feed";
import Login from "./Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./Profile";
const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <Body/>,
    children : [
      { index: true, element: <Feed /> },
      { path: "/login", element: <Login /> },
      { path : "/profile", element : <Profile/>}
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
