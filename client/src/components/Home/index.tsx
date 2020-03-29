import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { Layout } from 'components';

const Home = () => (
  <Layout>
    <Grid container>
      <Grid item>
        <Typography variant="h5">COVID-19 Rosario</Typography>
      </Grid>
    </Grid>
  </Layout>
);

export default Home;