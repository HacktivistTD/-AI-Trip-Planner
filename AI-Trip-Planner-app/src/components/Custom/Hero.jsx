import React from 'react'
import { Button } from '../ui/button'
import { Link } from  'react-router-dom'


function Hero() {
  return (
    <div className='flex  flex-col items-center mx-56 gap-9 text-center'>
        <h1
        className='font-extrabold text-[60px]'
        
        >bbbb</h1>

        <Link to={'/create-trip'}>
        <Button> Get Start. It's Free</Button>
        </Link>
    </div>
  )
}

export default Hero