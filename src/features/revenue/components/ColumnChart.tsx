import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// import { Button, ButtonGroup } from '@chakra-ui/react';
import { IRevenueQuarter } from '@/features/revenue';

const generateOptions = (data: IRevenueQuarter[]) => {
  const categories = data.map((item) => `Quý ${item.quarter}`);

  return {
    chart: {
      height: 500,
    },
    title: {
      text: 'Doanh thu rạp phim theo quý',
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#F3585B'],
    yAxis: {
      min: 0,
      title: {
        text: 'Doanh số',
      },
      labels: {
        align: 'right',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>',
      shared: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Tổng doanh thu',
        type: 'column',
        colorByPoint: true,
        data: data.map((item) => item.totalPrice),
      },
    ],
  };
};

export const ColumnChart = ({ data }: { data: IRevenueQuarter[] }) => {
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={generateOptions(data)} />
    </>
  );
};
