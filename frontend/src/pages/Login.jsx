import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currState, setCurrState] = useState('Login');

  const {setToken, backendUrl, token, navigate} = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if(currState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
         
        } else{
          toast.error(response.data.message);
        }
        
      } else{

        const response = await axios.post(backendUrl + '/api/user/login', {email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
         
        } else{
          toast.error(response.data.message);
        }

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    
  }

  useEffect(() => {
    if(token){
      navigate('/');
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4  text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currState}</p>
        <hr  className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {
      currState === 'Login' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-800' onChange={(e) => setName(e.target.value)} value={name} placeholder='Name' required/>
      }
      <input type="email" className='w-full px-3 py-2 border border-gray-800' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer text-gray-500 hover:text-gray-800'>Forgot your password?</p>
        {
          currState === 'Login'
          ? <p className='cursor-pointer text-gray-500'>Create an account <span onClick={() => setCurrState('Sign Up')} className='text-gray-700 cursor-pointer hover:text-gray-900'>{" "}Sign Up</span></p> 
          : <p className='cursor-pointer text-gray-500'>Already have an account? 
          <span onClick={() => setCurrState('Login')} className='text-gray-700 cursor-pointer hover:text-gray-900'>{" "}Login</span></p>
        }
      </div>
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer rounded'>
        {
          currState === 'Login' ? 'Login' : 'Sign Up'
        }
      </button>
    </form>
  )
}

export default Login