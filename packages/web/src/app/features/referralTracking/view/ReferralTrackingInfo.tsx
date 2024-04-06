'use client'

import * as tv from '@features/referralTracking/ReferralTrackingTV'
import { useReferralTrackingController } from '@features/referralTracking/controller'
import { Text } from '@shared/components'

export function ReferralTrackingInfo() {
  const { wordsWritten, goalsComplete } = useReferralTrackingController()

  const InfoTeamplate = (title: string, qtd: number) => (
    <div className={tv.referralTrackingInfoInfoTemplateTV()}>
      <Text text={title} weight="normal" color="gray" size="sm" />
      <Text text={qtd} weight="normal" color="white" size="lg" />
    </div>
  )

  return (
    <div className={tv.referralTrackingInfoWrapperTV()}>
      {InfoTeamplate('Metas concluídas', goalsComplete)}
      {InfoTeamplate('Palavras Escritas', wordsWritten)}
    </div>
  )
}
