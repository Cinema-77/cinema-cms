import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type GenerateOptionsColumnType = {
  data: any;
  xCategories: string[];
  text: string;
};

const generateOptions = (props: GenerateOptionsColumnType) => {
  return {
    chart: {
      type: 'column',
    },
    title: {
      text: props.text,
    },
    xAxis: {
      categories: props.xCategories,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Tổng doanh thu',
        data: props.data.map((item: any) => item.totalPrice),
      },
      {
        name: 'Tổng tiền bán thức ăn ',
        data: props.data.map((item: any) => item.totalPriceFood),
      },
      {
        name: 'Tổng tiền bán vé',
        data: props.data.map((item: any) => item.totalPriceTicket),
      },
    ],
  };
};

export const ColumnChart = ({ data }: { data: GenerateOptionsColumnType }) => {
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={generateOptions(data)} />
    </>
  );
};
