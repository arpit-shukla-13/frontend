import React, { useState, useEffect, useContext } from 'react';
import Userheader from '../header/Userheader';


function UserDistribution() {
   
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
    const [email, setEmail] = useState('');

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
        const selectedUni = e.target.value;
        setSelectedUniversity(selectedUni);
        fetchColleges(selectedUni);
        setSelectedCollege('');
        setSelectedCourse('');
        setSelectedSemester('');
    };

    const handleCollegeChange = (e) => {
        const selectedColl = e.target.value;
        setSelectedCollege(selectedColl);
        fetchCourses(selectedColl);
        setSelectedCourse('');
        setSelectedSemester('');
    };

    const handleCourseChange = (e) => {
        const selectedCourse = e.target.value;
        setSelectedCourse(selectedCourse);
        fetchSemesters(selectedCourse);
        setSelectedSemester('');
    };

    const handleFileChange = (e) => {
        setNoteFile(e.target.files[0]);
    };
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
  };

    const addNote = async (e) => {
        e.preventDefault();

        if (!email) {
            alert('Please sign in to contribute notes.');
            return;
        }

        const formData = new FormData();
        formData.append('selectedUniversity', selectedUniversity);
        formData.append('selectedCollege', selectedCollege);
        formData.append('selectedCourse', selectedCourse);
        formData.append('selectedSemester', selectedSemester);
        formData.append('subject', subject);
        formData.append('units', units);
        formData.append('noteFile', noteFile);
        formData.append('username', email); // Include email from context

        try {
            let result = await fetch('http://localhost:4500/contributenote', {
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
            <Userheader />
            <form className="max-w-md m-auto p-5 mb-6 mt-4 shadow-lg rounded-lg shadow-black-800/40" onSubmit={addNote}>
                <h1 className='text-center text-3xl text-cyan-700 mb-3 mt-6'>Contribute Note</h1>

                {/* University Select */}
                <div className="mb-5">
                    <label htmlFor="university" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Select University</label>
                    <select id="university" onChange={handleUniversityChange} value={selectedUniversity} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                        <option value="">Select University</option>
                        {universities.map(uni => (
                            <option key={uni} value={uni}>{uni}</option>
                        ))}
                    </select>
                </div>

                {/* College Select */}
                <div className="mb-5">
                    <label htmlFor="college" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Select College</label>
                    <select id="college" onChange={handleCollegeChange} value={selectedCollege} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                        <option value="">Select College</option>
                        {colleges.map(college => (
                            <option key={college} value={college}>{college}</option>
                        ))}
                    </select>
                </div>

                {/* Course Select */}
                <div className="mb-5">
                    <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Select Course</label>
                    <select id="course" onChange={handleCourseChange} value={selectedCourse} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course} value={course}>{course}</option>
                        ))}
                    </select>
                </div>

                {/* Semester Select */}
                <div className="mb-5">
                    <label htmlFor="semester" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Select Semester</label>
                    <select id="semester" onChange={(e) => setSelectedSemester(e.target.value)} value={selectedSemester} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                        <option value="">Select Semester</option>
                        {semesters.map(sem => (
                            <option key={sem} value={sem}>{sem}</option>
                        ))}
                    </select>
                </div>

                {/* Subject Input */}
                <div className="mb-5">
                    <label htmlFor="noteTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Subject</label>
                    <input type="text" id="noteTitle" value={subject} onChange={(e) => setSubject(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                {/* Units Input */}
                <div className="mb-5">
                    <label htmlFor="units" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Units</label>
                    <input type="text" id="units" value={units} onChange={(e) => setUnits(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                {/* File Upload */}
                <div className="mb-5">
                    <label htmlFor="noteFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Upload Notes</label>
                    <input type="file" id="noteFile" onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Enter Email</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <button type="submit" className="bg-cyan-700 text-white py-2 px-4 rounded-lg">Submit</button>
            </form>
        </>
    );
}

export default UserDistribution;
