import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import MovieDetails from './Components/MovieDetails/MovieDetails';

import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtetctRoute from './Components/ProtetctRoute/ProtetctRoute';




function App() {

  useEffect(()=> {
    if(localStorage.getItem("userToken") !== null){
saveUserData()
    }
  },[])

const[userData,setUserData] =useState(null)


function saveUserData(){
  let encodedToken=localStorage.getItem("userToken")
  let decodedToken = jwtDecode(encodedToken)
  setUserData(decodedToken)
  console.log(userData);
}


let routers = createHashRouter ([
  { path: "", element: <Layout setUserData={setUserData} userData={userData} /> , children: [
    {index:true , element:<ProtetctRoute><Home/></ProtetctRoute> },
    {path:"home" , element: <ProtetctRoute><Home/></ProtetctRoute> },
    {path:"movies" , element: <ProtetctRoute><Movies/></ProtetctRoute> },
    {path:"tvshow" , element: <ProtetctRoute><Tvshow/></ProtetctRoute> },
    {path:"people" , element: <ProtetctRoute><People/></ProtetctRoute> },
    {path:"moviedetails/:id/:mediaType" , element: <ProtetctRoute><MovieDetails/></ProtetctRoute> },

    {path:"login" , element: <Login saveUserData={saveUserData}/>},
    {path:"register" , element: <Register/>},
    {path:"*" , element: <Notfound/>},
  ]}
])





  return <RouterProvider router={routers}></RouterProvider>
}

export default App;
