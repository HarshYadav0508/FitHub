import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useUser from '../../../../hooks/useUser';

const EnrolledClasses = () => {
  const [data, setData] = useState([]);
  const axioSecure = useAxiosSecure();
  const {currentUser} = useUser();

  useEffect (() => {
    axioSecure.get(`/enrolled-classes/${currentUser?.email}`)
    .then(res => {
      setData(res.data);
    }).catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h1 className='text-2xl my-6`'>Enrolled Classes</h1>
      <div>
        {
          data.map((item, index) => (
            <div></div>
              
          ))
        }
      </div>
    </div>
  )
}

export default EnrolledClasses