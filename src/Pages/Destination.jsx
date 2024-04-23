import React, { Suspense, lazy, useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'

const SiteCard = lazy(() => import('../Components/SiteCard'));

const Destination = () => {
  const [destinations,setDestinations] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const placesRef = collection(db,"places")
  useEffect(()=>{
    const fetchDestination = async()=>{
      try {
        const q = query(placesRef)
        const unsub = onSnapshot(q,(data)=>{
          let fetchPlaces = [];
          data.forEach((doc)=>{
              fetchPlaces.push({id: doc.id, ...doc.data()})
          })
          setDestinations(fetchPlaces)
        })   
        return ()=> unsub;
      } catch (error) {
        console.error("Error", error)
      }
    }
    fetchDestination()
  },[])
  const filteredDestination = destinations.filter((site) =>
  site.name.toLowerCase().includes(searchQuery.toLowerCase())
);
  return (
    <div className='py-16 text-center'>
        <h3 className='text-2xl font-poppins font-bold text-center'>DESTINATIONS</h3>
        <input type="text" placeholder='Search....' value={searchQuery}onChange={(e)=> setSearchQuery(e.target.value)} className='border rounded-md px-2 py-1 my-4'/>
      <div className='flex flex-wrap justify-center'>
     {filteredDestination && filteredDestination.map((site)=>(
     <div key={site.id} className="max-w-[280px] border rounded-lg text-center m-3 shadow hover:cursor-pointer font-poppins">
              <Suspense fallback={<div>Loading...</div>}>
                <SiteCard image={site.img} name={site.name} description={site.description} />
              </Suspense>
     </div>
     ))}
     </div>
    </div>
  )
}

export default Destination
