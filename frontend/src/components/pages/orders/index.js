import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {saveShippingAddress, savePaymentMethod} from '../../../redux/features/cart/cartSlice';
import ProgressSteps from './progress_steps';

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const {shippingAddress} = cart;

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Payment
  useEffect(() => {
    if(!shippingAddress.address){
      navigate('/shipping')
    }
  },[navigate, shippingAddress])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/place-order')
  }

  return (
    <div className='container mx-auto mt-10'>
      <ProgressSteps/>
       <div className='mt-[10rem] flex justify-around items-center flex-wrap'>
           <form 
             className='w-[40rem]'
             onSubmit={submitHandler}
           >
              <h1 className='text-xl font-semibold mb-4'>Shipping</h1>
              <div className='mb-4'>
                 <label className='block text-white mb-2'>Address</label>
                 <input 
                  type='text' 
                  className='w-full p-2 border rounded bg-[#333333] text-white' 
                  placeholder='Enter address...'
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                 />
              </div>
              <div className='mb-4'>
                 <label className='block text-white mb-2'>City</label>
                 <input 
                  type='text' 
                  className='w-full p-2 border rounded bg-[#333333] text-white' 
                  placeholder='Enter city name...'
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                 />
              </div>
              <div className='mb-4'>
                 <label className='block text-white mb-2'>Postal Code</label>
                 <input 
                  type='text' 
                  className='w-full p-2 border rounded bg-[#333333] text-white' 
                  placeholder='Enter postal code...'
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                 />
              </div>
              <div className='mb-4'>
                 <label className='block text-white mb-2'>Country</label>
                 <input 
                  type='text' 
                  className='w-full p-2 border rounded bg-[#333333] text-white' 
                  placeholder='Enter country...'
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                 />
              </div>
              <div className='mb-4'>
                 <label className='block text-gray-400'>Select Method</label>
                 <div className='mt-2'>
                    <label className='inline-flex items-center'>
                        <input 
                          type='radio' 
                          className='form-radio text-green-500' 
                          name='paymentMethod' 
                          value='PayPal'
                          checked={paymentMethod === 'PayPal'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className='ml-2'>PayPal or Credit Card</span>
                    </label>
                 </div>
              </div>
              <button 
                className='bg-green-500 text-white py-2 px-4 rounded-full text-lg w-full'
                type='submit'
              >
                 Continue
              </button>
           </form>
       </div>
    </div>
  )
}

export default Shipping