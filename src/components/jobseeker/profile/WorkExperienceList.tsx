import React from 'react'

function WorkExperienceList() {
  return (
    <div>
      <div className='bg-base-100 p-4 rounded-md'>
        <h1 className='text-xl'>Junior Frontend Engineer</h1>
        <h2>@ Company Name</h2>
        <h3 className='text-gray-500 text-sm'>Mar 2019 - May 2020 (1 year & 1 month)</h3>
        <div>
        <div className="divider my-1"></div>
          <span className="badge badge-neutral">React.js</span>
          <div className="divider my-1"></div>
        </div>
        <p className='mt-2'>
          I was responsible for building UI elements & write testing. There I&apos;ve used React 
          and TailwindCSS. I&apos;ve also used Storybook to build UI components.
        </p>
      </div>
    </div>
  )
}

export default WorkExperienceList