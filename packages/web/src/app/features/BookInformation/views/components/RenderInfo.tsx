import Link from 'next/link'
import { ElementType, SetStateAction, memo } from 'react'

import { Tooltip } from '@nextui-org/react'

import { Icon, Template, Text } from '@shared/components'
import { capitalizeName } from '@shared/utils/transformers'
import { formatNumber } from '@shared/utils/validation'
import * as tv from '@features/BookInformation/BookInformationTV'

type TRenderInfo = {
  icon: ElementType
  label: string
  qtd: number
  path?: string
  animation?: string
  setIsCharactersCardHovered?: (value: SetStateAction<boolean>) => void
  clearing?: () => void
}

const RenderInfo = ({
  icon,
  label,
  qtd,
  path,
  animation,
  setIsCharactersCardHovered,
  clearing
}: TRenderInfo) => {
  const content = (
    <Template flex-direction="row" className={tv.renderInfoTV()}>
      <div className={tv.renderInfoLabelsTV()}>
        <Text text={capitalizeName(label)} size="xs" color="gray" />
        <Text text={`${formatNumber(qtd ?? 0)}`} as="small" size="lg" />
      </div>
      <Tooltip showArrow content={`${formatNumber(qtd ?? 0)} ${capitalizeName(label)}`}>
        <div className={tv.renderInfoIconWeapperTV()}>
          <Icon className={animation} icon={icon} color="white" size="md" />
        </div>
      </Tooltip>
    </Template>
  )

  return (
    <>
      {path ? (
        <Link
          data-testid="render-info-link"
          onClick={clearing}
          onMouseEnter={() => setIsCharactersCardHovered?.(true)}
          onMouseLeave={() => setIsCharactersCardHovered?.(false)}
          href={path}
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </>
  )
}

export default memo(RenderInfo)
