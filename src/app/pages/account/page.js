import { Box, Container, Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { AccountProfile } from "../../sections/account/account-profile";
// import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
// import { AccountProfile } from "src/sections/account/account-profile";
// import { AccountProfileDetails } from "src/sections/account/account-profile";
// import AccountProfile from "../../sections/account/account-profile";

const Page = () =>

(

  <>
    <Head>
      <title>Account</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">Аккаунт</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              {/* <Grid xs={12} md={6} lg={4}> */}
              <AccountProfile />
              {/* </Grid> */}
              {/* <Grid xs={12} md={6} lg={8}> */}
              {/* <AccountProfileDetails /> */}
              {/* </Grid> */}
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
