import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Userheader from '../header/Userheader';
import { UniversityContext } from '../institutes/UniversityProvider';

function Viewuseruniversity() {
  const [university, setUniversity] = useState([]);
  const navigate = useNavigate();
  const { setSelectedUniversity } = useContext(UniversityContext);

  const unidata = async () => {
    try {
      let data = await fetch(`http://localhost:4500/getuniversity`);
      data = await data.json();
      setUniversity(data);
    } catch (error) {
      console.error('Error fetching university data:', error);
    }
  };

  useEffect(() => {
    unidata();
  }, []);

  return (
    <>
      <Userheader />
      <div className="relative container mx-auto px-4">
        <div className="grid gap-1 lg:grid-cols-2 xl:grid-cols-3 justify-center">
          {university.map((item, index) => (
            <div
              key={index}
              className="p-5 justify-center align-items-center w-full max-w-sm bg-white border rounded-lg shadow-lg shadow-gray-500/50 mx-auto my-4 flex flex-col items-center"
            >
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-40 h-40 mb-3 rounded-full shadow-lg"
                  src={item.uniLogo}
                  alt="University"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-dark">
                  {item.uniName}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.uniAddress}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.uniLink}
                </span>
                <div className="flex mt-4 md:mt-6">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      setSelectedUniversity(item.uniName);
                      navigate('/viewusercolleges');
                    }}
                  >
                    View Colleges
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Viewuseruniversity;
