'use client'

import { Button, Icon, Text, Title } from '@shared/components'
import { Popover } from '@shared/components/Popover'
import { useReferralTrackingController } from '@features/referralTracking/controller'
import { capitalizeName } from '@shared/utils/transformers'
import * as tv from '@features/referralTracking/ReferralTrackingTV'

export function ReferralTrackingHeader() {
  const { handleChangeGoalFilter, options, currentFilterMethod } =
    useReferralTrackingController()

  const renderoptions = options.map((option) => {
    const { id, slug, label, options, icon } = option

    const disabled = currentFilterMethod === label

    return (
      <Button.root
        className={tv.renderOptionsRootTV({ disabled })}
        disabled={currentFilterMethod === label}
        key={id}
        as="div"
        onClick={() => handleChangeGoalFilter(options)}
      >
        <div className={tv.renderOptionsContentTV()}>
          <Text text={capitalizeName(label)} color="white" weight="bold" />
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
      </Button.root>
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
        <Text text="Busque por..." color="white" weight="bold" />
        {renderoptions}
      </Popover>
    </div>
  )
}
