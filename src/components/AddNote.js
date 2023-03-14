import React, {useContext, useState} from 'react'
import NoteContext from "../context/NoteContext"

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();

export default function SignIn(props) {

    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note,setNote] = useState({title : "", description:""})

    const handleClick = (e)=>{
        window.location.reload();
        addNote(note.title, note.description);
        props.showAlert("Notes Added Successfully","success");
}
const onChange = (e)=>{
    setNote({...note, [e.target.name] : e.target.value})
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get('title'),
      description: data.get('description'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            <b>Add Your Notes Here!!</b> 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              value = {note.title}
              label="Enter Title and it must be more than 2 characters"
              name="title"
              autoComplete="title"
              autoFocus
              onChange = {onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              value = {note.description}
              label="Enter Description and it must be more than 5 characters"
              type="description"
              id="description"
              autoComplete="current-description"
              onChange = {onChange}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled = {note.title.length<3 || note.description.length<6}
              onClick = {handleClick}
            >
              Create Note
            </Button>
           
               
            
          </Box>
        </Box>
        
      
    </ThemeProvider>
  );
}