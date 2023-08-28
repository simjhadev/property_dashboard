import { Add } from '@mui/icons-material';
import { useMemo } from "react";
import { Box, Typography, Stack, TextField, Select, MenuItem} from '@mui/material';
import { useTable } from '@refinedev/core';
import { useNavigate } from 'react-router-dom';
import { PropertyCard, CustomButton } from 'components';

const AllProperties = () => {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError},
    current,
    setCurrent,
    pageSize, setPageSize,
    pageCount,
    sorters, setSorters,
    filters, setFilters
  } = useTable();
 
  //console.log(data);
  const allProperties = data?.data ?? [];
  //console.log(sorters);

  const currentPrice = sorters.find((item) => item.field === 'price')?.order;

 
  const toggleSort = (field: string) => {
    setSorters([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc'}])
  }

  const currentFilterValues = useMemo(() => {
    
    const logicalFilters = filters.flatMap((item) => ('field' in item ? item : []));
    //console.log(filters);
    return {
      address: logicalFilters.find((item) => item.field === 'address')?.value || '',
      
      propertyType: logicalFilters.find((item) => item.field === 'propertyType')?.value || '',
    }
  }, [filters])
  
  if(isLoading) return <Typography>Loading...</Typography>
  if(isError) return <Typography>Error...</Typography>

  return (
    <Box>
      <Box mt="20px" sx={{display: 'flex', flexWrap: 'wrap', gap: 3}}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allProperties.length ?'There are no properties':'All Properties'}
          </Typography>  
          <Box mb={2} mt={3} display="flex" width="84%" justifyContent="space-between" flexWrap="wrap">
            <Box display="flex" gap={2} flexWrap="wrap" mb={{ xs: '20px', sm: 0}}>
              <CustomButton 
                title={`Sort  price ${currentPrice === 'asc' ? '↑': '↓'}`}
                handleClick={()=> toggleSort('price')}
                backgroundColor="primary.main"
                color="primary.contrastText"
              />
              <TextField 
                variant="outlined"
                color="info"
                placeholder="Search by Location"
                value={currentFilterValues.address}
                onChange={(e)=>{
                  setFilters([
                    {
                      field: 'address',
                      operator: 'contains',
                      value: e.currentTarget.value ? e. currentTarget.value : undefined
                    }
                  ])
                }}
              />
              <Select 
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ 'aria-label' : 'Without Label' }}
                defaultValue=""
                value={currentFilterValues.propertyType}
                onChange={(e)=>{
                  setFilters([
                    {
                      field: 'propertyType',
                      operator: 'eq',
                      value: e.target.value 
                    }
                  ], 'replace')
                }}
              >
                <MenuItem value="">All</MenuItem>
                {['Apartment', 'Villa', 'Farmhouse', 'Condos', 'Townhouse', 'Duplex', 'Studio', 'Chalet']
                .map(type => (
                  <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>

                ))}


              </Select>

            </Box>
          </Box>
        </Stack>
      </Box>
        





      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomButton title="Add Property" handleClick={()=> navigate('/property/create')} backgroundColor="primary.main"
          color="primary.contrastText" icon={<Add />}/>

      </Stack>
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3}}>
        {allProperties.map((property)=>(
          <PropertyCard 
            key={property._id}
            id={property._id}
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
      {allProperties.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton 
            title="Previous"
            handleClick={()=> setCurrent((prev) => prev - 1) }
            backgroundColor="primary.main"
            color="primary.contrastText"
            disabled={!(current > 1)}
          />
          <Box display={{ xs: 'hidden', sm: 'flex'}} alignItems="center" gap="5px">
            Page{' '}<strong>{current} of {pageCount}</strong>
          </Box>
          <CustomButton 
            title="Next"
            handleClick={()=> setCurrent((prev) => prev + 1) }
            backgroundColor="primary.main"
            color="primary.contrastText"
            disabled={current === pageCount }
          />

          <Select 
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ 'aria-label' : 'Without Label' }}
                defaultValue={10}
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value ? Number(e.target.value): 10)}
              >
                {[10, 20, 30, 40, 50].map((size)=>(
                  <MenuItem key={size} value={size}>Show {size}</MenuItem>

                ))}

              </Select>
        </Box>
      )}
    </Box>
  )
}

export default AllProperties;