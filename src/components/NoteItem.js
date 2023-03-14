import React, {useContext} from 'react'
import NoteContext from "../context/NoteContext"
import { Card, CardActions, CardContent, Typography, } from '@mui/material';



export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const {deleteNote} = context;
    const {note, updateNote} = props;


    

      return (
        <div className = "col-md-3">
           <div className="card my-3">
               <Card sx={{ minWidth: 275 }}>
                <CardContent >
             <div className="d-flex align-items-center">
            <Typography variant="h5" component="div">
            <h5 className="card-title"><b>{note.title}</b></h5>
            </Typography>
            <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note.id); props.showAlert("Deleted Successfully","success");}}></i>
            <i className="fa-solid fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
           
            
            <p className="card-text">{note.description}  </p>
            
        

          </CardContent>
          <CardActions>
            
          </CardActions>
        </Card>
        </div>
    </div>
      );
    }
  

