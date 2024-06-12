import React, { useState } from 'react'
import Adminheader from '../header/Adminheader'


function AddUniversity() {

  let [uniName , setUniName] = useState('');
  let [uniAddress , setUniAddress] = useState('');
  let [uniLink , setUniLink] = useState('');
  let [uniLogo , setUniLogo] = useState('');

  let convert = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        console.log(reader.result);
        setUniLogo(reader.result);
    };
}


let adduniversity = async () => {
  let result = await fetch(`http://localhost:4500/adduniversity`,{
      method:'post',
      crossDomain:true,
      body: JSON.stringify({uniName,uniAddress,uniLink,uniLogo}),
      headers:{
          'Content-Type':'application/json',
          "Accept":"application/json",
          "Access-Control-Allow-Origin":"+",
      },
  });
  result = await result.json();
  if (result){
    console.log(result)
      alert("University added successfully");
      
  }
}


  return (
    <>
<Adminheader/>
   

<form className="max-w-md m-auto p-5 mb-6 mt-4 shadow-lg rounded-lg shadow-black-800/40">
    <h1 className='text-center text-3xl text-cyan-700 mb-3 mt-6'>Add University</h1>
  <div className="mb-5">
    <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">University Name</label>
    <input type="text" id="email" className="shadow-sm bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required 
    onChange={(e)=>setUniName(e.target.value)} value={uniName}/>
  </div>
  <div class="mb-5">
    <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Address</label>
    <input type="text" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:cyan-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required 
    onChange={(e)=>setUniAddress(e.target.value)} value={uniAddress}/>
  </div>
  <div class="mb-5">
    <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-700">Link of University</label>
    <input type="text" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required 
    onChange={(e)=>setUniLink(e.target.value)} value={uniLink}/>
  </div>
  <div className="flex items-start mb-5">
 
  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept=".jpg,.jpeg, .png"
  onChange={convert}/>
  <div className="mt-1 text-sm text-gray-900 dark:text-cyan-700" id="user_avatar_help">Slecet University image</div>
  </div>
  <button onClick={adduniversity} type="submit" className="text-white m-auto  bg-cyan-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-blue-800">Register new account</button>
</form>


    </>
  )
}

export default AddUniversity
