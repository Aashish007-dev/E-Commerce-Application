import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
            <p className='text-xl font-semibold text-gray-600'>Our Store</p>
            <p className='text-gray-500'>504, Railway Station, <br/> Suite 50, Mumbai Waste, India</p>
            <p className='text-gray-500'>Tel: (123) 555-10234 <br/> Email: foreverdeal@official.com</p>
            <p className='font-semibold text-xl text-gray-600'>Careers at Forever Deal</p>
            <p className='text-gray-500'>We're always looking for talented people to join our team.</p>
            <button className='border- border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default Contact