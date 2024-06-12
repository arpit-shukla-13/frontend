import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Userheader from '../header/Userheader';

function Usercourses() {
  const location = useLocation();
  const navigate = useNavigate();
  const { courses } = location.state || { courses: [] };
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courses.filter(course =>
    course.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.uniName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.collName.toLowerCase().includes(searchTerm.toLowerCase())||
    course.sem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewNotes = (course) => {
    navigate('/book', { state: { course } });
  };

  return (
    <>
    <Userheader/>
      <div className="bg-slate-100 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Courses</h2>
          </div>
          <div className="text-center">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
              className=" mt-0 my-6 p-2 border rounded-lg w-1/2"
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <div key={index} className="flex flex-col shadow p-3 rounded-2xl items-center gap-4 md:flex-row lg:gap-6">
                  <Link className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                    <img src={course.courseImage} loading="lazy" alt={course.course} className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                  </Link>
                  <div className="flex flex-col gap-2 text-center">
                    <span className="text-sm text-gray-400">{course.uniName}</span>
                    <span className="text-sm text-gray-600">{course.collName}</span>
                    <h2 className="text-xl font-bold text-gray-800">
                      <p className="transition duration-100 hover:text-cyan-700 active:text-cyan-700">{course.course}</p>
                    </h2>
                    <p className="text-gray-500">Semester: {course.sem}</p>
                    <div>
                      <button onClick={() => handleViewNotes(course)} className="font-semibold text-indigo-500 transition duration-100 hover:text-cyan-700 active:text-cyan-700">View Notes</button>
                    </div>
                    
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">No courses found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Usercourses;
