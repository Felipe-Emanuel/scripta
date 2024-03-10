'use client'

import { useReferralTrackingController } from '@features/referralTracking/controller'
import { Text } from '@shared/components'

export function ReferralTrackingInfo() {
  const { wordsWritten, goalsComplete } = useReferralTrackingController()

  const InfoTeamplate = (title: string, qtd: number) => (
    <div className="bg-primary-background rounded-2xl flex flex-col justify-center items-start px-4 md:px-8 w-full max-w-44 h-20">
      <Text text={title} weight="normal" color="gray" size="sm" />
      <Text text={qtd} weight="normal" color="white" size="lg" />
    </div>
  )

  return (
    <div className="flex flex-col gap-10 w-full justify-between">
      {InfoTeamplate('Metas concluídas', goalsComplete?.length)}
      {InfoTeamplate('Palavras Escritas', wordsWritten)}
    </div>
  )
}
