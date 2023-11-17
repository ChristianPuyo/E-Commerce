import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './ChartLineAdmin.module.css'

const ChartLineAdmin = ({ labels, data1, data2, name1, name2, mostrarGrafica1 }) => {
  const series = mostrarGrafica1
    ? [
        {
          name: name1,
          data: data1,
          color: 'blue',
          points: {
            show: true,
            radius: 5,
            fillColor: '#582f0e',
          },
        },
      ]
    : [
        {
          name: name2,
          data: data2,
          color: 'red',
          points: {
            show: true,
            radius: 5,
            fillColor: '#582f0e',
          },
        },
      ];

  const options = {
    chart: {
      type: 'area',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontWeight: 'bold',
        },
      },
      lines: {
        show: true, // Mostrar la línea del eje Y
      },
    },
    xaxis: {
      type: 'category',
      categories: labels,
      labels: {
        style: {
          fontWeight: 'bold',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 1, // Tamaño de los marcadores (puntos en la línea)
    },
  };

  return (
    <div style={{ border: '1px solid #000', padding: '4%', backgroundColor: 'white', margin: '2%', width: '100%' }}>
      <ReactApexChart options={options} series={series} type="area" height="300" />
    </div>
  );
};

export default ChartLineAdmin;