import { AnimatePresence, motion, wrap } from 'framer-motion'
import { ScrollShadow } from '@nextui-org/react'

import { Text } from '@shared/components'
import { variants } from '../NewBookUtils'
import { forms } from './forms'
import * as tv from '../NewBookTV'

interface INewBookAnimatedFormProps {
  form: number
  direction: number
  generateFormTitle: () => 'Sobre o livro' | 'Mídia' | 'Social' | 'Visão geral' | undefined
}

export function NewBookAnimatedForm({
  form,
  direction,
  generateFormTitle
}: INewBookAnimatedFormProps) {
  const title = generateFormTitle()

  const formIndex = wrap(0, forms.length, form)

  const content = <div className={tv.newBookAnimatedFormContentTV()}>{forms[formIndex]}</div>

  return (
    <ScrollShadow hideScrollBar className={tv.newBookAnimatedFormWrapperTV()}>
      <Text text={String(title)} size="lg" className={tv.newBookAnimatedFormTitleTV()} />
      <div className={tv.newBookAnimatedFormContentRootTV()}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={form}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            className={tv.newBookAnimatedFormContentWrapperTV()}
            children={content}
            exit="exit"
            transition={{
              x: { ease: direction > 0 ? 'circIn' : 'circInOut', stiffness: 3000, damping: 30 }
            }}
          />
        </AnimatePresence>
      </div>
    </ScrollShadow>
  )
}
