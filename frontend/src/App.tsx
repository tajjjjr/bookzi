import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white overflow-x-hidden selection:bg-[#CFFF24] selection:text-black">
      {/* Add navbar here if needed */}
      <Outlet />
      {/* Add footer here if needed */}
    </div>
  );
}
