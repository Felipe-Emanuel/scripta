import { AnimatePresence, motion, wrap } from 'framer-motion'
import { ScrollShadow } from '@nextui-org/react'
import { variants } from '../NewBookUtils'
import { Text } from '@shared/components'
import { NewBookAboutBookForm } from './forms/NewBookAboutBookForm'
import { NewBookMediaForm } from './forms/NewBookMediaForm'
import { NewBookSocialForm } from './forms/NewBookSocialForm'
import { NewBookOverviewForm } from './forms/NewBookOverviewForm'

interface INewBookAnimatedFormProps {
  form: number
  direction: number
  generateFormTitle: () => 'Sobre o livro' | 'Mídia' | 'Social' | 'Visão geral' | undefined
}

const forms = [
  <NewBookAboutBookForm />,
  <NewBookMediaForm />,
  <NewBookSocialForm />,
  <NewBookOverviewForm />
]

export function NewBookAnimatedForm({
  form,
  direction,
  generateFormTitle
}: INewBookAnimatedFormProps) {
  const title = generateFormTitle()

  const formIndex = wrap(0, forms.length, form)

  const content = (
    <div className="flex max-[499px]:flex-col items-center gap-6 px-8 w-full">
      {forms[formIndex]}
    </div>
  )

  return (
    <ScrollShadow
      hideScrollBar
      className="bg-primary-background flex flex-col gap-6 rounded-2xl md:p-6 h-80 overflow-y-scroll sm:overflow-y-hidden overflow-x-scroll"
    >
      <Text text={String(title)} size="lg" className="pt-4 pl-4" />
      <div className="flex items-center gap-6 w-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={form}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            className="w-full duration-500 flex flex-col gap-2 sm:gap-6 shrink-0"
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
