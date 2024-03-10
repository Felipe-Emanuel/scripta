'use client'

import { Icon, Text, Title } from '@shared/components'
import { Popover } from '@shared/components/Popover'
import { TReferralTrackingHeaderOptions } from '@shared/types'
import * as tv from '@features/referralTracking/ReferralTrackingTV'
import { useReferralTrackingController } from '@features/referralTracking/controller'
import { capitalizeName } from '@shared/utils/transformers'

export function ReferralTrackingHeader() {
  const { choiseFilters, options, currentFilterMethod } =
    useReferralTrackingController()

  const handleChangeGoalFilter = (
    options: TReferralTrackingHeaderOptions['options'],
  ) => {
    choiseFilters(options)
  }

  const renderoptions = options.map((option) => {
    const { id, slug, label, options, icon } = option

    return (
      <div
        className={tv.renderOptionsTV()}
        key={id}
        onClick={() => handleChangeGoalFilter(options)}
      >
        <div className={tv.renderOptionsContentTV()}>
          <Text text={label} color="white" weight="bold" />
          <Text
            text={slug}
            color="gray"
            weight="light"
            size="xs"
            className="w-36"
          />
        </div>

        <div className={tv.renderOptionsIconTV()}>
          <Icon icon={icon} color="primary" size="lg" />
        </div>
      </div>
    )
  })

  return (
    <div className={tv.referralTrackingHeaderRootTV()}>
      <div>
        <Title
          as="h2"
          title="Acompanhamento de referência"
          size="md"
          weight="bold"
        />
        <Text
          text={capitalizeName(currentFilterMethod)}
          size="xs"
          color="gray"
          weight="light"
        />
      </div>

      <Popover>
        <Text text="Busque por..." color="black" weight="bold" />
        {renderoptions}
      </Popover>
    </div>
  )
}
