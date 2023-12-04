import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/root";
import Homepage from "./pages/Homepage";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{ index: true, element: <Homepage /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
