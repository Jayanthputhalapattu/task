import React,{useState,useEffect} from "react"
import { Redirect} from "react-router-dom"

import axios from "axios";
import {Container,Col,Row} from "reactstrap"
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from "react-toastify"
const Register = () =>{
    
  const [credentials,setCrediantials] = useState({
    Email: "",
    password: ""
 })
const [isLoggedin,setIsloggedin] = useState()
const changeHandler = () =>{
       setCrediantials({
           username : document.getElementById("uname").value,
           password : document.getElementById("pword").value
       })
      
}

const sendHandler =async (e)=>{
    e.preventDefault();   
   var response = await axios.post("https://xenodochial-dijkstra-938bdb.netlify.app/.netlify/functions/server/user/login",credentials)
  
   if (response.data.success===false){
        setIsloggedin(false)
        return toast(response.data.status.message,{type:"error"})
     }
     else {
     
      localStorage.setItem("login",JSON.stringify({
        login     : true,
        token : response.data.token
    }))
        window.location.reload()
     }
}

useEffect(()=>{
  if (localStorage.login)
{
  var token = JSON.parse(localStorage.getItem('login')).token
}

  axios.get('https://xenodochial-dijkstra-938bdb.netlify.app/.netlify/functions/server/user/validjwt',

  {headers: { Authorization: `Bearer ${token}` }})
  .then(res=>{
     var ret = res.data.success
   console.log(ret)
   setIsloggedin(ret)
  })
  
},[])
if(isLoggedin)
  {
    return <Redirect to="/dashboard"/>
  }
return(
     <div>
            <ToastContainer position="bottom-left"/>
          <Container >
     
              <Row >
                  <Col>
                  </Col>
                  <Col >
                  
                       <div className = "loginForm">
                              <span><h2 style={{textAlign :"center"}}>LOGIN</h2></span>
                           <form onSubmit ={sendHandler} >
                               <input type = "email" name = "name" placeholder= "Email" required value={credentials.username} onChange = {changeHandler} id="uname"/>
                               <input type = "password" id = "pword" placeholder = "password" required value = {credentials.password} onChange = {changeHandler}/>
                               <input type = "submit" value = "Login" id= "button"/>
                           </form>
                       </div>
                  </Col>
                  <Col>
                  </Col>
              </Row>
             
          </Container>
     </div>
)
}

export default (Register)