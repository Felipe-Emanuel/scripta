import { tv } from 'tailwind-variants'

export const feedbackAboutTV = tv({
  base: 'flex flex-col items-center justify-center gap-2 overflow-hidden'
})

export const feedbackAboutIconContentTV = tv({
  base: 'z-10 bg-white p-2 rounded-xl w-fit'
})

export const feedbackActionTV = tv({
  base: 'flex flex-col pt-2 gap-2'
})

export const feedbackSelectTypeContentWrapperTV = tv({
  base: 'flex flex-row items-center size-full gap-2'
})

export const feedbackSelectTypeIconTV = tv({
  base: 'bg-white p-2 rounded-xl size-fit'
})

export const feedbackSelectFileWrapperTV = tv({
  base: 'absolute flex items-center justify-center bottom-0 right-0 z-10 size-10 cursor-pointer overflow-hidden'
})

export const feedbackFileInputTV = tv({
  base: 'size-full opacity-0'
})

export const feedbackSubmitButtonTV = tv({
  base: 'disabled:bg-gray-400 text-sm'
})

export const feedbackCloseButtonTV = tv({
  base: 'absolute top-2 right-2'
})

export const feedbackScreenshotTV = tv({
  base: 'mt-2 relative size-16 rounded-xl overflow-hidden z-10'
})

export const feedbackScreenshotThumbWrapperTV = tv({
  base: 'relative size-full'
})

export const feedbackScreenshotClearButtonTV = tv({
  base: 'flex items-center justify-center absolute -top-2 -right-2 z-20'
})

export const feedbackScreenshotThumbTV = tv({
  base: 'bg-cover cursor-pointer hover:brightness-95 hover:scale-95 duration-300 z-10'
})

export const feedbackScreenshotModalThumbTV = tv({
  base: 'bg-cover rounded-xl'
})

export const feedbackModalHeaderTV = tv({
  base: 'flex flex-col gap-1'
})

export const feedbackRootTV = tv({
  base: 'fixed bottom-4 left-4 rounded-2xl duration-500 overflow-hidden px-2 w-full h-full',
  variants: {
    withImage: {
      true: 'max-h-[26rem]',
      false: 'max-h-[21rem]'
    },
    isFeedbackOnFocus: {
      true: 'cursor-default max-w-52 py-4',
      false: 'cursor-pointer max-w-16 max-h-[3.5rem] py-2'
    },
    isDragActive: {
      true: 'scale-95',
      false: 'scale-100'
    }
  },
  defaultVariants: {
    isDragActive: false,
    isFeedbackOnFocus: false,
    withImage: false
  }
})

export const feedbackBackgroundTV = tv({
  base: 'absolute duration-500 pointer-events-none'
})
