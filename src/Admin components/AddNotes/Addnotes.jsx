import React, { useState, useEffect } from 'react';
import Adminheader from '../header/Adminheader';

function AddNotes() {
  const [universities, setUniversities] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const [subject, setSubject] = useState('');
  const [units, setUnits] = useState('');
  const [noteFile, setNoteFile] = useState(null);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const result = await fetch('http://localhost:4500/universities');
      const data = await result.json();
      setUniversities(data);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const fetchColleges = async (uniName) => {
    try {
      const result = await fetch(`http://localhost:4500/colleges/${uniName}`);
      const data = await result.json();
      setColleges(data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const fetchCourses = async (collName) => {
    try {
      const result = await fetch(`http://localhost:4500/courses/${collName}`);
      const data = await result.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchSemesters = async (course) => {
    try {
      const result = await fetch(`http://localhost:4500/semesters/${course}`);
      const data = await result.json();
      setSemesters(data);
    } catch (error) {
      console.error('Error fetching semesters:', error);
    }
  };

  const handleUniversityChange = (e) => {
    setSelectedUniversity(e.target.value);
    fetchColleges(e.target.value);
    setColleges([]);
    setCourses([]);
    setSemesters([]);
  };

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
    fetchCourses(e.target.value);
    setCourses([]);
    setSemesters([]);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    fetchSemesters(e.target.value);
    setSemesters([]);
  };

  const handleFileChange = (e) => {
    setNoteFile(e.target.files[0]);
  };

  const addNote = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('selectedUniversity', selectedUniversity);
    formData.append('selectedCollege', selectedCollege);
    formData.append('selectedCourse', selectedCourse);
    formData.append('selectedSemester', selectedSemester);
    formData.append('subject', subject);
    formData.append('units', units);
    formData.append('noteFile', noteFile);

    try {
      let result = await fetch('http://localhost:4500/addnote', {
        method: 'post',
        crossDomain: true,
        body: formData,
      });

      if (!result.ok) {
        throw new Error('Network response was not ok ' + result.statusText);
      }

      result = await result.json();
      alert('Note added successfully');
      window.location.reload();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <Adminheader />
      <form className="max-w-md m-auto p-5 mb-6 mt-4 shadow-lg rounded-lg shadow-black-800/40" onSubmit={addNote}>
        <h1 className='text-center text-3xl text-cyan-700 mb-3 mt-6'>Add Note</h1>

        <div className="mb-5">
          <label htmlFor="university" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Select University</label>
          <select id="university" onChange={handleUniversityChange} value={selectedUniversity} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light">
            <option value="">Select University</option>
            {universities.map(uni => (
              <option key={uni} value={uni}>{uni}</option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="college" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Select College</label>
          <select id="college" onChange={handleCollegeChange} value={selectedCollege} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light">
            <option value="">Select College</option>
            {colleges.map(college => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Select Course</label>
          <select id="course" onChange={handleCourseChange} value={selectedCourse} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light">
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="semester" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Select Semester</label>
          <select id="semester" onChange={(e) => setSelectedSemester(e.target.value)} value={selectedSemester} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light">
            <option value="">Select Semester</option>
            {semesters.map(sem => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="noteTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Subject</label>
          <input type="text" id="noteTitle" value={subject} onChange={(e) => setSubject(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
        </div>

        <div className="mb-5">
          <label htmlFor="noteTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Units</label>
          <input type="text" id="noteTitle" value={units} onChange={(e) => setUnits(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
        </div>

        <div className="mb-5">
          <label htmlFor="noteFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Upload File</label>
          <input type="file" id="noteFile" onChange={handleFileChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
        </div>

        <button type="submit" className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-700 dark:hover:bg-cyan-800 dark:focus:ring-cyan-300">Submit</button>
      </form>
    </>
  );
}

export default AddNotes;
