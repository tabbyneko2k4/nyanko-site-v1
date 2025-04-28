// src/components/Navigation.tsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }

  // Lớp CSS cho thanh điều hướng chính
  // Luôn cố định, có nền mờ và bóng đổ
  const navClasses = `
    sticky top-0 z-50
    bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md dark:shadow-gray-700/50
    px-4 md:px-6 h-16 flex items-center
    transition-colors duration-300 ease-in-out
  `;

  // Lớp CSS chung cho các link trên desktop
  const desktopLinkClasses = `
    text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground
    transition-all duration-200 relative
    after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0
    after:bg-primary dark:after:bg-primary-foreground after:transition-all after:duration-300
    hover:after:w-full
  `;

  // Lớp CSS chung cho các link trên mobile
  const mobileLinkClasses = `
    text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-foreground
    block px-3 py-2 rounded-md text-lg font-medium  /* Tăng nhẹ cỡ chữ */
    transition-all duration-200 hover:scale-105 active:scale-95 /* Thêm hiệu ứng nhấn */
  `;

  return (
    <>
      {/* Thanh điều hướng chính */}
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center group" onClick={closeMobileMenu}>
            <img
              src="/logo.png" // Đảm bảo đường dẫn đúng
              alt="Tabby Neko Logo"
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105" // Phóng to nhẹ khi hover logo
            />
            {/* Optional: Add site name next to logo if desired */}
            {/* <span className="ml-2 text-lg font-semibold text-gray-800 dark:text-white group-hover:text-primary dark:group-hover:text-primary-foreground transition-colors">Tabby Neko</span> */}
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/music" className={desktopLinkClasses}>MUSIC</Link>
            <Link to="/program" className={desktopLinkClasses}>PROGRAM</Link>
            <Link to="/bio" className={desktopLinkClasses}>BIO</Link>
            <Link to="/contact" className={desktopLinkClasses}>CONTACT</Link>
          </div>

          {/* Mobile Burger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:focus:ring-primary-foreground transition-all duration-200" // Thêm transition-all
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle main menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Animated Icon Switch */}
              <div className="relative w-6 h-6">
                 <Menu className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0 scale-75 rotate-90' : 'opacity-100 scale-100 rotate-0'}`} aria-hidden="true" />
                 <X className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'}`} aria-hidden="true" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {/* Sử dụng transition-all kết hợp opacity và transform để trượt vào/ra */}
      <div
        className={`
          fixed inset-x-0 top-16 bottom-0 z-40 /* z-index thấp hơn nav chính */
          bg-white/95 dark:bg-gray-800/95 backdrop-blur-md
          md:hidden /* Chỉ hiển thị trên mobile */
          transition-all duration-300 ease-in-out /* Animation chính */
          ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full invisible'} /* Trạng thái ẩn/hiện + trượt từ trên xuống */
        `}
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen} // Hỗ trợ tốt hơn cho accessibility
      >
        {/* Thêm padding top lớn hơn để đẩy nội dung xuống */}
        <div className="px-4 pt-12 pb-8 space-y-6 sm:px-6 flex flex-col items-center h-full"> {/* Tăng padding top, space-y và cho phép căn giữa */}
          <Link to="/music" onClick={closeMobileMenu} className={mobileLinkClasses}>MUSIC</Link>
          <Link to="/program" onClick={closeMobileMenu} className={mobileLinkClasses}>PROGRAM</Link>
          <Link to="/bio" onClick={closeMobileMenu} className={mobileLinkClasses}>BIO</Link>
          <Link to="/contact" onClick={closeMobileMenu} className={mobileLinkClasses}>CONTACT</Link>
        </div>
      </div>
       {/* Optional: Overlay to close menu when clicking outside */}
       {isMobileMenuOpen && (
         <div
           className="fixed inset-0 z-30 bg-black/20 md:hidden"
           onClick={closeMobileMenu}
           aria-hidden="true"
         ></div>
       )}
    </>
  );
};

export default Navigation;