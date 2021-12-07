import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { getSeriesByMonth } from '../RevenueHelper';

const generateOptions = (props: any) => {
  const { xCategories, data, title, subTitle } = props;

  return {
    title: {
      text: title,
    },

    subtitle: {
      text: subTitle,
    },

    yAxis: {
      title: {
        text: 'Doanh số',
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
