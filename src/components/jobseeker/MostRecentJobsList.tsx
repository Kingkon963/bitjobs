import React from "react";
import { api } from "@utils/api";
import JobCard from "./JobCard";
import { useIntersection } from "react-use";
import Loading from "@components/Loading";

function MostRecentJobsList() {
  const [page, setPage] = React.useState(1);
  const getMostRecentJobQuery = api.job.getMostRecentJobs.useQuery(
    { cursor: page },
    {
      keepPreviousData: true,
    }
  );
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  React.useEffect(() => {
    if (intersection?.isIntersecting && getMostRecentJobQuery.data?.hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [getMostRecentJobQuery.data?.hasMore, intersection?.isIntersecting]);

  return (
    <div className="mt-4 grid grid-cols-1 gap-4">
      {getMostRecentJobQuery.data?.jobs?.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
      <span ref={intersectionRef}>
        {getMostRecentJobQuery.isFetching && <Loading />}
      </span>
    </div>
  );
}

export default MostRecentJobsList;
