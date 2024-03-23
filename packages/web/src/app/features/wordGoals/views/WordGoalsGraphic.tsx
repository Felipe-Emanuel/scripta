'use client'

import { Graphics } from '@features/Graphics'
import { useWordGoalsController } from '@features/wordGoals/controller'

export function WordGoalsGraphic() {
  const { series, isLoading } = useWordGoalsController()

  if (isLoading) return null

  return (
    <Graphics.root>
      <Graphics.header text="Taxa de satisfração" />
      <Graphics.content
        type="radialBar"
        series={[+series]}
        categories={['Meta']}
        theme="dark"
        labels={['Progresso']}
        fill={{
          opacity: 1,
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            gradientToColors: ['#0075FF', '#7551FF'],
            stops: [0, 100],
          },
        }}
        RadialBarOptions={{
          startAngle: -115,
          endAngle: 115,
        }}
      />
    </Graphics.root>
  )
}
