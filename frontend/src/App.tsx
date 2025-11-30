import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Add navbar here if needed */}
      <Outlet />
      {/* Add footer here if needed */}
    </div>
  );
}
