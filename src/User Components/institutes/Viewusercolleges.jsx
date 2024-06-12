import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversityContext } from '../institutes/UniversityProvider';
import Userheader from '../header/Userheader';

function Viewusercolleges() {
  const [colleges, setColleges] = useState([]);
  const { selectedUniversity } = useContext(UniversityContext);
  const navigate = useNavigate();

  const colldata = async () => {
    try {
      let url = `http://localhost:4500/getusercollege`;
      if (selectedUniversity) {
        url += `?universityName=${encodeURIComponent(selectedUniversity)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setColleges(data);
    } catch (error) {
      console.error('Error fetching college data:', error);
    }
  };

  const fetchCourses = async (collName) => {
    try {
      const response = await fetch(`http://localhost:4500/getusercourses?collName=${encodeURIComponent(collName)}`);
      const courses = await response.json();
      navigate('/usercourses', { state: { courses } });
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    colldata();
  }, [selectedUniversity]);

  return (
    <>
    <Userheader/>
    <section className='coursesCard'>
      <div className='container grid2'>
        {colleges.length > 0 ? colleges.map((item, index) => (
          <div className='items' key={index}>
            <div className='content flex'>
              <div className='left'></div>
              <div className='text'>
                <h1>{item.collname}</h1>
                <span className='text-center my-2'>{item.colladdress}</span>
                <div className='rate'>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <label htmlFor=''>(5.0)</label>
                </div>
                <div className='details'>
                  <div className='box'>
                    <img
                      className="w-40 h-40 mb-3 rounded-full shadow-lg"
                      src={item.colllogo}
                      alt="University"
                    />
                    <div className='para'>
                      <h4>{item.affiliation}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className='my-2 outline-btn' onClick={() => fetchCourses(item.collname)}>VIEW COURSES</button>
          </div>
        )) : <p>No colleges found.</p>}
      </div>
    </section>
    </>
  );
}

export default Viewusercolleges;
