import { Modal, Box, Typography, Divider,IconButton } from "@mui/material";
import {X} from 'lucide-react';

import { useState } from "react"
const Card = ({name,image,description,location}) => {
    const[open,setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalStyle]= useState({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      bgcolor: 'background.paper',
      boxShadow: 24,
      borderRadius: 4,
      display: 'flex',
    })
  return (
      <>
         <div className="lg:w-1/3 px-3 mb-6 lg:mb-0" onClick={handleOpen}>
             <article className="h-full shadow-md rounded">
                 <img src={image} alt={name} className="object-cover w-full h-44" loading="lazy"/>
                 <div className="p-4 leading-normal">
                     <h3 className="mb-6 text-xl font-medium">{name}</h3>
                 </div>
             </article>
         </div>
         <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <IconButton aria-label="close" color="inherit" size="large" onClick={handleClose} style={{ position: 'absolute', right: 10, top: 10 }}>
                <X />
                </IconButton>
                <img src={image} alt={name} className="w-1/2" loading="lazy"/>
                <Divider className="w-1 bg-gray-300" orientation="vertical"/>
                <Box sx={{width: "50%", padding: "1rem"}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {name}  ({location})
                </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
                </Box>
            </Box>
      </Modal>
     </>
  )
}

export default Card
