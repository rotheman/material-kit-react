import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import AccountProfile from "../components/profile/account-profile";
import { DashboardLayout } from "../components/dashboard-layout";
import AccountProfileDetails from "src/components/profile/account-profile-details";

const Profile = () => (
  <>
    <Head>
      <title>Profile | planBar </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile />
          </Grid>
        </Grid>
        <br></br>
        <Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Profile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Profile;
