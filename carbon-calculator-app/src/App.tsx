import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Home } from "./pages/Home";
import { Results } from "./pages/Results";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/results",
    element: <Results />,
  },
]);

export default function App() {
  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) {
      const newSessionId = uuidv4();
      sessionStorage.setItem("sessionId", newSessionId);
    }
  }, []);

  return (
    <>
      <main className="p-10 flex justify-center">
        <RouterProvider router={router} />
      </main>
    </>
  );
}
