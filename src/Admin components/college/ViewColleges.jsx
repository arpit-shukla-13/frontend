import React, { useEffect, useState } from 'react';
import Adminheader from '../header/Adminheader';
import { Link } from 'react-router-dom';

function ViewColleges() {
  let [college, setCollege] = useState([]);

  let colldata = async () => {
    let data = await fetch(`http://localhost:4500/getcollege`);
    data = await data.json();
    setCollege(data);
  };

  useEffect(() => {
    // Initialize Flowbite components
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/flowbite@1.5.1/dist/flowbite.js';
    script.onload = () => {
      // Flowbite initialized
    };
    document.body.appendChild(script);
    colldata();
  }, []);

  const toggleDropdown = (index) => {
    const dropdown = document.getElementById(`dropdown-${index}`);
    if (dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
    } else {
      dropdown.classList.add('hidden');
    }
  };

  return (
    <>
      <Adminheader />
      <div className="relative container mx-auto px-4">
        <div className="grid gap-1 lg:grid-cols-2 xl:grid-cols-3 justify-center">
          {college.map((item, index) => (
            <div
              key={index}
              className="p-5 justify-center align-items-center w-full max-w-sm bg-white border rounded-lg shadow-lg shadow-gray-500/50 mx-auto my-4 flex flex-col items-center"
            >
              <div className="relative flex justify-end w-full px-4 pt-4">
                <button
                  id={`dropdownButton-${index}`}
                  onClick={() => toggleDropdown(index)}
                  className=" right-0 top-0 inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <span className="sr-only">Open dropdown</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id={`dropdown-${index}`}
                  className="absolute right-20 top-0 z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul className="py-2" aria-labelledby={`dropdownButton-${index}`}>
                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-700 dark:hover:text-white"
                      >
                        Edit
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-700 dark:hover:text-white"
                      >
                        Add Course
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-700 dark:hover:text-white"
                      >
                        Delete
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-40 h-40 mb-3 rounded-full shadow-lg"
                  src={item.colllogo}
                  alt="University"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-dark">
                  {item.collname}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.colladdress}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.affilitaion}
                </span>
                <div className="flex mt-4 md:mt-6">
                  <Link to="/addnotes">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Notes
                  </button>
                  </Link>

                  <Link to={`/addcourse/${item._id}`} >
  <button type="submit" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
    Add Courses
  </button>
</Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewColleges;
