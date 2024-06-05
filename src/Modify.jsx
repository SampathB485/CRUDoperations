import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"


function Modify(){
    let {id} = useParams()
    let [respHook, SetRespHook] = useState([])
    useEffect(()=>{RetriveData()}, [])
    async function RetriveData(){
        let response = await axios.get('http://localhost:4000/Candidatenames/'+id)
        SetRespHook(response.data)
    } 
    
    let [Name, SetName] = useState('')
    let [Email, SetEmail] = useState('')
    let [Phone, SetPhone] = useState('')

    function HandleNameEvent(nameEvent){
        SetName(nameEvent.target.value)
    }
    function HandleEmailEvent(emailEvent){
        SetEmail(emailEvent.target.value)
    }
    function HandlePhoneEvent(phoneEvent){
        SetPhone(phoneEvent.target.value)
    }

    async function SaveDataFunction(){
        await axios.put('http://localhost:4000/Candidatenames/'+id, 
        {"Name" : Name,
        "Email" : Email,
        "Phone" : Phone})
        SetName('');
        SetEmail('')
        SetPhone('')
    }

    return(
        <>
            <h1>Modifying the details {id}</h1>
          
            Name <input type="text" placeholder="Enter the name" value={Name} onChange={HandleNameEvent}/> <br />
            Email <input type="email" placeholder="Enter the Email" value={Email} onChange={HandleEmailEvent}/> <br />
            Phone <input type="number" placeholder="Enter the number" value={Phone} onChange={HandlePhoneEvent}/> <br />
            <button className="btn btn-secondary"><Link to='/'>Back</Link></button> <button className="btn btn-success" onClick={()=>SaveDataFunction()}>Save</button>
            
        </>
    )
}

export default Modify