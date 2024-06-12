import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Distribution/UserProvider';
import Userheader from '../header/Userheader';


function MyContribution() {
  const { user } = useContext(UserContext);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (user) {
          fetchUserNotes();
      }
  }, [user]);

  const fetchUserNotes = async () => {
    try {
        console.log('Fetching user notes...');
        const response = await fetch(`http://localhost:4500/usernotes/${user.email}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        if (response.ok) {
            console.log('User notes fetched successfully.');
            const data = await response.json();
            setContributions(data);
        } else {
            console.error('Failed to fetch user notes:', response.statusText);
        }
        setLoading(false);
    } catch (error) {
        console.error('Error fetching user notes:', error);
        setLoading(false);
    }
};


  if (!user) {
      return <p>Please sign in.</p>;
  }

  if (loading) {
      return <p>Loading...</p>;
  }

    return (
        <>
            <Userheader />
            <table className="min-w-full my-5 border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">University</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">College</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Course</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Semester</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Subject</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Status</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Action</th>
                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {contributions.map((contribution) => (
                        <tr key={contribution._id} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span className="inline-block w-1/3 md:hidden font-bold">University</span>{contribution.selectedUniversity}
                            </td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span className="inline-block w-1/3 md:hidden font-bold">College</span>{contribution.selectedCollege}
                            </td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span className="inline-block w-1/3 md:hidden font-bold">Course</span>{contribution.selectedCourse}
                            </td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span className="inline-block w-1/3 md:hidden font-bold">Semester</span>{contribution.selectedSemester}
                            </td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span className="inline-block w-1/3 md:hidden font-bold">Subject</span>{contribution.subject}
                            </td>
                            <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                                <button className="group text-center relative h-14 w-24 overflow-hidden rounded-2xl bg-cyan-700 text-md  text-white">
                                    Confirm
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                </button>
                            </td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <button className="group relative h-14 w-24 overflow-hidden rounded-2xl bg-cyan-700 text-md  text-white">
                                    View
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default MyContribution;
