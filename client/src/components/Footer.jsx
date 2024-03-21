import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 m-1 rounded-sm">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-lg font-bold mb-2">Farm Ninja</h3>
          <p className="text-sm">123 Street Name, City, Country</p>
          <p className="text-sm">Email: test@test.com</p>
          <p className="text-sm">Phone: 1234344556</p>
        </div>
        <div className="flex justify-center lg:justify-start mb-4 lg:mb-0">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-white">About Us</a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-white">Contact Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">FAQs</a>
            </li>
          </ul>
        </div>
        <div className="flex justify-center lg:justify-end">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Farm Ninja. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
