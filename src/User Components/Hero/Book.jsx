import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Book.css';
import Userheader from '../header/Userheader';

function Book() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (course) {
      const fetchNotes = async () => {
        try {
          console.log('Fetching notes for:', course);

          const response = await fetch(
            `http://localhost:4500/api/notes?selectedUniversity=${encodeURIComponent(course.uniName)}&selectedCollege=${encodeURIComponent(course.collName)}&selectedCourse=${encodeURIComponent(course.course)}&selectedSemester=${encodeURIComponent(course.sem)}`
          );

          console.log('Response status:', response.status);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Fetched notes:', data);
          setNotes(data);
        } catch (error) {
          console.error('Error fetching notes:', error);
        }
      };

      fetchNotes();
    }
  }, [course]);

  const handleViewNote = (note) => {
    navigate('/viewnotes', { state: { note } });
  };

  return (
    <>
      <Userheader />
      <div className="component ">
        <ul className="align rounded-lg shadow">
          {notes.map((note, index) => (
            <li key={index}>
              <figure className="book">
                <ul className="hardcover_front">
                  <li>
                    <img src="http://www.noteshub.online/lg.jpg" alt="Book cover" width="100%" height="100%" />
                    <span className="ribbon bestseller">Nº1</span>
                    <p>{note.subject}</p>
                  </li>
                  <li></li>
                </ul>
                <ul className="page">
                  <li></li>
                  <li>
                    <button className="btn p-3" onClick={() => handleViewNote(note)}>View</button>
                  </li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <ul className="hardcover_back">
                  <li></li>
                  <li></li>
                </ul>
                <ul className="book_spine">
                  <li></li>
                  <li></li>
                </ul>
                <figcaption>
                  <span className='scroll-mt-8'>E-BOOK</span>
                  <h1>UNITS: </h1>
                  <p>{note.units}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Book;
