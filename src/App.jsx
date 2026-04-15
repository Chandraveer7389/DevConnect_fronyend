import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Body";
import Feed from "./Feed";
import Login from "./Login";
const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <Body/>,
    children : [
      { index: true, element: <Feed /> },
      { path: "/login", element: <Login /> },
    ]
  }
])
function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
