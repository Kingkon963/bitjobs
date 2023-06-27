import React from 'react'
import { api } from "@utils/api";
import JobCard from './JobCard';


function MostRecentJobsList() {
  const getMostRecentJobQuery = api.job.getMostRecentJobs.useQuery();

  return (
    <div className="mt-4 grid grid-cols-1 gap-4">
    {getMostRecentJobQuery.data?.map((job) => (
      <JobCard job={job} key={job.id}/>
    ))}
  </div>
  )
}

export default MostRecentJobsList