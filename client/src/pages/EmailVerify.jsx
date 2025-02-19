/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { toast } from "react-toastify"
import { AppContent } from "../context/AppContext"
import axios from "axios"

const EmailVerify = () => {

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContent)

  // it holds an array of input elements
  const inputRefs = React.useRef([])

  //function to enter the next block automatically when entering password
  const handleInput = (e,index)=>{
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus();
    }
  }

  // function to go back when we enter backspace while entering password
  const handleKeyDown = (e,index) =>{
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index - 1].focus();
    }
  }

  // function for pasting the copied password
  const handlePaste = (e) =>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }

  // function after submitting the otp
  const onSubmitHandler = async (e) =>{
    try {

      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const {data} = await axios.post(backendUrl + '/api/auth/verify-account',{otp})
      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  //automatically redirect to home page if the user is already verified when he tries to enter into verify-email
  useEffect(()=>{
    if(isLoggedin && userData.isAccountverified) {
      navigate('/')
    } 
  },[isLoggedin, userData.isAccountverified,navigate])


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
        <img onClick={()=>navigate('/')} src={assets.shaf_logo}  alt="" className="absolute left-5 sm:left-10 top-5 w-20 sm:w-20 cursor-pointer"/>
        <form onSubmit={onSubmitHandler} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Email Verify OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your email id.
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6).fill(0).map((_,index)=>(
              <input 
               className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md" 
               type="text" 
               maxLength='1' 
               key={index} 
               required
               ref={e=> inputRefs.current[index] = e}
               onInput={(e)=>handleInput(e,index)}
               onKeyDown={(e)=>handleKeyDown(e,index)}
              />
            ))}
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer">
            Verify Email
          </button>

        </form>
    </div>
  )
}

export default EmailVerify
