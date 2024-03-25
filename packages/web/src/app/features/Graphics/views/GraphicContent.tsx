'use client'

import { TApexchartsOptions, TRadialBarOptions, TTheme } from '@shared/types'
import Chart from 'react-apexcharts'

interface GraphicContentProps {
  categories: string[] | number[]
  type: 'area' | 'bar' | 'radialBar'
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
  theme: TTheme
  height?: number | string
  width?: number | string
  gradientToColors?: string[]
  RadialBarOptions?: TRadialBarOptions
  labels?: string[]
  colors?: string[]
  fill?: ApexFill
  responsive?: ApexResponsive[]
}

export function GraphicContent({
  categories,
  type,
  series,
  theme,
  height,
  width,
  RadialBarOptions,
  labels = [''],
  fill = {},
  colors,
  responsive = [],
}: GraphicContentProps) {
  const options: TApexchartsOptions = {
    responsive,
    series,
    labels,
    theme: {
      mode: theme || 'dark',
    },
    chart: {
      type,
      fontFamily: '"Poppins", sans-serif',
      background: 'transparent',
    },
    plotOptions: {
      radialBar: {
        ...RadialBarOptions,
        hollow: {
          margin: 0,
          size: '70%',
          background: 'transparent',
        },
      },
      bar: {
        borderRadiusApplication: 'around',
        distributed: true,
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
        borderRadiusWhenStacked: 'all',
        hideZeroBarsWhenGrouped: true,
        horizontal: false,
        columnWidth: 7,
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
      lineCap: 'round',
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '10px',
        },
      },
    },
    xaxis: {
      type: 'category',
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories,
    },
    fill,
    colors,
    noData: {
      text: 'Sem dados por aqui.',
    },
    grid: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: (val) => val.toFixed(0),
      },
    },
  }

  return (
    <Chart
      options={options}
      series={options?.series}
      type={type}
      height={height ?? 280}
      width={width ?? 280}
    />
  )
}
