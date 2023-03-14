const express = require("express");
const router = express.Router();
const connectToMysql = require('../dbConnect');

const { body, validationResult } = require('express-validator');

// ROUTE 1 :  Get all NOtes using : GET "/api/notes/fetchallnotes".
router.get('/fetchallnotes', async(req, res) => {

  connectToMysql.query('SELECT * FROM enotes',(err,rows)=>{
   
    try {
      res.json(rows);
       } catch (error) {
     console.error(error.message);
       res.status(500).send("Internal Server Error");
      }
    
  })

})


// ROUTE 2:  Post NOtes using : post "/api/notes/addnote".
router.post('/addnote', [
    body('description','description must be atleast 5 characters').isLength({min : 6}),
    body('title','Enter a Valid title').isLength({min : 3}),
  ], async(req, res) => {

    
        //If there are errors, return Bad requests and errors 
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
       
      const new_note = req.body;  
      const data = [new_note.title,new_note.description];    
  connectToMysql.query('INSERT INTO enotes(title,description) values(?)',[data],(err,rows)=>{
        
    try {
         res.json({"success": "this note has been created", rows});
       } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
          
        
      })
})

// ROUTE 3 :  Put NOtes by id using : PUT "/api/notes/updatenote/:id".
router.put('/updatenote/:id', async(req, res) => {
  const update_note = req.body;   
  connectToMysql.query('UPDATE enotes SET ? WHERE id='+req.params.id,[update_note],(err,rows)=>{
      
    try {
      if(rows.affectedRows==0) res.status(404).send("NOT FOUND");
      else res.json({"success": "this note has been updated", rows});
       } catch (error) {
     console.error(error.message);
       res.status(500).send("Internal Server Error");
      }
          
      
    })
})

// ROUTE 4 :  DELETE NOtes using : DELETE "/api/notes/deletenote".
router.delete('/deletenote/:id', async(req, res) => {
        
  connectToMysql.query('DELETE FROM enotes WHERE id=?',[req.params.id],(err,rows)=>{

    try {
      if(rows.affectedRows==0) res.status(404).send("NOT FOUND");
      else res.json({"success": "this note is deleted", rows});
       } catch (error) {
     console.error(error.message);
       res.status(500).send("Internal Server Error");
      }
   
      })
})

module.exports = router