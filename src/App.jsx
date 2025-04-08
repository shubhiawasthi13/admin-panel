import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import { Link, Outlet} from "react-router-dom";
function App() {

  // let [url,setUrl] = useState("http://localhost:3002/")
  
  // let change = (ev)=>{
  //   setUrl(ev.target.id);
  //   console.dir(ev.target.id);
  //   console.log(url)
  // }
  return (
    <>
      
      <nav class="navbar navbar-expand-lg fixed-top bg-light navbar-light">
        <div class="container">
        <h1> EatOAdmin </h1>
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto align-items-center">
        <li class="nav-item">
          <Link to ='/' class='nav-link mx-2'>Dashboard</Link>
        </li>
        <li class="nav-item">
          <Link to ='/add-dish' class='nav-link mx-2'>Add Dish</Link>
        </li>
        <li class="nav-item">
          <Link to ='/orders' class='nav-link mx-2'>Dinning Orders</Link>
        </li>
        <li class="nav-item">
          <Link to ='/zomato' class='nav-link mx-2'>Zomato Orders</Link>
        </li>
        {/* <li class="nav-item">
          <a class="nav-link mx-2" onClick={change} id='http://localhost:5173/inventory'  href="#!"><i class="fas fa-bell pe-2"></i>Inventory</a>
        </li> */}
        <li class="nav-item">
          <Link to ='/inventory' class='nav-link mx-2'>Inventory</Link>
        </li>
      
        {/* <li class="nav-item">
          <a class="nav-link mx-2" onClick={change} id='http://localhost:3002/' href="#!"><i class="fas fa-heart pe-2"></i>Settings</a>
        </li> */}
           <li class="nav-item">
          <Link to ='#' class='nav-link mx-2'>Settings</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<Outlet/>
      {/* <iframe src={url} className='iframe' title="Iframe Example"></iframe> */}
    </>
  )
}

export default App

