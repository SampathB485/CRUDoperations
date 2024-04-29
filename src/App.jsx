import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  let [fname, Setfname] = useState('');
  let [lname, Setlname] = useState('');
  let [dbData, SetdbData] = useState([]);

  useEffect(() => {
    fetchDBData(); // the functionality of this is to get the data from the json and give it to dbData hook as list of objects so that it uses the map function and renders the data...on the output
  }, [dbData])

  let HandleFnameEvent = (fnameevent) => {Setfname(fnameevent.target.value);}
  let HandleLnameEvent = (lnameevent) => {Setlname(lnameevent.target.value);}

  async function fetchDBData() {
    let resp = await axios.get('http://localhost:4001/Candidatenames');
    SetdbData(resp.data);
  }

  async function EnterData() {
    if(fname == '' || lname ==''){
      alert("Please enter all the feilds");
    }
    else{
      await axios.post('http://localhost:4001/Candidatenames', {fname, lname});
      Setfname('');
      Setlname('');

    }
  }

  async function DeleteInd(propVal) {
    await axios.delete("http://localhost:4001/Candidatenames/" + propVal)
  }

  async function ModifyInd(modifiedpropVal) {
    let firstname = prompt("Enter the firstname");
    let lastname = prompt("Enter the last name")
    await axios.put("http://localhost:4001/Candidatenames/"+ modifiedpropVal, {"fname": firstname, "lname":lastname})
  }



  return (
    <>
      <div className='LoginFormStyling mt-5'>
        <div className='d-flex flex-column align-items-center'>
          <input type="text" placeholder='Enter your fname' value={fname} onChange={HandleFnameEvent} className='form-control mb-3 HeightAndWidth' />
          <input type="text" placeholder='Enter your lname' value={lname} onChange={HandleLnameEvent} className='form-control mb-3 HeightAndWidth' />
          <div className='butt'>
            <button className='btn btn-success'>Show</button>
            <button className='btn btn-primary' onClick={EnterData}>Enter</button>
          </div>
          
        </div>
      </div>
    
      {
        dbData.map(
          (d, i) => {
            return (
              <p key={i}>
                {d.fname} {d.lname}
                <button className='btn btn-danger' onClick={() => DeleteInd(d.id)}>X</button>
                <button className='btn btn-info' onClick={() => ModifyInd(d.id)}>M</button>
              </p>
            )
          }
        )
      }

    </>
  )
}

export default App
