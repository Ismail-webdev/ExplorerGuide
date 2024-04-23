import React, { Suspense, lazy, useEffect, useState } from 'react'
import { db } from '../config/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';

const HeroSection = lazy(() => import('../Components/HeroSection'));
const Card = lazy(() => import('../Components/Card'));
const Discover = lazy(() => import('../Components/Discover'));
const placesRef = collection(db,"places")


const Home = () => {
  const [places,setPlaces] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const q = query(placesRef)
        const unsub = onSnapshot(q,(data)=>{
          let fetchPlaces = [];
          data.forEach((doc)=>{
            fetchPlaces.push({id: doc.id, ...doc.data()})
          });
          setPlaces(fetchPlaces)
        });
         return ()=> unsub;
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  },[])
  return (
   <div className='py-12'>
    <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
        <Discover />
        <section className='py-20' id='travel'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl font-semibold mb-6'>Tourist Places</h2>
            <div className='flex flex-wrap justify-center lg:justify-start hover:cursor-pointer'>
              {places.slice(0, 3).map((place) => (
                <Card
                  key={place.id}
                  name={place.name}
                  image={place.img}
                  description={place.description}
                  location={place.location}
                />
              ))}
            </div>
            <button
              className='inline-block bg-indigo-800 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mt-8 focus:outline-none focus:shadow-outline'
              onClick={() => {
                navigate('/destinations');
              }}
            >
              View All
            </button>
          </div>
        </section>
      </Suspense>
   </div>
  )
}

export default Home
