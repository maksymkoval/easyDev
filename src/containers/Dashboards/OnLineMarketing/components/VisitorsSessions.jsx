import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Progress, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import {
  PieChart, Pie, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Panel from '@/shared/components/Panel';
import getTooltipStyles from '@/shared/helpers';
import store from '../../../App/store';

const style = {
  left: 0,
  width: 150,
  lineHeight: '24px',
  position: 'relative',
};

const renderLegend = ({ payload }) => (
  <ul className="dashboard__chart-legend">
    {payload.map(entry => (
      <li key={entry.id}><span style={{ backgroundColor: entry.color }} />{entry.value}</li>
    ))}
  </ul>
);

renderLegend.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

const VisitorsSessions = ({ dir, themeName }) => {
  const products = store.getState().newOrder.items;
  const quantity = products.map(item => item.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue); 
    const sold = products.map(item => item.sold)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  const { t } = useTranslation('common');
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    if (e.tooltipPosition) {
      setCoordinates({ x: dir === 'ltr' ? e.tooltipPosition.x : e.tooltipPosition.x / 10, y: e.tooltipPosition.y });
    }
  };
  const colors = ['#4ce1b6', '#70bbfd', '#f6da6e', 'grey', '#ff4861'];

  const dataAvailable = products.map(item => ({
    id: item.id,
    name: item.title,
    value: item.quantity,
    fill: colors[item.id],
  }));
  
  const dataSold = products.map(item => ({
    id: item.id,
    name: item.title,
    value: item.sold,
    fill: colors[item.id],
  }));
  return (
    <>
      <Panel
        lg={6}
        xl={4}
        md={12}
        title="Sneakers"
        subhead="Available"
      >
        <div className="dashboard__visitors-chart">
          <p className="dashboard__visitors-chart-title">Total quantity of products <b>available</b></p>
          <p className="dashboard__visitors-chart-number">{quantity}</p>
          <ResponsiveContainer className="dashboard__chart-pie" width="100%" height={220}>
            <PieChart className="dashboard__chart-pie-container">
              <Tooltip position={coordinates} {...getTooltipStyles(themeName)} />
              <Pie
                data={dataAvailable}
                dataKey="value"
                cy={110}
                innerRadius={70}
                outerRadius={100}
                onMouseMove={onMouseMove}
              />
              <Legend layout="vertical" verticalAlign="bottom" wrapperStyle={style} content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Panel>
      <Panel
        lg={6}
        xl={4}
        md={12}
        title="Sneakers"
        subhead="What browsers are most popular"
      >
        <div className="dashboard__visitors-chart">
          <p className="dashboard__visitors-chart-title">Total quantity of products <b>SOLD</b></p>
          <p className="dashboard__visitors-chart-number">{sold}</p>
          <ResponsiveContainer className="dashboard__chart-pie" width="100%" height={220}>
            <PieChart className="dashboard__chart-pie-container">
              <Tooltip position={coordinates} {...getTooltipStyles(themeName)} />
              <Pie
                data={dataSold}
                dataKey="value"
                cy={110}
                innerRadius={70}
                outerRadius={100}
                onMouseMove={onMouseMove}
              />
              <Legend layout="vertical" verticalAlign="bottom" wrapperStyle={style} content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </>
  );
};

VisitorsSessions.propTypes = {
  dir: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
};

export default connect(state => ({ themeName: state.theme.className }))(VisitorsSessions);
