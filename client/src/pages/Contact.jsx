import React from 'react';
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ContactUs(){
    return (<>
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800'>
        Any Questions?
      </h1>
      <p className='mb-4 text-slate-700'>
        We would love to get your feedback on anything from features you wish were added to things we can improve on. 
        Feel free to leave a comment in the box below or send an email to Jason Zheng. 
        </p>
    </div>

    <Feedback/>
    </>)
}
function Feedback(){

  const [formData, setFormData] = useState({});
    const navigate = useNavigate()
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
     
    };
    const { currentUser } = useSelector((state) => state.user);
    const handleSubmit = async (e) => {
      e.preventDefault();
      formData['username'] = currentUser.email
      const res = await fetch('/api/user/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json(); 
      console.log(data)
      navigate('/')  

    };
  
    return (<>
      <form onSubmit={handleSubmit} className=''>
          <input
            type='text'
            placeholder='Write Here'
            id='feedback'
            className=''
            onChange={handleChange}
          />
          <input
            type='submit'
          />
        </form>
    </>)
}