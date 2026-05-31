import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Outlet akan merender komponen Home, Builder, dll sesuai URL */}
      <Outlet />
    </div>
  );
}

export default App;
