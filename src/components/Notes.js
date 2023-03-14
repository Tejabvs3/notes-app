import React,{useContext , useEffect , useRef, useState} from 'react'
import NoteContext from "../context/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import {TextField, CssBaseline, Modal, Typography, Button, Box} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Notes(props) {
    const context = useContext(NoteContext);
    const {notes, getNotes, editNote} = context;

    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
      }
     // eslint-disable-next-line  
    }, [])
    
   const ref = useRef(null);
   const refClose = useRef(null);
   const [note,setNote] = useState({id:"",etitle : "", edescription:""})

    const  updateNote = (currentNote)=>{
        ref.current.click();
        setNote({id: currentNote.id,etitle : currentNote.title, edescription : currentNote.description})
    }

    
    const handleClick = (e)=>{
      console.log("updating the note...",note);
      editNote(note.id,note.etitle,note.edescription)
       refClose.current.click();
        props.showAlert("Updated Successfully","success");

   
  }
const onChange = (e)=>{
  setNote({...note, [e.target.name] : e.target.value})
}

   // Below is for material ui "modal"
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   // Below is for material ui "form"
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get('title'),
      description: data.get('description'),
    });
  };

  return (
    <>
    <AddNote showAlert = {props.showAlert}/>
    <div>
      <Button onClick={handleOpen} ref={ref} className="d-none">Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Update Note</b>
          </Typography>
  <div id="modal-modal-description" sx={{ mt: 2 }}>

         
      
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="etitle"
            value = {note.etitle}
            label="Enter Title"
            name="etitle"
            autoComplete="title"
            autoFocus
            onChange = {onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="edescription"
            value = {note.edescription}
            label="Enter Description"
            type="edescription"
            id="edescription"
            autoComplete="current-description"
            onChange = {onChange}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled = {note.etitle.length<3 || note.edescription.length<6}
            onClick = {handleClick}
            ref = {refClose}
          >
            Update
          </Button>
       </Box>
      </Box>
         
</div>

        </Box>
      </Modal>
    </div>
    <div className="row mx-5 ">
        <div className="my-4"> <h3> <b>Your Notes</b></h3> </div>
  
  <div className="container mx-2">
      {notes.length===0 && "No Notes to Display"}
  </div>
  {notes.map((note)=>{
      return <NoteItem showAlert = {props.showAlert} key = {note.id} updateNote = {updateNote} note = {note}/>
  })}
  </div>
  </>
  )
}
