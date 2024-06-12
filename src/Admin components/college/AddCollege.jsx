import React, { useEffect, useState } from 'react';
import Adminheader from '../header/Adminheader';
import { useParams } from 'react-router-dom';

function AddCollege() {
  let params = useParams();

  useEffect(() => {
    unidata();
    fetchAllUniversities();
  }, []);

  let unidata = async () => {
    let result = await fetch(`http://localhost:4500/getuni/${params.id}`);
    result = await result.json();
    setAffiliation(result.uniName); // Store the university name
    setSelectedUniversity(result._id); // Store the university ID
  };

  let fetchAllUniversities = async () => {
    let result = await fetch(`http://localhost:4500/getuniversity`);
    result = await result.json();
    setUniversities(result);
  };

  let [collname, setCollname] = useState('');
  let [colladdress, setColladdress] = useState('');
  let [affiliation, setAffiliation] = useState('');
  let [colllogo, setColllogo] = useState('');
  let [universities, setUniversities] = useState([]);
  let [selectedUniversity, setSelectedUniversity] = useState('');

  let convert = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setColllogo(reader.result);
    };
  };

  let addcollege = async (e) => {
    e.preventDefault();

    const collegeData = { collname, colladdress, affiliation, colllogo };
    try {
      let result = await fetch(`http://localhost:4500/addcollege`, {
        method: 'post',
        crossDomain: true,
        body: JSON.stringify(collegeData),
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
      if (result) {
        alert('College added successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <Adminheader />
      <form onSubmit={addcollege} className="max-w-md m-auto p-5 mb-6 mt-4 shadow-lg rounded-lg shadow-black-800/40">
        <h1 className='text-center text-3xl text-cyan-700 mb-3 mt-6'>Add College</h1>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">College Name</label>
          <input 
            type="text" 
            onChange={(e) => setCollname(e.target.value)} 
            value={collname} 
            className="shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
            required 
          />
        </div>

        <div className="mb-5">
          <label htmlFor="uniAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Address</label>
          <input 
            type="text" 
            onChange={(e) => setColladdress(e.target.value)} 
            value={colladdress}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
            required 
          />
        </div>

        <div className="mb-5">
          <label htmlFor="uniType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">University</label>
          <select 
            onChange={(e) => {
              const selectedUni = universities.find(uni => uni._id === e.target.value);
              setAffiliation(selectedUni.uniName); // Set the affiliation to the university name
              setSelectedUniversity(selectedUni._id); // Set the selected university to the university ID
            }} 
            value={selectedUniversity}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
          >
            <option value="" disabled>Select a university</option>
            {universities.map((uni) => (
              <option key={uni._id} value={uni._id}>{uni.uniName}</option>
            ))}
          </select>
        </div>

        <div className="flex items-start mb-5">
          <input 
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400" 
            onChange={convert}
            id="user_avatar" 
            type="file" 
            accept=".jpg,.jpeg,.png" 
          />
          <div className="mt-1 text-sm text-gray-900 dark:text-cyan-700" id="user_avatar_help">Select College image</div>
        </div>

        <button 
          type="submit" 
          className="text-white m-auto bg-cyan-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-blue-800"
        >
          Register new college
        </button>
      </form>
    </>
  );
}

export default AddCollege;
