import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // React Icons for the menu
import logo from "../assets/demand_logo.jpg"; // Import your logo
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="absolute top-0 left-0 w-full bg-white shadow-lg mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
              <img
                src= {logo} // Change to your actual logo
                alt="Logo"
                className="h-12 w-auto"
              />
          </div>

          {/* Navigation Links - Aligned Right */}
          <div className="hidden sm:flex sm:space-x-8 ml-auto">
            <NavLink href="/prediction">Prediction</NavLink>
            <NavLink href="/purpose">Purpose</NavLink>
            <NavLink href="/models">Models</NavLink>
            <NavLink href="/reports">Reports</NavLink>
          </div>

          {/* Mobile Menu Button (Hidden on Desktop) */}
          <div className="sm:hidden">
            <MobileMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} />
    </nav>
  );
};

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
  >
    {children}
  </a>
);

const MobileMenuButton = ({ isOpen, onClick }) => (
  <button
    type="button"
    className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none sm:hidden"
    aria-controls="mobile-menu"
    aria-expanded={isOpen}
    onClick={onClick}
  >
    <span className="sr-only">{isOpen ? "Close main menu" : "Open main menu"}</span>
    {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
  </button>
);

const MobileMenu = ({ isOpen }) => (
  <div className={`sm:hidden ${isOpen ? "block" : "hidden"}`} id="mobile-menu">
    <div className="pt-2 pb-3 space-y-1">
      <MobileNavLink href="/prediction">Prediction</MobileNavLink>
      <MobileNavLink href="/purpose">Purpose</MobileNavLink>
      <MobileNavLink href="/models">Models</MobileNavLink>
      <MobileNavLink href="/reports">Reports</MobileNavLink>
    </div>
  </div>
);

const MobileNavLink = ({ href, children }) => (
  <a
    href={href}
    className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
  >
    {children}
  </a>
);

export default Navbar;
