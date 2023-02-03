import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


//Creates a line chart for given data and sets the title of the chart
const LineChart = ({ data, title }) => {
  const chartRef = useRef(null);

  const avg = data.reduce((sum, item) => sum + item.value, 0) / data.length;
  const avgData = data.map(item => ({ date: item.date, value: avg }));


  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    myChart.setOption({
      title: {
        text: `${title}`
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: data.map(item => item.date)
      },
      yAxis: {
        type: 'value',
        min: data.reduce((min, value) => value.value < min ? value.value : min, data[0].value) - 5,  // minimum height
        max: data.reduce((max, value) => value.value > max ? value.value : max, data[0].value) + 5  // maximum height
        },
      series: [
        {
          name: `${title}`,
          type: 'line',
          data: data.map(item => item.value)
        },
        {
            name: 'Average',
            type: 'line',
            data: avgData.map(item => item.value),
            lineStyle: {
              color: 'red'
            }
        }
      ]
    });
  }, [data]);

  return <div ref={chartRef} style={{ height: '400px' }} />;
};

export default LineChart;
