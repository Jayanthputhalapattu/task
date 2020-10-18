import React, { useState } from "react"

import Axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { Input, Container, Row, Col } from "reactstrap"

const SignUp = () =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [cpassword,setCpassword] = useState("");
 
    const handleSubm=async(e)=>{
        e.preventDefault()
        if(cpassword!==password){
            return toast("Passwords does not match",{type:"error"})
        }
     
        const response = await Axios.post("http://localhost:5000/.netlify/functions/server/user/signup",{username:email,password:password})
        console.log(response)
        if (response.data.success)
        {
            return toast(response.data.status,{type:"success"} )
        }
        if (response.data.err){
            return toast(response.data.err.message,{type:"error"})
      
        }
        
    }
    return(
        <div className="loginn">
        <Container fluid style={{height:window.innerHeight-65}}>
             
            <ToastContainer position="bottom-left"/>
      
<form className="loginForm" onSubmit={handleSubm}> 
<h2>SIGNUP</h2>
            <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email"/>
             <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
             <input type="password" required value={cpassword} onChange={(e)=>setCpassword(e.target.value)} placeholder="confirm password"/>
               <input type="submit" value="submit" />
               </form>
      
        </Container>
        
        </div>
    )
}
export default SignUp