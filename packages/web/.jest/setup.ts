import '@testing-library/jest-dom'

import React from 'react'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  })),
  usePathname: jest.fn()
}))

jest.mock(
  '@tanstack/react-query',
  jest.fn(() => ({
    useQuery: jest.fn(() => ({
      data: {}
    })),
    useQueryClient: jest.fn(() => ({
      setQueryData: jest.fn()
    })),
    useMutation: jest.fn(() => ({
      mutateAsync: jest.fn()
    }))
  }))
)

jest.mock('framer-motion', () => ({
  __esModule: true,
  motion: {
    div: 'div',
    span: 'span'
  }
}))

export const onOpenMock = jest.fn()

jest.mock(
  'lottie-react',
  jest.fn(() => ({
    useLottie: jest.fn(() => ({
      View: ({ isOpen, children, ...props }: any) => {
        if (!isOpen) return null
        return React.createElement('span', ...props, children)
      }
    }))
  }))
)

jest.mock('react-pageflip', () => ({
  HTMLFlipBook: ({ children, ...props }: any) => {
    return React.createElement('div', ...props, children)
  }
}))

jest.mock('@heroui/react', () => ({
  Modal: ({ isOpen, children, ...props }: any) => {
    if (!isOpen) return null
    return React.createElement('div', { ...props, 'data-testid': 'modal' }, children)
  },
  ModalContent: ({ children, ...props }: any) => {
    return React.createElement('div', { ...props, 'data-testid': 'modal-content' }, children)
  },
  ModalHeader: ({ children, ...props }: any) => {
    return React.createElement('div', { ...props, 'data-testid': 'modal-header' }, children)
  },
  ModalBody: ({ children, ...props }: any) => {
    return React.createElement('div', { ...props, 'data-testid': 'modal-body' }, children)
  },
  ModalFooter: ({ children, ...props }: any) => {
    return React.createElement('div', { ...props, 'data-testid': 'modal-footer' }, children)
  },
  Button: ({ children, ...props }: any) => {
    return React.createElement('button', props, children)
  },
  Autocomplete: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  AutocompleteItem: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  Tabs: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  Tab: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  Textarea: ({ children, ...props }: any) => {
    return React.createElement('textarea', props, children)
  },
  Select: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  SelectItem: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  Image: ({ children, ...props }: any) => {
    return React.createElement('img', props, children)
  },
  Chip: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  Card: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  CardHeader: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  CardFooter: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  Switch: ({ children, ...props }: any) => {
    return React.createElement('input', props, children)
  },
  Dropdown: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  DropdownTrigger: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  DropdownMenu: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  DropdownItem: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  DropdownSection: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  ScrollShadow: ({ children, ...props }: any) => {
    return React.createElement('div', props, children)
  },
  Tooltip: ({ children, ...props }: any) => {
    return React.createElement('div', { ...props, 'data-testid': 'tooltip' }, children)
  },
  SwitchProps: {},
  TextAreaProps: {},
  useDisclosure: () => ({
    isOpen: false,
    onOpen: onOpenMock,
    onOpenChange: jest.fn()
  })
}))
