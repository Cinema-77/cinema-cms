import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { getSeriesByMonth } from '../RevenueHelper';

const generateOptions = (props: any) => {
  const { xCategories, data, title } = props;
  console.log(getSeriesByMonth(data));
  return {
    title: {
      text: title,
    },

    subtitle: {
      text: 'Source: thesolarfoundation.com',
    },

    yAxis: {
      title: {
        text: 'Number of Employees',
      },
    },

    xAxis: {
      categories: xCategories,
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

    // plotOptions: {
    //   series: {
    //     label: {
    //       connectorAllowed: false,
    //     },
    //     pointStart: 2010,
    //   },
    // },

    series: getSeriesByMonth(data),

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  };
};

export const LineChart = ({ data }: { data: any }) => {
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={generateOptions(data)} />
    </>
  );
};
