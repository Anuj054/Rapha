import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="flex bg-customBrown w-full">
      <div className="max-w-full px-4  flex flex-row items-center  gap-2 h-16">
        {/* Left Section: RAPHA-FIT PILATES */}
        <div className="text-[#e2f163] text-xl font-bold flex ">
          RAPHA-FIT PILATES
        </div>
        {/* Right Section: Profile */}
        <div className="flex items-center">
          <Link to="/profile">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40" // Replace with actual profile image URL
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover mr-2"
              />
              <span className="text-white font-medium">Muskan Rathore</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white ml-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 14l-4-4h8l-4 4z" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
