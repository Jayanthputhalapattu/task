import React, { useEffect, useState }  from 'react';
import {Row,Container} from "reactstrap"
import {Redirect} from "react-router-dom"
import axios from 'axios';
const Dashboard = () =>{
    const [mail,setMail] = useState("")
    const [eV,seteV] = useState()
    useEffect(()=>{
        if (localStorage.login)
        {
          var token = JSON.parse(localStorage.getItem('login')).token
      
        }
        else{
            return <Redirect to="/" />
        }
        axios.get('https://xenodochial-dijkstra-938bdb.netlify.app/.netlify/functions/server/user/validjwt',
      
        {headers: { Authorization: `Bearer ${token}` }})
        .then(res=>{
           console.log(res)
           setMail(res.data.mail.email)
           if (res.data.mail.verified){
               seteV("yes")
           }
           else{
               seteV("No")
           }
        })
      
      },[])
   if (localStorage.length===0)
   {
       console.log(0)
       return <Redirect to="/" />
   }
  
   const handlerLogout =()=>{
    localStorage.clear()
    console.log(localStorage.length)
  return <Redirect to="/" />
  }
    return(
        
               <Container>
                   <Row>
                       <h2>USER DETAILS</h2>
                      email :  {mail}
                     <p>  Emailverified : {eV}</p>
                   </Row>
                   <button onClick={handlerLogout}>LOGOUT</button>
               </Container> 
        
    )
}
export default Dashboard