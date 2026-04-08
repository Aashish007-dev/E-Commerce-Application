import React, { useState } from 'react'

const Login = () => {

  const [currState, setCurrState] = useState('Sign Up');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
  }





  return (
    <form onClick={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4  text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currState}</p>
        <hr  className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {
      currState === 'Login' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>
      }
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer text-gray-500 hover:text-gray-800'>Forgot your password?</p>
        {
          currState === 'Login'
          ? <p className='cursor-pointer text-gray-500'>Create an account <span onClick={() => setCurrState('Sign Up')} className='text-gray-700 cursor-pointer hover:text-gray-900'>{" "}Sign Up</span></p> 
          : <p className='cursor-pointer text-gray-500'>Already have an account? 
          <span onClick={() => setCurrState('Login')} className='text-gray-700 cursor-pointer hover:text-gray-900'>{" "}Login</span></p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer rounded'>
        {
          currState === 'Login' ? 'Login' : 'Sign Up'
        }
      </button>
    </form>
  )
}

export default Login