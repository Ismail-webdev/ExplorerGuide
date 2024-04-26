import React, { Suspense, lazy, useEffect, useState } from 'react'
import { db } from '../config/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Typography } from '@mui/material';

const SiteCard = lazy(() => import('../Components/SiteCard'));
const UNESCO = () => {
  const [unesco,setUnesco] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const ref = collection(db,"unescoSite")
 
    useEffect(() => {
      const fetchUnesco = async()=>{
        try {
          const q = query(ref)
          const unsub = onSnapshot(q,(data)=>{
            let fetchData = [];
            data.forEach((doc)=>{
              fetchData.push({id: doc.id, ...doc.data()})
            })
            setUnesco(fetchData)
          })
          return ()=> unsub;
        } catch (error) {
          console.error(error)
        }
      }
      fetchUnesco()
    }, []);

    const filteredUnesco = unesco.filter((site) =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className='py-20 text-center'>
      <h3 className='text-2xl font-poppins font-bold'>UNESCO SITES OF INDIA</h3>
     <input type="text" placeholder='Search....' value={searchQuery}onChange={(e)=> setSearchQuery(e.target.value)} className='border rounded-md px-2 py-1 my-4 right-0'/>
     <div className='flex flex-wrap justify-center'>
     {filteredUnesco.length === 0 ? (
    <Typography variant="body1">No UNESCO sites found.</Typography>
) : (
    filteredUnesco.map((site) => (
        <div key={site.id} className="max-w-[280px] border rounded-lg text-center m-3 shadow hover:cursor-pointer font-poppins">
            <Suspense fallback={<div>Loading...</div>}>
                <SiteCard image={site.img} name={site.name} location={site.location} description={site.description} />
            </Suspense>
        </div>
    ))
)}
     </div>
    </div>
  )
}

export default UNESCO
