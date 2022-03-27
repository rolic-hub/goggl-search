import React from 'react'
import { RevolvingDot} from 'react-loader-spinner'
const Loading = () => {
  return (
    <div className='flex justify-center items-center pt-20 '
    ><RevolvingDot className="h-20px" type="Puff" color="#00BFFF" height={550} width={80} />
    </div>
  )
}

export default Loading