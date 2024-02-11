import { formRootTV, textLinkTV } from '@features/auth/AuthTV'
import { Button, Input, Motion, Text, Title } from '@shared/components'

interface AuthFormProps {
  changeAuthPageContent: () => void
}

export function AuthForm({ changeAuthPageContent }: AuthFormProps) {
  const authComponents = [
    {
      id: 0,
      component: <Title size="xl" title="Bem vindo!" align="center" />,
    },
    {
      id: 1,
      component: (
        <Text
          size="md"
          text="Digite seu e-mail e senha para começar!"
          align="center"
        />
      ),
    },
    {
      id: 2,
      component: (
        <Input.root>
          <Input.label text="E-mail" />
          <Input.field
            name="email"
            id="email"
            placeholder="Seu endereço de E-mail"
          />
          <Input.error field="email" />
        </Input.root>
      ),
    },
    {
      id: 3,
      component: (
        <Input.root>
          <Input.label text="Senha" />
          <Input.field name="password" id="password" placeholder="Sua senha" />
          <Input.error field="password" />
        </Input.root>
      ),
    },
    {
      id: 4,
      component: (
        <Button.root>
          <Button.label label="Entrar" />
        </Button.root>
      ),
    },
    {
      id: 5,
      component: <Text text="Não tem uma conta?" align="center" />,
    },
    {
      id: 6,
      component: (
        <Text
          text="Registre-se"
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
      <Motion components={authComponents} />
    </div>
  )
}
