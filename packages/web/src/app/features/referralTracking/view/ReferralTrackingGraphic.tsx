'use client'

import { Graphics } from '@features/Graphics'
import { useReferralTrackingController } from '@features/referralTracking/controller'

export function ReferralTrackingGraphic() {
  const { series } = useReferralTrackingController()

  return (
    <div className="hidden sm:flex relative z-0 -right-12 -top-8">
      <Graphics.root>
        <Graphics.header />
        <Graphics.content
          type="radialBar"
          series={series}
          categories={['Meta']}
          theme="dark"
          gradientToColors={['#0075FF', '#7551FF']}
          labels={['Metas', 'Palavras']}
          RadialBarOptions={{
            dataLabels: {
              total: {
                label: 'TOTAL',
                show: true,
              },
            },
          }}
          // yFormatter={() => ['']}
        />
      </Graphics.root>
    </div>
  )
}
