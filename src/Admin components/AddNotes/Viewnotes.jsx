import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ViewNotes.css';

const ViewNotes = () => {
  const location = useLocation();
  const { note } = location.state || {};

  useEffect(() => {
    const handleCopy = (event) => {
      event.preventDefault();
      alert('The text is protected and cannot be copied.');
    };

    document.addEventListener('copy', handleCopy);
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-md px-4 md:px-8">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">Uploaded Notes</h1>

        {note ? (
          <div className="note mb-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">{note.subject}</h2>
            <h3 className="mb-2 text-gray-500 text-sm md:text-base lg:text-lg">{note.selectedUniversity} - {note.selectedCollege}</h3>
            <p className="mb-2 text-gray-500 text-sm md:text-base lg:text-lg">{note.selectedCourse}, Semester {note.selectedSemester}</p>
            <pre className="mb-4 text-sm md:text-base lg:text-lg">{note.notes}</pre>
          </div>
        ) : (
          <p className="text-center text-gray-500 w-full">No note selected</p>
        )}
      </div>
    </div>
  );
};

export default ViewNotes;
