import React from 'react';

import { Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const usestyles = makeStyles((theme) => ({
  chart: {
    display: 'flex',
    justifyContent: 'center',
    width: '35%',
    height: '35%',
    margin: '0 auto',
  },
  chartW: {
    display: 'flex',
    justifyContent: 'center',
    width: '20%',
    height: '20%',
    margin: '0 auto',
  },
}));

const Chart = ({ totalData }) => {
  console.log(totalData);

  const classes = usestyles();

  const dataGlobal = {
    labels: ['Total Confirmed', 'Total Recovered', 'Total Deaths'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          totalData?.totalConfirmed,
          totalData?.totalRecovered,
          totalData?.totalDeaths,
        ],
        backgroundColor: ['#f7ca3f', '#93f07c', '#ea6060'],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataNewGlobal = totalData?.newConfirmed > 0 && {
    labels: ['New Confirmed', 'New Recovered', 'New Deaths'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          totalData?.newConfirmed,
          totalData?.newRecovered,
          totalData?.newDeaths,
        ],
        backgroundColor: ['#f7ca3f', '#93f07c', '#ea6060'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Grid container spacing={3}>
      {totalData?.newConfirmed > 0 ? (
        <>
          <Grid item xs={12} sm={6}>
            <div className={classes.chart}>
              <Doughnut data={dataGlobal} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.chart}>
              <Doughnut data={dataNewGlobal} />
            </div>
          </Grid>
        </>
      ) : (
        <>
          <Grid item sm={12}>
            <div className={classes.chartW}>
              <Doughnut data={dataGlobal} />
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Chart;
