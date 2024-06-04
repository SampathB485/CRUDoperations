import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function Home(){
    let [dataArray, setDataArray] = useState([])
    useEffect(()=>{
        LoadData()
    }, [dataArray])

    async function LoadData(){
        let obj = await axios.get('http://localhost:4000/Candidatenames');
        setDataArray(obj.data);
    }

    async function DeleteFunction(deleteData){
        await axios.delete('http://localhost:4000/Candidatenames/'+deleteData)
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
                                <td>{d.name}</td>
                                <td>{d.email}</td>
                                <td>{d.phone}</td>
                                <td> <button> <Link to='/Modify'>Edit</Link></button> <button onClick={()=>DeleteFunction(d.id)}>Delete</button></td>
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