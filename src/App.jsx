import { Suspense, lazy } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
let Lazyhome = lazy(()=>import ('./Home'));
let LazyAdd = lazy(()=>import ('./Add'));
let LazyModify = lazy(()=>import ('./Modify'));

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Suspense><Lazyhome/></Suspense>}></Route>
          <Route path='/Add' element = {<Suspense><LazyAdd/></Suspense>}></Route>
          <Route path='/Modify/:id' element = {<Suspense><LazyModify/></Suspense>}></Route>
          
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
