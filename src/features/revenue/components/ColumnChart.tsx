import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type GenerateOptionsColumnType = {
  data: any;
  xCategories: string[];
  text: string;
  type?: string;
};

const generateOptions = (props: GenerateOptionsColumnType) => {
  const { data, xCategories, text, type } = props;
  let seriesData: any;

  switch (type) {
    case 'Full':
      seriesData = [
        {
          name: 'Doanh thu',
          data: [data.ticket.total, data.food.total, data.totalPrice],
        },
      ];
      break;
    case 'Movie':
    case 'Room':
    case 'Time':
      seriesData = [
        {
          name: 'Doanh thu vé',
          data: data.map((value: any) => value.statistical.ticket.total),
        },
        {
          name: 'Doanh thu thức ăn',
          data: data.map((value: any) => value.statistical.food.total),
        },
        {
          name: 'Doanh thu cả hai',
          data: data.map((value: any) => value.totalPrice),
        },
      ];
      break;

    default:
      seriesData = [];
  }

  return {
    chart: {
      type: 'column',
    },
    title: {
      text: text,
    },
    xAxis: {
      categories: xCategories,
    },
    credits: {
      enabled: false,
    },
    series: seriesData,
  };
};

export const ColumnChart = ({ data }: { data: GenerateOptionsColumnType }) => {
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={generateOptions(data)} />
    </>
  );
};
