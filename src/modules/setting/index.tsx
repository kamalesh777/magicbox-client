import { Grid2, Box, Paper, Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import UserList from './UserList'

const SettingComp = () => {
  return (
    <div className="company-form">
      <Grid2 container justifyContent="center">
        <Grid2 size={{ md: 8, sm: 12 }}>
          <Box component={"h3"}>Control Panel</Box>
          <form className='mb-3'>
            <FormControlLabel className='d-block' control={<Checkbox defaultChecked />} label="Ready to play?" />
            <FormControlLabel className='d-block' control={<Checkbox defaultChecked />} label="Stop profile updation" />
          </form>
          <Box component={"p"} sx={{ color: "error.main" }}>All users are listed for this current workspace, Admin can active or deactivate a user. </Box>
            <Paper >
              <UserList />
            </Paper>
        </Grid2>
      </Grid2>
    </div>
  )
}

export default SettingComp