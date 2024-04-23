import React, { useState } from 'react'
import { Modal, Box, Typography, Divider, IconButton } from "@mui/material";
import { X } from 'lucide-react';

const SiteCard = ({ image, name, location, description }) => {
  const [modalStyle] = useState({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    display: 'flex',
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false)};
  
  return (
    <>
      <div onClick={handleOpen}>
        <img src={image} alt={name} className='w-full h-52 object-cover shadow-md' loading='lazy'/>
        <div className='flex flex-col gap-2 px-4 py-2'>
          <h3 className="text-xl font-medium border-b-2">{name}</h3> 
          <p className="text-gray-700">{location}</p> 
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <IconButton aria-label="close" color="inherit" size="large" onClick={handleClose} style={{ position: 'absolute', right: 10, top: 10 }}>
            <X />
            </IconButton>
            <img src={image} alt={name} className="w-1/2" loading='lazy'/>
            <Divider className="w-1 bg-gray-300" orientation="vertical" />
            <Box sx={{ width: "50%", padding: "1rem" }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {description}
              </Typography>
            </Box>
          </Box>
        </Modal>
    </>
  );
}

export default SiteCard;