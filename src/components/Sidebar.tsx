
import { Calendar, Clock, Book, Settings, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="h-screen w-60 border-r border-gray-200 bg-white p-4 flex flex-col">
      <div className="mb-8 mt-3">
        <h1 className="text-xl font-bold text-study-purple flex items-center gap-2">
          <Book className="h-5 w-5" /> StudySmart
        </h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link to="/" className={`sidebar-link ${isActive("/")}`}>
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>Calendar</span>
            </Link>
          </li>
          <li>
            <Link to="/tasks" className={`sidebar-link ${isActive("/tasks")}`}>
              <Book className="h-5 w-5 text-gray-500" />
              <span>Tasks</span>
            </Link>
          </li>
          <li>
            <Link to="/timer" className={`sidebar-link ${isActive("/timer")}`}>
              <Clock className="h-5 w-5 text-gray-500" />
              <span>Timer</span>
            </Link>
          </li>
          <li>
            <Link to="/subjects" className={`sidebar-link ${isActive("/subjects")}`}>
              <Book className="h-5 w-5 text-gray-500" />
              <span>Subjects</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto">
        <Link to="/settings" className={`sidebar-link ${isActive("/settings")}`}>
          <Settings className="h-5 w-5 text-gray-500" />
          <span>Settings</span>
        </Link>
        <Link to="/profile" className={`sidebar-link ${isActive("/profile")}`}>
          <User className="h-5 w-5 text-gray-500" />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
