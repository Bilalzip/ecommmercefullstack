import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faShoppingCart, faBox, faList, faTimes, faBars} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

const Sidebar = () => {
  const dashboardOptions = [
    { title: 'Dashboard', icon: faHome, link: '/admin/' },
    { title: 'Profile', icon: faUser, link: '/admin/profile' },
    { title: 'Orders', icon: faShoppingCart, link: '/admin/orders' },
    { title: 'Add Products', icon: faBox, link: '/admin/addproducts', },
    { title: 'Categories', icon: faList, link: '/admin/addcategories',  },
  ];

  const [auth] = useAuth();
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className={`bg-blue-500 min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4 md:ml-2 rounded-bl-lg rounded-tr-md rounded-br-md mt-4 mb-2`}>
        <div onClick={() => setOpen(!open)} className={`py-3 flex justify-end text-2xl`}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {dashboardOptions.map((item, index) => (
            <Link to={item.link} className="group" key={index}>
              <div className={`text-gray-100 hover:text-gray-300 mb-8 ${item.hidden ? 'hidden' : ''}`}>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={item.icon} className="text-white text-lg hover:text-gray-300 cursor-pointer" />
                  <span
                    style={{ transitionDelay: `${index + 3}00ms` }}
                    className={`ml-2 whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden mt-2"}`}>{item.title}</span>
                  <span className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
                    {item.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
