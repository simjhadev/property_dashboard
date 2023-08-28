import { useList } from '@refinedev/core';
import { Box, Typography } from '@mui/material';

import { AgentCard } from 'components';

const Agents = () => {
  const { data, isLoading, isError } = useList({
    resource: 'users',
  });

  const allAgents = data?.data ?? [];
  //console.log(allAgents);
  if (isLoading) return <div>Agent Loading...</div>
  if(isError) return <div>Error...</div>


  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
          Agents List
      </Typography>

      <Box
          mt="20px"
          sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              backgroundColor: "#fafafa",
          }}
      >
          {allAgents.map((agent) => (
              <AgentCard
                  key={agent._id}
                  id={agent._id}
                  address={agent.address}
                  contactNo={agent.contactNo}
                  name={agent.name}
                  email={agent.email}
                  avatar={agent.avatar}
                  noOfProperties={agent.allProperties.length}
              />
          ))}
      </Box>
    </Box>
  )
}

export default Agents;