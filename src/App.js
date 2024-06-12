import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Footer from './components/footer/Footer';
import Adminhome from './Admin components/home/Adminhome';
import SigninSignup from './components/Account/SigninSignup';
import Userhome from './User Components/Userhome';
import AddUniversity from './Admin components/universities/AddUniversity';
import Viewuniversity from './Admin components/universities/Viewuniversity';
import AddCollege from './Admin components/college/AddCollege';
import ViewColleges from './Admin components/college/ViewColleges';
import Addcourse from './Admin components/courses/Addcourse';
import AddNotes from './Admin components/AddNotes/Addnotes';
import ViewNotes from './Admin components/AddNotes/Viewnotes';
import Book from './User Components/Hero/Book';
import Viewuseruniversity from './User Components/institutes/Viewuseruniversity';
import Viewusercolleges from './User Components/institutes/Viewusercolleges';
import { UniversityProvider } from './User Components/institutes/UniversityProvider';
import Usercourses from './User Components/institutes/Usercourses';
import UserDistribution from './User Components/Distribution/UserDistribution';
import MyContribution from './User Components/Distribution/MyContribution';
import { UserProvider } from './User Components/Distribution/UserProvider';

function App() {
  return (
    <UserProvider>
    <UniversityProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/adminhome' element={<Adminhome />} />
        <Route path='/signinsignup' element={<SigninSignup />} />
        <Route path='/userhome' element={<Userhome />} />
        <Route path='/adduniversity' element={<AddUniversity />} />
        <Route path='/viewuniversity' element={<Viewuniversity />} />
        <Route path='/addcollege/:id' element={<AddCollege />} />
        <Route path='/viewcollege' element={<ViewColleges />} />
        <Route path='/addcourse/:id' element={<Addcourse />} />
        <Route path='/addnotes' element={<AddNotes />} />
        <Route path='/viewnotes' element={<ViewNotes />} />
        <Route path='/Book' element={<Book />} />
        <Route path='/viewuseruniversity' element={<Viewuseruniversity />} />
        <Route path='/viewusercolleges' element={<Viewusercolleges />} />
        <Route path='/usercourses' element={<Usercourses/>}/>
        <Route path='/distribution' element={<UserDistribution/>}/>
        <Route path='/mycontribution' element={<MyContribution/>}/>
      </Routes>
      <Footer />
    </UniversityProvider>
    </UserProvider>
  );
}

export default App;
