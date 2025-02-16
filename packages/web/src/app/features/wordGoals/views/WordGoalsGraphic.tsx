'use client'

import { Graphics } from '@features/Graphics'
import { useWordGoalsController } from '@features/wordGoals/controller'

export function WordGoalsGraphic() {
  const { series, isLoading } = useWordGoalsController()

  return (
    <Graphics.root>
      <Graphics.header text="Taxa de satisfação diária" />
      <Graphics.content
        type="radialBar"
        series={[+series || 0]}
        categories={['Meta']}
        theme="dark"
        labels={isLoading ? ['Buscando...'] : ['Progresso']}
        fill={{
          opacity: 1,
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            gradientToColors: ['#0075FF', '#7551FF'],
            stops: [0, 100]
          }
        }}
        RadialBarOptions={{
          startAngle: -115,
          endAngle: 115
        }}
      />
    </Graphics.root>
  )
}
