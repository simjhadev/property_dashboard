import { Box, Typography, FormControl, FormHelperText, TextField, 
    TextareaAutosize, Stack} from "@mui/material";
import { AgentFormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const AgentProfileForm = ({register, formLoading, handleSubmit, onFinishHandler, errors}: AgentFormProps) => {
    //console.log(formLoading);
    
    return(

        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Edit Profile Information
            </Typography>
            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc"> 
            <form style={{ marginTop: '20px', width: '100%', display: 'flex',
                flexDirection: 'column', gap: '20px'}}
                onSubmit={handleSubmit(onFinishHandler)} noValidate>
            <FormControl>
                <FormHelperText
                sx={{fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d'}}
                >Enter Address</FormHelperText>

                <TextareaAutosize
                minRows={5}
                placeholder="Address"
                color="info"
                style={{
                    width: '100%',
                    background: 'transparent',
                    fontSize: '16px', borderColor:'rgba(0,0,0,0.23)',
                    borderRadius: 6, padding: 10, color: '#919191'
                }}
                {...register('address')}
                />

                <FormHelperText sx={{ color: "error.main"}}>{errors.address?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth>
              <TextField 
                color="info"
                label="Contact No"
                variant="standard"
                {...register('contactNo',
                {
                    pattern: {
                    value: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
                    message: "Invalid Contact No"
                    }
                }
                )}
              />
              <FormHelperText sx={{ color: "error.main"}}>{errors.contactNo?.message}</FormHelperText>
            </FormControl>
            
            <CustomButton 
            type="submit"
            title='Submit'
            backgroundColor="primary.main"
            color="primary.contrastText"
            />

            </form>
            </Box>
        </Box>
    );
}

export default AgentProfileForm;