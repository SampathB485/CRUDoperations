import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  let [cname, Setcname] = useState('');
  let [dbData, SetdbData] = useState([]);

  useEffect(()=>{
    fetchDBData();
  },[dbData])
  
  async function fetchDBData(){
    let resp = await axios.get('http://localhost:4001/Candidatenames');
    // console.log(resp.data); // just to check the data
    SetdbData(resp.data); 
  }

  let HandleEvent = (event) => {
    Setcname(event.target.value); 
  }
  async function EnterData(){
    let name = cname;
    await axios.post('http://localhost:4001/Candidatenames', {name})

    Setcname('');


  }
  let urlHalf = "http://localhost:4001/Candidatenames/"

  async function DeleteInd(propVal) {

    
    let url = urlHalf+propVal;
    // console.log(url)
    await axios.delete(url)
  }

  // async function ModifyInd(propVal) {

  //   let url = urlHalf+propVal;
  //   let modifiedObj = {}
  //   await axios.put(url,modifiedObj)
  // }
  

  
  return (
    <>
      <input type="text" id="InputTag" placeholder='Enter your name' value={cname} onChange={HandleEvent}/> <button onClick={EnterData}>Enter</button>
      {
        dbData.map(
          (d,i)=>{
            return(
                <p key={i}>
                  {d.name} 
                  <button onClick={()=> DeleteInd(d.id)}>X</button> 
                  <button onClick={()=> ModifyInd(d.id)}>M</button>
                </p>
            )
          }
        )
      }
      
    </>
  )
}

export default App
