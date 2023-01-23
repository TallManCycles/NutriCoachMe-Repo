import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import { PieChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import { getColor } from 'helpers/utils';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import BasicECharts from 'components/common/BasicEChart';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import getSupabaseClient from 'supabase/getSupabaseClient';
import { supabase } from 'supabase/supabaseClient';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer
]);

const getOptions = (data, radius) => ({
  color: [
    getColor(data[0].color),
    getColor(data[1].color),
    getColor(data[2].color)
  ],

  tooltip: {
    padding: [7, 10],
    transitionDuration: 0,
    backgroundColor: getColor('gray-100'),
    borderColor: getColor('gray-300'),
    textStyle: { color: getColor('dark') },
    borderWidth: 1,
    formatter: params =>
      `<strong>${params.data.name}:</strong> ${params.percent}%`
  },
  series: [
    {
      name: '%',
      type: 'pie',
      radius,
      avoidLabelOverlap: false,
      emphasis: {
        scale: false
      },
      itemStyle: {
        borderWidth: 2,
        borderColor: getColor('gray-100')
      },
      label: {
        show: true,
        position: 'center',
        formatter: '{a}',
        fontSize: 23,
        color: getColor('dark')
      },
      data
    }
  ]
});

const MacrosItem = ({ item, index, total }) => {
  const { name, color, macro } = item;

  return (
    <Flex
      alignItems="center"
      justifyContent="between"
      className={`fw-semi-bold fs--2 ${index == 0 && 'mt-3'}`}
    >
      <p className="mb-1">
        <FontAwesomeIcon
          icon="circle"
          className={`me-2 text-${color.split('-')[1] || color || 'text-info'}`}
        />
        {name}
      </p>
      <div className="d-xxl-none">{macro}g</div>
    </Flex>
  );
};

const Macros = ({ radius }) => {

  const [changed, setChanged] = useState(false)

  const [macros, setMacros] = useState({
    protein: 0,  
    carbs: 0,
    fat: 0,
    calories: 0 })

  const [calories, setCalories] = useState({
          pcalories: macros.protein * 4,
          ccalories: macros.carbs * 4,
          fcalories: macros.fat * 9
      })

  async function getData () {
    const client = await getSupabaseClient();
    const {data} = await supabase.from('client_nutrition').select().eq('user_id', client.id).limit(1)
    if (data) {
      let currentMacros = data[0]
      setMacros({
        calories: currentMacros.calories,
        protein: currentMacros.protein,
        carbs: currentMacros.carbs,
        fat: currentMacros.fats})
      setCalories({
        pcalories: currentMacros.protein * 4,
        ccalories: currentMacros.carbs * 4,
        fcalories: currentMacros.fats * 9
      })
      setData([
        { id: 1, value: calories.pcalories, macro: macros.protein , name: 'Protein', color: 'primary' },
        { id: 2, value: calories.fcalories, macro: macros.fat, name: 'Fat', color: 'info' },
        { id: 3, value: calories.ccalories, macro: macros.carbs, name: 'Carbs', color: 'warning' }
      ])
      setChanged(true)
    } else {
      console.log("no macros set for this client")
    }

  }

  useEffect(async () => {
    await getData();
  },[changed])

  const [data, setData] = useState([
    { id: 1, value: calories.pcalories, macro: macros.protein , name: 'Protein', color: 'primary' },
    { id: 2, value: calories.fcalories, macro: macros.fat, name: 'Fat', color: 'info' },
    { id: 3, value: calories.ccalories, macro: macros.carbs, name: 'Carbs', color: 'warning' }
  ]);

  const total = data.reduce((acc, val) => val.value + acc, 0);

  
  return (
    <div>
        <Row className="justify-content-between g-0">
          <Col xs={6} sm={7} xxl className="pe-2">
            <h6 className="mt-1">Macro Goals</h6>
            {data.map((item, index) => (
              <MacrosItem
                item={item}
                index={index}
                key={index}
                total={total}
              />
            ))}
          </Col>
          <Col xs="auto">
            <div className="ps-0">
              <BasicECharts
                echarts={echarts}
                options={getOptions(data, radius)}
                style={{ width: '6.625rem', height: '6.625rem' }}
              />
            </div>
          </Col>
        </Row>
      </div>
  );
};

MacrosItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }),
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

Macros.propTypes = {
  radius: PropTypes.array.isRequired
};

export default Macros;

