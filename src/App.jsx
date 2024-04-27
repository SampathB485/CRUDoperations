import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  let [cname, Setcname] = useState('');
  let [cemail, Setcemail] = useState('');
  let [indDetail, SetIndDetail] = useState({"name":'', "email":''})
  let [dbData, SetdbData] = useState([]);

  useEffect(() => {
    fetchDBData();
  }, [dbData])

  async function fetchDBData() {
    let resp = await axios.get('http://localhost:4001/Candidatenames');
    // console.log(resp.data); // just to check the data
    SetdbData(resp.data);
  }
  let HandleNameEvent = (nameevent) => {
    Setcname(nameevent.target.value);
    // SetIndDetail({"name":nameevent.target.value});
  }
  let HandleEmailEvent = (emailevent)=> {
    Setcemail(emailevent.target.value);
    // SetIndDetail({"email":emailevent.target.value});

  }

  async function EnterData() {


    if(cname == '' || cemail == ''){
      alert("Please enter all the feilds");
    }else{
      
      
      console.log("this is caname", cname)
      console.log("this is cmail", cemail)
      console.log('entire daata   .. :- ', indDetail )

      // await axios.post('http://localhost:4001/Candidatenames', { indDetail });
      Setcname('');
      Setcemail('');

    }
    


  }
  let urlHalf = "http://localhost:4001/Candidatenames/"

  async function DeleteInd(propVal) {


    let url = urlHalf + propVal;
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
      <div className='LoginFormStyling mt-5'>
        <div className='d-flex flex-column align-items-center'>
          <input type="text" placeholder='Enter your name' value={cname} onChange={HandleNameEvent} className='form-control mb-3 HeightAndWidth' />
          <input type="email" placeholder='Enter your email' value={cemail} onChange={HandleEmailEvent}  className='form-control mb-3 HeightAndWidth' />
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
