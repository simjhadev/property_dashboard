import { Box, Typography, FormControl, FormHelperText, TextField, 
  TextareaAutosize, Stack, InputLabel,
  Select, MenuItem, Button } from "@mui/material";

import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

import { unitedStatesNameList } from '../../constants';

const Form = ({type, register, handleSubmit, handleImageChange, formLoading, onFinishHandler, propertyImage, errors}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a Property
      </Typography>
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc"> 
        <form style={{ marginTop: '20px', width: '100%', display: 'flex',
        flexDirection: 'column', gap: '20px'}}
        onSubmit={handleSubmit(onFinishHandler)} noValidate>
          <FormControl>
            <FormHelperText
              sx={{fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d'}}
            >Enter Property Address</FormHelperText>
          </FormControl>

          <Stack direction="row" gap={4} >
            <FormControl fullWidth>
              <TextField 
                fullWidth
                required
                id="outlined-basic"
                color="info"
                label="Address line 1"
                variant="standard"
                {...register('addressLine1',
                  {required: "Required Field"})}
              />
              <FormHelperText sx={{ color: "error.main"}}>{errors.addressLine1?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              
              <TextField 
                fullWidth
                id="outlined-basic"
                color="info"
                label="Address line 2"
                variant="standard"
                {...register('addressLine2')}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" gap={4} >
            <FormControl fullWidth>
              
              <TextField 
                fullWidth
                required
                id="outlined-basic"
                color="info"
                label="City"
                variant="standard"
                {...register('city',
                {required: "Required Field",
                 pattern: {
                  value: /^[a-zA-Z]+(?:[\s-'.&/][a-zA-Z]+)*(?:[.|\s])?(?:[\(a-z\)])*$/,
                  message: "Invalid City Name"
                }
                })}
              />
              <FormHelperText sx={{ color: "error.main"}}>{errors.city?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth variant="standard">
            <InputLabel id="propertyStateName">State</InputLabel>
              <Select
                  labelId="propertyStateName"
                  color="info"
                  required
                
                  defaultValue={unitedStatesNameList[0].value}
                  {...register('state',{required: "Required Field"})}
                >
                  {
                    unitedStatesNameList.map((uState) => (
                      <MenuItem key={uState.value} value={uState.value}>{uState.title}</MenuItem>
                    ))
                  }
              </Select>
              <FormHelperText sx={{ color: "error.main"}}>{errors.state?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              
              <TextField 
                fullWidth
                required
                id="outlined-basic"
                color="info"
                label="ZipCode"
                variant="standard"
                {...register('zipcode',
                  {
                    required: "Required Field",
                    pattern: {
                    value: /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/,
                    message: "Invalid Zipcode"
                    }
                  })}
              />
              <FormHelperText sx={{ color: "error.main"}}>{errors.zipcode?.message}</FormHelperText>
            </FormControl>
          </Stack>


          <FormControl>
            <FormHelperText
              sx={{fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d'}}
            >Enter Description</FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="Write description"
              color="info"
              style={{
                width: '100%',
                background: 'transparent',
                fontSize: '16px', borderColor:'rgba(0,0,0,0.23)',
                borderRadius: 6, padding: 10, color: '#919191'
              }}
              {...register('description',{required: "Required Field"})}
            />
            <FormHelperText sx={{ color: "error.main"}}>{errors.description?.message}</FormHelperText>
          </FormControl>
          <Stack direction="row" gap={4} >
              <FormControl sx={{ flex:1 }} variant="standard">
            <InputLabel id="propertyType">Property Type</InputLabel>
                
                {/* inputProps={{ 'aria-label': 'Without label' }} */}
                <Select
                labelId="propertyType"
                  
                  color="info"
                  displayEmpty
                  required
                  
                  defaultValue="apartment"
                  {...register('propertyType',{required: "Required Field"})}
                >
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="villa">Villa</MenuItem>
                  <MenuItem value="farmhouse">Farmhouse</MenuItem>
                  <MenuItem value="condos">Condos</MenuItem>
                  <MenuItem value="townhouse">Townhouse</MenuItem>
                  <MenuItem value="duplex">Duplex</MenuItem>
                  <MenuItem value="studio">Studio</MenuItem>
                  <MenuItem value="chalet">Chalet</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "error.main"}}>{errors.propertyType?.message}</FormHelperText>
              </FormControl>
              <FormControl>
                <TextField 
                  fullWidth
                  required
                  id="outlined-basic"
                  color="info"
                  label="Property Price"
                  variant="standard"
                  type="number"
                  {...register('price',{required: "Required Field"})}
                />
                <FormHelperText sx={{ color: "error.main"}}>{errors.price?.message}</FormHelperText>
              </FormControl>
          </Stack>
          
          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography color="#11142d" fontSize={16} fontWeight={500} my="10px">
                Property photo
              </Typography>
              <Button component="label" 
                sx={{ width: 'fit-content', color: "#2ed480",
                textTransform:'capitalize', fontSize: 16}}>
                Upload*
                <input hidden accept="image/*"
                  type="file"
                  onChange={(e) => {
                    // @ts-ignore
                    handleImageChange(e.target.files[0])
                  }} />
              </Button>
            </Stack>
            <Typography fontSize={14} color="#808191" 
              sx={{
                wordBreak: 'break-all'
              }}
            >
            {propertyImage?.name} 
          </Typography>
          </Stack>

          <CustomButton 
            type="submit"
            title={formLoading ? 'Submitting...': 'Submit'}
            backgroundColor="primary.main"
            color="primary.contrastText"
          />
        </form>
      </Box>
    </Box>
  )
}

export default Form