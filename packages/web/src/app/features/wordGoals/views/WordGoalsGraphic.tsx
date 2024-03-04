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
        // yFormatter={() => ['']}
      />
    </Graphics.root>
  )
}
