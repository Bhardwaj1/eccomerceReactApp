import React from 'react'
import Button from '../UI/Button';

const Warning = ({handleCloseWarningModal,handleDelete}) => {
  return (
    <div className='pb-6 py-6 my-5 max-w-sm mx-auto shadow-md flex flex-col items-center space-y-4'>
      <p className='text-lg font-bold text-center'>Are You Sure ?</p>
      <div className='flex flex-col sm:flex-row gap-8'>
      <Button onClick={handleCloseWarningModal}>Cancel</Button>
      <Button onClick={handleDelete}>Okay</Button>
      </div>
    </div>
  )
}

export default Warning;
