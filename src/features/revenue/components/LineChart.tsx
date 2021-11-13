import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// import { Button, ButtonGroup } from '@chakra-ui/react';
import { IRevenueData } from '@/features/revenue';

const generateOptions = (data: IRevenueData[]) => {
  const categories = data.map((item) => item.date);

  return {
    chart: {
      height: 500,
    },
    title: {
      text: 'Doanh thu rạp phim',
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#F3585B'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: 'right',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} VNĐ</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
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
        data: data.map((item) => item.totalPrice),
      },
    ],
  };
};

export const LineChart = ({ data }: { data: IRevenueData[] }) => {
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={generateOptions(data)} />
    </>
  );
};
