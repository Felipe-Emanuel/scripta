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
        gradientToColors={['#0075FF']}
        RadialBarOptions={{
          startAngle: -115,
          endAngle: 115,
        }}
      />
    </Graphics.root>
  )
}
