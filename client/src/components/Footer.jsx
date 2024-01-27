import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#E6E7E8] h-64">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">FOLLOW US</h2>
            <div className="flex space-x-4 mt-2">
              {/* Add your social media icons with links here */}
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          <div className="mb-4 md:mb-0">
            <div className="flex space-x-2 mt-2">
              <i className="fab fa-cc-visa text-2xl hover:text-blue-500"></i>
              <i className="fab fa-cc-mastercard text-2xl hover:text-blue-500"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
