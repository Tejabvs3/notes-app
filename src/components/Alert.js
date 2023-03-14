
import React from 'react'
import Alert from '@mui/material/Alert';

function alert(props) {
    const capitalize = (word)=>{
      if(word==="danger") word="Error"
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height: '50px'}}>
        {props.alert && 
<Alert severity={`${props.alert.type}`}><strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} </Alert>}
        </div>
    )
}

export default alert
