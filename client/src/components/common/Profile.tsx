import { Email, Phone, Place, Edit } from '@mui/icons-material';
import { Box, Stack, Typography, IconButton } from '@mui/material';

import { useGetIdentity } from '@refinedev/core';

import { useNavigate } from "react-router-dom";

import { ProfileProps, PropertyProps } from 'interfaces/common';
import PropertyCard from './PropertyCard';

import CustomButton from './CustomButton';

function checkImage(url: any) {
  let img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const Profile = ({ _id, type, name, address, contactNo, avatar, email, properties }: ProfileProps) => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<{[key: string]: any} | null>();
  const isCurrentUser = user?.email === email;

  return(
  <Box>
    <Typography fontSize={25} fontWeight={700} color="#11142D">{type} Profile</Typography>

    <Box
      mt="20px"
      borderRadius="15px"
      padding="20px"
      bgcolor="#fafafa"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2.5,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
          width={340}
          height={320}
          alt="abstract"
          className="my_profile-bg"
        />
        <Box
          flex={1}
          sx={{ marginTop: { md: '58px' }, marginLeft: { xs: '20px', md: '0px' } }}
        >
          <Box flex={1} display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap="20px">
            <img
              src={checkImage(avatar) ? avatar : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"}
              width={78}
              height={78}
              alt="user_profile"
              className="my_profile_user-img"
            />

            <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between" gap="30px">
              
              <Stack direction="column">
                <Typography fontSize={22} fontWeight={600} color="#11142D">{name}</Typography>
                <Typography fontSize={16} color="#808191">Realestate Agent</Typography>
              </Stack>

              <Stack direction="column" gap="30px">
                {address &&
                  <Stack gap="15px">
                  <Typography fontSize={14} fontWeight={500} color="#808191">Address</Typography>
                  <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
                    <Place sx={{ color: '#11142D' }} />
                    <Typography fontSize={14} color="#11142D">{address}</Typography>
                  </Box>
                  </Stack>

                }
                

                <Stack direction="row" flexWrap="wrap" gap="20px" pb={4}>
                  {contactNo && 
                    <Stack flex={1} gap="15px">
                    <Typography fontSize={14} fontWeight={500} color="#808191">Phone Number</Typography>
                    <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
                      <Phone sx={{ color: '#11142D' }} />
                      <Typography fontSize={14} color="#11142D" noWrap>{contactNo}</Typography>
                    </Box>
                    </Stack>
                  }
                  

                  <Stack flex={1} gap="15px">
                    <Typography fontSize={14} fontWeight={500} color="#808191">Email</Typography>
                    <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
                      <Email sx={{ color: '#11142D' }} />
                      <Typography fontSize={14} color="#11142D">{email}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
              {
                isCurrentUser && (
                  <Box alignSelf="flex-end">
                    <IconButton aria-label="edit" 
                      sx={{
                        borderRadius: "50",
                        color: "#FCFCFC",
                        backgroundColor: "primary.main",
                        border: "2px solid",
                        borderColor: "primary",
                        '&:hover' : {
                          opacity: 0.8,
                          backgroundColor: "primary.main"
                        }
                      }}
                      onClick={() => {
                        if (isCurrentUser) {
                            navigate(
                                `/my-profile/edit/${_id}`,
                            );
                        }
                      }}
                    >
                        <Edit />
                    </IconButton>
                  
                  </Box>
                )
              }
              
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>

    {properties.length > 0 && (
    <Box
      mt={2.5}
      borderRadius="15px"
      padding="20px"
      bgcolor="#fafafa"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142D">{type} Properties</Typography>

      <Box
        mt={2.5}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2.5,
        }}
      >
        {properties?.map((property: PropertyProps) => (
          <PropertyCard key={property._id} id={property._id}
          addressLine1={property.addressLine1}
          addressLine2={property.addressLine2}
          city={property.city}
          state={property.state}
          zipcode={property.zipcode}
          price={property.price}
          photo={property.photo}
          />
        ))}
      </Box>
    </Box>
    )}
  </Box>
)};

export default Profile;