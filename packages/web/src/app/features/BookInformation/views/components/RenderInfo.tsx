import Link from 'next/link'
import { ElementType, SetStateAction, memo } from 'react'

import { Tooltip } from '@nextui-org/react'

import { Icon, Template, Text } from '@shared/components'
import { formatNumber } from '@shared/utils/validation'

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
    <Template
      flex-direction="row"
      className="flex items-center justify-between p-0 md:p-0 lg:p-4 lg:w-40"
    >
      <div className="hidden lg:flex flex-col">
        <Text text={label} size="xs" color="gray" />
        <Text text={`${formatNumber(qtd ?? 0)}`} as="small" size="lg" />
      </div>
      <Tooltip showArrow content={`${formatNumber(qtd ?? 0)} ${label}`}>
        <div className="rounded-lg bg-primary p-2 flex items-center justify-center">
          <Icon className={animation} icon={icon} color="white" size="md" />
        </div>
      </Tooltip>
    </Template>
  )

  return (
    <>
      {path ? (
        <Link
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
