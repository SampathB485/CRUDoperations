import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  let [cname, Setcname] = useState('');
  let [dbData, SetdbData] = useState([]);

  useEffect(() => {
    fetchDBData(); // the functionality of this is to get the data from the json and give it to dbData hook as list of objects so that it uses the map function and renders the data...on the output
  }, [dbData])

  async function fetchDBData() {
    let resp = await axios.get('http://localhost:4001/Candidatenames');
    SetdbData(resp.data);
  }

  let HandleNameEvent = (nameevent) => {Setcname(nameevent.target.value);}

  async function EnterData() {

    if(cname == ''){
      alert("Please enter all the feilds");
    }
    else{
      let name = cname;
      await axios.post('http://localhost:4001/Candidatenames', { name});
      Setcname('');

    }
  }
  let urlHalf = "http://localhost:4001/Candidatenames/"

  async function DeleteInd(propVal) {


    let url = urlHalf + propVal;
    // console.log(url)
    await axios.delete(url)
  }

  async function ModifyInd(modifiedpropVal) {
    let url = urlHalf+ modifiedpropVal;
    await axios.put(url, {"name": "maarindi ggaa"})
  }



  return (
    <>
      <div className='LoginFormStyling mt-5'>
        <div className='d-flex flex-column align-items-center'>
          <input type="text" placeholder='Enter your name' value={cname} onChange={HandleNameEvent} className='form-control mb-3 HeightAndWidth' />
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
                {d.name}
                <button onClick={() => DeleteInd(d.id)}>X</button>
                <button onClick={() => ModifyInd(d.id)}>M</button>
              </p>
            )
          }
        )
      }

    </>
  )
}

export default App
