import React from 'react'

const Results = ({results  ,Total}) => {
  return (
    <section className='flex flex-col gap-4  font-sans'>
         <h1 className='text-Neutral-White text-2xl font-semibold text-start'>Your Results</h1>
         <p className=' text-Neutral-300 font-medium text-sm'>  Your results are shown below based on the information you provided. 
         To adjust the results, edit the form and click “calculate repayments” again.</p>
         <section className='bg-Neutral-1000 rounded-lg border-t-4 border-t-Lime p-4'>
            <div  className='py-4'>
                <h2 className=' text-Neutral-500 font-semibold'>Your monthly repayments</h2>
                <h3 className='text-4xl md:text-5xl text-Lime font-semibold pt-2'> &pound;{results}</h3>
            </div>
            <hr  className='text-Neutral-White opacity-50'/>
            <div className='py-4'>
            <h2 className=' text-Neutral-500 font-semibold'>Total you'll repay over the term</h2>
            <h3 className='text-2xl text-Neutral-White font-semibold pt-2'> &pound;{Total.toFixed(2)}</h3>
            </div>
         </section>
    </section>
  )
}

export default Results