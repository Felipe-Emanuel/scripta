import { textLinkTV, formRootTV } from '@features/auth/AuthTV'
import { Button, Input, Motion, Text, Title } from '@shared/components'

interface TRegisterForm {
  changeAuthPageContent: () => void
  strongPasswordMessage: string
}

export function RegisterForm({
  changeAuthPageContent,
  strongPasswordMessage,
}: TRegisterForm) {
  const registerComponents = [
    {
      id: 0,
      component: <Title size="xl" title="Bem vindo!" align="center" />,
    },
    {
      id: 1,
      component: (
        <Text
          text="Registre-se e use o dashboard do escritor gratuitamente!"
          align="center"
        />
      ),
    },
    {
      id: 2,
      component: (
        <Input.root>
          <Input.label text="Nome Completo" />
          <Input.field name="name" id="name" placeholder="Seu nome completo" />
          <Input.error field="name" />
        </Input.root>
      ),
    },
    {
      id: 3,
      component: (
        <Input.root>
          <Input.label text="E-mail" />
          <Input.field
            name="email"
            id="email"
            placeholder="Seu melhor e-mail"
          />
          <Input.error field="email" />
        </Input.root>
      ),
    },
    {
      id: 4,
      component: (
        <Input.root>
          <Input.label text="Senha" />
          <Input.field name="password" id="password" placeholder="Sua senha" />
          <Input.error field="password" />
          <Text
            text={strongPasswordMessage}
            size="sm"
            color="error"
            as="span"
          />
        </Input.root>
      ),
    },
    {
      id: 5,
      component: (
        <Button.root>
          <Button.label label="Registrar" />
        </Button.root>
      ),
    },
    {
      id: 6,
      component: <Text text="Já tem uma conta?" align="center" />,
    },
    {
      id: 7,
      component: (
        <Text
          text="Entre"
          weight="bold"
          className={textLinkTV()}
          onClick={changeAuthPageContent}
          align="center"
        />
      ),
    },
  ]

  return (
    <div className={formRootTV()}>
      <Motion components={registerComponents} />
    </div>
  )
}
