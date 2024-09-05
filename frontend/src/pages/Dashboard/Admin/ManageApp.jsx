import React, { useState, useEffect } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import { toast } from 'react-toastify';
import { GrUpdate } from "react-icons/gr";
import { FcDeleteDatabase } from 'react-icons/fc';

const ManageInstructors = () => {
    const axiosFetch = useAxiosFetch();
    const [instructors, setInstructors] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInstructorsEmails = async () => {
            try {
                const response = await axiosFetch.get('/applied-instructors');
                const emails = response.data;
                
                // Fetch details for each instructor
                const fetchedInstructors = await Promise.all(
                    emails.map(email => axiosFetch.get(`/applied-instructors/${email}`).then(res => res.data))
                );
                setInstructors(fetchedInstructors);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchInstructorsEmails();
    }, []);

    const handleApprove = (email) => {
        axiosFetch.post(`/approve-instructor/${email}`).then(() => {
            toast.success('Instructor Approved!');
            setInstructors(instructors.filter(instructor => instructor.email !== email));
        }).catch(err => console.log(err));
    };

    const handleReject = (email) => {
        axiosFetch.delete(`/reject-instructor/${email}`).then(() => {
            toast.warn('Instructor Rejected!');
            setInstructors(instructors.filter(instructor => instructor.email !== email));
        }).catch(err => console.log(err));
    };

    return (
      <div>
            <h1 className='font-bold text-center text-4xl'>Manage Instructors</h1>
            {error && <p>Error: {error}</p>}
            {instructors.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                    <p>No applications for instructors at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {instructors.map((instructor, index) => (
                        <div key={index} className="bg-white p-4 shadow-lg rounded-lg">
                            <h2 className="text-xl font-bold">{instructor.name}</h2>
                            <p className="text-gray-600">{instructor.email}</p>
                            <p>Status: {instructor.status}</p>
                            <div className="mt-4 flex gap-2">
                                <button onClick={() => handleApprove(instructor.email)} className="bg-green-500 text-white px-4 py-2 rounded">
                                    <GrUpdate /> Approve
                                </button>
                                <button onClick={() => handleReject(instructor.email)} className="bg-red-500 text-white px-4 py-2 rounded">
                                    <FcDeleteDatabase /> Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageInstructors;
