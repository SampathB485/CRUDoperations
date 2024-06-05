import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function Home(){
    let [dataArray, setDataArray] = useState([])
    useEffect(()=>{
        LoadData()
    }, [dataArray])
    const navigate = useNavigate(); 

    async function LoadData(){
        let obj = await axios.get('http://localhost:4000/Candidatenames');
        setDataArray(obj.data);
    }

    async function DeleteFunction(deleteData){
        await axios.delete('http://localhost:4000/Candidatenames/'+deleteData)
    }

    function RedirectToModify(id){
        navigate('/Modify/'+id)
    }

    return(
        <>
        <div>
            <button className="btn btn-primary"><Link to='/Add'>Add Item +</Link></button>
            <table>
                <thead>
                    <tr><th>Name</th>
                    <th>Email</th> 
                    <th>Phone Number</th> 
                    <th>Action</th></tr>
                </thead>
                <tbody>
                    {
                        dataArray.map((d, i)=>{
                            return <tr key = {i}>
                                <td>{d.Name}</td>
                                <td>{d.Email}</td>
                                <td>{d.Phone}</td>
                                <td> <button onClick={()=>{RedirectToModify(d.id)}}>Edit</button> <button onClick={()=>DeleteFunction(d.id)}>Delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
                
            </table>
        </div>
        </>
    )
}

export default Home