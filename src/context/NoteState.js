import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState =(props)=>{


     const host = "http://localhost:5001"
    
     const notesInitial = []

      const [notes, setNotes] = useState(notesInitial);
      
      // Get all Notes
      const getNotes = async(title, description)=>{
        //API CALL
        const url = `${host}/api/notes/fetchallnotes`;
       const response = await fetch(url, {
         method: 'GET', 
       
       headers: {
           'Content-Type': 'application/json'
           }, 
       });
       const json =  await response.json();
       console.log(json);
       setNotes(json);
     }

     //ADD NOTE
      const addNote = async(title, description)=>{
         //API CALL
         const url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
           
           }, 
          body: JSON.stringify({title , description}) 
        });
        const json =  await response.json();

        // the below code is for frotend appearence and the above addnotes code is for storing notes in backend
         console.log("notes to be added");
          
         const note = json;
          setNotes(notes.concat(note)) 
      }

    // DELETE NOTE
    //API CALL
    const deleteNote = async(id)=>{
       //API CALL
       const url = `${host}/api/notes/deletenote/${id}`;
      const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          
          }, 
       
      });
       const json =  response.json();
        console.log(json);

    // Below is for deletion in frontend and above is for deletion in  backend
      console.log("Delete the note with id :" + id)
      const newNote = notes.filter((e)=>{return e.id!==id});
        setNotes(newNote);
        
    }

    //EDIT NOTE
    const editNote = async(id, title, description)=>{
       //API CALL
       const url = `${host}/api/notes/updatenote/${id}`;
      const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
         
        }, 
        body: JSON.stringify({title , description}) 
      });
      const json =  await response.json(); 
      console.log(json);

       let newNotes = JSON.parse(JSON.stringify(notes));
         for (let index = 0; index < newNotes.length; index++) {
           const element = newNotes[index];
            if(element.id === id){
              newNotes[index].title = title;
              newNotes[index].description = description;
         
              break;
            }
        } 
        setNotes(newNotes);
       
       
    }

    return(
        <NoteContext.Provider value={{notes , deleteNote, addNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;