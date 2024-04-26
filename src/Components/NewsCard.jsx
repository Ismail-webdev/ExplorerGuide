import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Box, Typography,Grid, IconButton } from "@mui/material";
import { X } from 'lucide-react';
const NewsCard = ({title,image,link}) => {
  return (
    <>
    <Link to={link} target='_blank'>
    <div className='max-w-xs mx-auto bg-white rounded-lg'>
        <img src={image} alt={title} className='w-full h-48 object-cover object-center' loading='lazy'/>
            <div className='px-6 py-4'>
                <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
            </div>
    </div>
   </Link>
    </>
  )
}

export default NewsCard
