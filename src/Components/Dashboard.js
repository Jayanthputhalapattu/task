import React, { Component, useEffect, useState }  from 'react';
import {Col,Row,Container} from "reactstrap"
import {Redirect} from "react-router-dom"
import axios from 'axios';
const Dashboard = () =>{
    const [mail,setMail] = useState("")
    const [eV,seteV] = useState()
    useEffect(()=>{
        axios.get('http://localhost:5000/.netlify/functions/server/user/validjwt',
      
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
   if (localStorage.length==0)
   {
       console.log(0)
       return <Redirect to="/" />
   }
   if (localStorage.login)
   {
     var token = JSON.parse(localStorage.getItem('login')).token
 
   }
 
    return(
        
               <Container>
                   <Row>
                       <h2>USER DETAILS</h2>
                      email :  {mail}
                     <p>  Emailverified : {eV}</p>
                   </Row>
               </Container> 
        
    )
}
export default Dashboard