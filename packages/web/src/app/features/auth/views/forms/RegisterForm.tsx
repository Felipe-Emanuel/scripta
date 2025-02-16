import { textLinkTV, formRootTV } from '@features/auth/AuthTV'
import { ProviderButtons } from '@features/auth/views/nextAuthProviders/ProviderButtons'
import { Button, Input, Motion, Text, Title } from '@shared/components'

interface TRegisterForm {
  changeAuthPageContent: VoidFunction
  strongPasswordMessage: string
}

let id = 0

export function RegisterForm({ changeAuthPageContent, strongPasswordMessage }: TRegisterForm) {
  const registerComponents = [
    {
      id: id++,
      component: <Title size="xl" title="Bem vindo!" align="center" />
    },
    {
      id: id++,
      component: <ProviderButtons />
    },
    {
      id: id++,
      component: (
        <Text
          text="Registre-se e use o dashboard do escritor gratuitamente!"
          align="center"
          color="gray"
        />
      )
    },
    {
      id: id++,
      component: (
        <Input.root>
          <Input.label text="Nome Completo" htmlFor="name" />
          <Input.field name="name" id="name" placeholder="Seu nome completo" />
          <Input.error field="name" />
        </Input.root>
      )
    },
    {
      id: id++,
      component: (
        <Input.root>
          <Input.label text="E-mail" htmlFor="email" />
          <Input.field name="email" id="email" placeholder="Seu melhor e-mail" />
          <Input.error field="email" />
        </Input.root>
      )
    },
    {
      id: id++,
      component: (
        <Input.root>
          <Input.label text="Senha" htmlFor="password" />
          <Input.field name="password" id="password" placeholder="Sua senha" />
          <Input.error field="password" />
          <Text text={strongPasswordMessage} size="sm" color="error" as="span" />
        </Input.root>
      )
    },
    {
      id: id++,
      component: (
        <Button.root buttonStyle="primary" type="submit">
          <Button.label text="Registrar" />
        </Button.root>
      )
    },
    {
      id: id++,
      component: <Text text="Já tem uma conta?" align="center" />
    },
    {
      id: id++,
      component: (
        <Text
          text="Entre"
          weight="bold"
          className={textLinkTV()}
          onClick={changeAuthPageContent}
          align="center"
        />
      )
    }
  ]

  return (
    <div className={formRootTV()}>
      <Motion components={registerComponents} />
    </div>
  )
}
