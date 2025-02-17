import React from 'react';

const CategoryForm = (
  {
    value,
    setValue,
    handleSubmit,
    buttonText = 'Submit',
    handleDelete
  }
  ) => 
  {
    return (
      <div className='p-3'>
         <form onSubmit={handleSubmit} className='space-y-3'>
             <input 
                type='text' 
                id='categoryInp'
                className='py-3 px-4 border rounded-lg w-full text-black'
                placeholder='Enter category name...'
                value={value}
                onChange={(e) => setValue(e.target.value)}
             />
             <div className='flex justify-between'>
                <button 
                   className='bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700
                   focus:outline-none focus:ring-2 focus: ring-pink-600 focus:ring-opacity-50'>
                    {buttonText}
                </button>
                {handleDelete && (
                    <button 
                       className='bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 
                       focus:outline-none focus:ring-2  focus:ring-red-600 focus:ring-opacity-50'
                       onClick={handleDelete}
                       >
                        Delete
                    </button>
                 )
                }
             </div>
         </form>
      </div>
    )
  }

export default CategoryForm