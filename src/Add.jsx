import axios from "axios"
import React ,{ useState } from "react"
import { Link } from "react-router-dom"
import Validator from "validatorjs";

function Add(){
    let [Name, SetName] = useState('');
    let [Email, SetEmail] = useState('');
    let [Phone, SetPhone] = useState('');

    function HandleEventName(nameEvent){
        SetName(nameEvent.target.value)
    }
    function HandleEventEmail(emailEvent){
        SetEmail(emailEvent.target.value)
    }
    function HandleEventNum(phoneEvent){
        SetPhone(phoneEvent.target.value)
    }

    async function SaveDataFunction(){     

        if (Name == '' || Email == '' || Phone == ''){
            alert("Enter all the feilds")
        } 
        else{
            await axios.post('http://localhost:4000/Candidatenames', {Name, Email, Phone})
            SetName('')
            SetEmail('')
            SetPhone('')
        }
    }

    return(
        <>
            <h1>Adding the details</h1>
            Name <input type="text" placeholder="Enter the name" value={Name} onChange={HandleEventName}/> <br />
            Email <input type="email" placeholder="Enter the Email" value = {Email} onChange={HandleEventEmail}/> <br />
            Phone <input type="number" placeholder="Enter the number" value={Phone} onChange={HandleEventNum}/> <br />
            <button><Link to='/'>Back</Link></button> <button onClick={()=>SaveDataFunction()}>Save</button>
        </>
    )
}

export default Add