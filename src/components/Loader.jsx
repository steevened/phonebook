import React from 'react'
import { Pulsar } from '@uiball/loaders'

const Loader = () => {
  return (
    <div className='fixed inset-0 z-50 bg-black flex items-center justify-center'>
      <Pulsar size={40} speed={1.75} color='white' />
    </div>
  )
}

export default Loader
