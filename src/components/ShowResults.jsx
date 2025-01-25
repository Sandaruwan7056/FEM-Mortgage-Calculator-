import React from 'react'
import emptyIcon from '/assets/images/illustration-empty.svg'

const ShowResults = () => {
  return (
    <section className='flex flex-col gap-4 items-center justify-center font-sans'>
            <img src={emptyIcon} alt="empty" />
            <h1 className='text-Neutral-White text-2xl font-semibold'>Results Shown Here</h1>
            <p className='text-center text-Neutral-300 font-medium'>Complete the form and click “calculate repayments” to see what 
            your monthly repayments would be.</p>
    </section>
  )
}

export default ShowResults