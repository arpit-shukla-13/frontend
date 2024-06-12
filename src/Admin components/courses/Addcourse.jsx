import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Adminheader from '../header/Adminheader';

function Addcourse() {
  let { id } = useParams();
  let [uniName, setUniName] = useState('');
  let [collName, setCollName] = useState('');
  let [course, setCourse] = useState('');
  let [sem, setSem] = useState('');
  let [courseImage, setCourseImage] = useState('');

  useEffect(() => {
    colldata();
  }, [id]);

  let colldata = async () => {
    try {
      let result = await fetch(`http://localhost:4500/getcoll/${id}`);
      result = await result.json();
      setCollName(result.collname);
      setUniName(result.affiliation); // Store the university name
    } catch (error) {
      console.error('Error fetching college data:', error);
    }
  };

  let convert = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setCourseImage(reader.result);
    };
  };

  let addCourse = async (e) => {
    e.preventDefault();

    const courseData = { 
        uniName, 
        collName, 
        course, 
        sem, 
        courseImage 
    };
    console.log('Submitting course data:', courseData);

    try {
        let result = await fetch(`http://localhost:4500/addcourse`, {
            method: 'post',
            crossDomain: true,
            body: JSON.stringify(courseData),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });

        if (!result.ok) {
            throw new Error('Network response was not ok ' + result.statusText);
        }

        result = await result.json();
        console.log('Response from server:', result);
        if (result) {
            alert('Course added successfully');
            window.location.reload();
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};


  return (
    <>
    <Adminheader/>
    <form className="max-w-md m-auto p-5 mb-6 mt-4 shadow-lg rounded-lg shadow-black-800/40">
      <h1 className='text-center text-3xl text-cyan-700 mb-3 mt-6'>Add Course</h1>
      <div className="mb-5">
        <label htmlFor="uniName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Name of University</label>
        <input type="text" id="uniName" className="shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light" required onChange={(e) => setUniName(e.target.value)} value={uniName} />
      </div>
      <div className="mb-5">
        <label htmlFor="collName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Name of College</label>
        <input type="text" id="collName" className="shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light" required onChange={(e) => setCollName(e.target.value)} value={collName} />
      </div>
      <div className="mb-5">
        <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Course</label>
        <input type="text" id="course" className="shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required onChange={(e) => setCourse(e.target.value)} value={course} />
      </div>
      <div className="mb-5">
        <label htmlFor="sem" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Semester</label>
        <select onChange={(e) => setSem(e.target.value)} value={sem} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
          <option value="">Select Semester</option>
          <option value="I">I</option>
          <option value="II">II</option>
          <option value="III">III</option>
          <option value="IV">IV</option>
          <option value="V">V</option>
          <option value="VI">VI</option>
          <option value="VII">VII</option>
          <option value="VIII">VIII</option>
        </select>
      </div>
      <div className="flex items-start mb-5">
        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".jpg,.jpeg, .png" onChange={convert} />
        <div className="mt-1 text-sm text-gray-900 dark:text-cyan-700" id="user_avatar_help">Course image</div>
      </div>
      <button onClick={addCourse} type="submit" className="text-white m-auto bg-cyan-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-blue-800">Add new course</button>
    </form>
    </>
  );
}

export default Addcourse;
