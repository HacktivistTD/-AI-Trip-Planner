import React from 'react'

import {Button} from '../ui/button'


function Header() {
  return (
    <div className='p-2 shadow-sm flex justify-between  items-center px-5'>
        <div className=''>
        <img src='/ESTD2009.png' width="50" height="50" />
        </div>
        <div>
            <Button> Sign In</Button>
        </div>
       
    </div>
  )
}

export default Header