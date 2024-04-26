import React, { Suspense, lazy, useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';

const SiteCard = lazy(() => import('../Components/SiteCard'));

const Destination = () => {
  const [destinations,setDestinations] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const placesRef = collection(db,"places")
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddDestination = async () => {
    if(!newDestination){
      alert("All fields are mandatory");
      return;
    }
    try {
      await addDoc(collection(db, "places"), {
        name: newDestination.name,
        location: newDestination.location,
        description: newDestination.description,
        img: newDestination.img,
      })
      .then(() => {
        setOpen(false);
        toast.success('Successfully toasted!')
        window.location.reload();
      })
    } catch (err) {
      toast.error(err.errors || err.message)
      console.log(err);
    }
  }

  const [newDestination, setNewDestination] = useState({
    name: "",
    location: "",
    description: "",
    img: ""
  });

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
        <button onClick={handleClickOpen} className='bg-[#007bff] text-white px-[10px] py-[5px] cursor-pointer rounded-md ml-2'>Add Destination</button>
      <div className='flex flex-wrap justify-center'>
      {filteredDestination.length === 0 ? (
    <Typography variant="body1">No destinations found.</Typography>
) : (
    filteredDestination.map((site) => (
        <div key={site.id} className="max-w-[280px] border rounded-lg text-center m-3 shadow hover:cursor-pointer font-poppins">
            <Suspense fallback={<div>Loading...</div>}>
                <SiteCard image={site.img} name={site.name} description={site.description} location={site.location}/>
            </Suspense>
        </div>
    ))
)}
     <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add New Destination"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            value={newDestination.name}
            onChange={(e) => setNewDestination({...newDestination, name: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            variant="standard"
            value={newDestination.location}
            onChange={(e) => setNewDestination({...newDestination, location: e.target.value})}
          />
           <TextField
            multiline
            minRows={4}
            margin="dense"
            label="Description"
            fullWidth
            variant="standard"
            value={newDestination.description}
            onChange={(e) => setNewDestination({...newDestination, description: e.target.value})}
          />
           <TextField
            margin="dense"
            label="Image Url"
            fullWidth
            variant="standard"
            value={newDestination.img}
            onChange={(e) => setNewDestination({...newDestination, img: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddDestination} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
     </div>
    </div>
  )
}

export default Destination