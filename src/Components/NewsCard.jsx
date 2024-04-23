import React from 'react'
import { Link } from 'react-router-dom'
const NewsCard = ({title,image,description,link}) => {
  return (
   <Link to={link} target='_blank' rel="noopener noreferrer">
    <div className='max-w-xs mx-auto bg-white rounded-lg'>
        <img src={image} alt={title} className='w-full h-48 object-cover object-center' loading='lazy'/>
            <div className='px-6 py-4'>
                <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
                <p className="mt-2 text-gray-600">{description}</p>
            </div>
    </div>
   </Link>
  )
}

export default NewsCard
