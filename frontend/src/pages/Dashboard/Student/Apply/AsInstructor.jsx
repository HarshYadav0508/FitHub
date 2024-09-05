import React, { useEffect, useState } from 'react'
import useUser from '../../../../hooks/useUser';
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import { FiBriefcase, FiMail, FiSend, FiUser } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';


const AsInstructor = () => {
  const {currentUser} = useUser();
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  

  useEffect(() => {
    axiosFetch.get(`/applied-instructors/${currentUser?.email}`)
    .then(res => {
      console.log(data)
      setSubmittedData(res.data);
      setLoading(false);
    }).catch((err) => console.log(err))
  }, [currentUser, axiosFetch])


  const onSubmit = (e) => {
    e.preventDefault();

    if (submittedData) {
      toast.error('You have already applied!');
      return;
    }


   
     const name = e.target.name.value;
     const email = e.target.email.value;
     const experience = e.target.experience.value;

     const data = {
      name, email, experience
     }

     axiosFetch.post(`/as-instructor`, data).then(res => {
      console.log(res.data);
      toast.info('APPLIED SUCCESSFULLY!');
      setSubmittedData(data);
     })
  }
     
  return (
    <>
    <ToastContainer position={toast.POSITION.TOP_CENTER}/>
    <div className='my-36 mx-20'>
    <div>
      {
        !submittedData?.name && (
          <div className='md:w-1/2'>
            <form onSubmit={onSubmit} >
              <div className='mb-10'>
                {/* Name and Email Section */}
                <div className='flex flex-col md:flex-row gap-6 mb-6'>
                  
                  {/* Name Field */}
                  <div className='w-full'>
                    <label className='text-gray-700 block mb-1' htmlFor="name">Name</label>
                    <div className='flex items-center'>
                      <FiUser className='text-gray-500' />
                      <input 
                        type="text" 
                        id='name' 
                        name='name' 
                        defaultValue={currentUser?.name} 
                        disabled 
                        readOnly 
                        className='ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none' 
                      />
                    </div>
                  </div>
  
                  {/* Email Field */}
                  <div className='w-full'>
                    <label className='text-gray-700 block mb-1' htmlFor="email">Email</label>
                    <div className='flex items-center'>
                      <FiMail className='text-gray-500' />
                      <input 
                        type="email" 
                        id='email' 
                        name='email' 
                        defaultValue={currentUser?.email} 
                        disabled 
                        readOnly 
                        className='ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none' 
                      />
                    </div>
                  </div>
                </div>
  
                {/* About You Section */}
                <div className='mb-4 w-full'>
                  <label htmlFor="experience" className='text-gray-700 block mb-1'>About You</label>
                  <div className='flex items-center'>
                    <FiBriefcase className='text-gray-500' />
                    <textarea 
                      name="experience" 
                      id="experience" 
                      placeholder='Tell us about your experience' 
                      className='ml-2 rounded-lg px-2 placeholder:text-sm py-1 w-full border border-gray-300 focus:border-secondary outline-none resize-none'
                    ></textarea>
                  </div>
                </div>
  
                {/* Submit Button */}
                <div className='flex justify-center'>
                  <button 
                    type='submit' 
                    className='flex items-center justify-center px-4 py-2 bg-secondary text-white rounded-md focus:outline-none'
                  >
                    <FiSend className='mr-2' />
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        )
      }
    </div>
  </div>
  
    </>
    
  )
}

export default AsInstructor