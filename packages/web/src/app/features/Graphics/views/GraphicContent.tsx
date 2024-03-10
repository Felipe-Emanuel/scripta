'use client'

// import { responsive } from '@features/Graphics/GraphicsUtils'
import { TApexchartsOptions, TRadialBarOptions, TTheme } from '@shared/types'
import Chart from 'react-apexcharts'

interface GraphicContentProps {
  // yFormatter: ApexTooltipY
  categories: string[] | number[]
  type: 'area' | 'bar' | 'radialBar'
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
  theme: TTheme
  labels?: string[]
  gradientToColors?: string[]
  RadialBarOptions?: TRadialBarOptions
}

export function GraphicContent({
  // yFormatter,
  categories,
  type,
  series,
  theme,
  labels,
  RadialBarOptions,
  gradientToColors,
}: GraphicContentProps) {
  const options: TApexchartsOptions = {
    series,
    theme: {
      mode: theme || 'dark',
    },
    // tooltip: {
    //   y: yFormatter,
    // },
    // responsive,
    chart: {
      height: 280,
      width: 280,
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
        horizontal: false,
        columnWidth: 7,
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      fontSize: '10px',
      markers: {
        radius: 32,
        width: 12,
        height: 12,
      },
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
        style: {
          fontSize: '10px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories,
    },

    fill: {
      opacity: 1,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        gradientToColors,
        stops: [0, 100],
      },
    },
    noData: {
      text: 'Sem dados por aqui.',
    },
    grid: {
      show: false,
    },
    labels,
  }

  return (
    <Chart
      options={options}
      series={options?.series}
      type={type}
      height={280}
      width={280}
    />
  )
}
