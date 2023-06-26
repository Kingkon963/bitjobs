import React from 'react'
import * as Tabs from "@radix-ui/react-tabs";
import MostRecentJobsList from './MostRecentJobsList';


function JobFeedTabs() {
  return (
    <Tabs.Root defaultValue="1">
    <Tabs.List className="tabs">
      <Tabs.Trigger
        className="tab tab-lifted data-[state=active]:tab-active "
        value="1"
      >
        Most Recent
      </Tabs.Trigger>
      <Tabs.Trigger
        className="tab tab-lifted data-[state=active]:tab-active"
        value="2"
      >
        Best Matches
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="1">
      <MostRecentJobsList />
    </Tabs.Content>
    <Tabs.Content value="2">Best mathed Jobs</Tabs.Content>
  </Tabs.Root>
  )
}

export default JobFeedTabs