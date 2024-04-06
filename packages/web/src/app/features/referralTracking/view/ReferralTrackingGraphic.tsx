'use client'

import { Graphics } from '@features/Graphics'
import { referralTrackingGraphicTV } from '@features/referralTracking/ReferralTrackingTV'
import { useReferralTrackingController } from '@features/referralTracking/controller'

export function ReferralTrackingGraphic() {
  const { series } = useReferralTrackingController()

  return (
    <div className={referralTrackingGraphicTV()}>
      <Graphics.root>
        <Graphics.header />
        <Graphics.content
          type="radialBar"
          series={series}
          categories={['Meta']}
          labels={['Metas', 'Palavras']}
          theme="dark"
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
            dataLabels: {
              total: {
                label: 'TOTAL',
                show: true,
              },
            },
          }}
        />
      </Graphics.root>
    </div>
  )
}
