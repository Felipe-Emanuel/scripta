import { formRootTV, textLinkTV } from '@features/auth/AuthTV'
import { ProviderButtons } from '@features/auth/views/nextAuthProviders/ProviderButtons'
import { Button, Input, Motion, Text, Title } from '@shared/components'
import { TArrayComponents } from '@shared/types'
interface AuthFormProps {
  changeAuthPageContent: () => void
}

let id = 0

export function AuthForm({ changeAuthPageContent }: AuthFormProps) {
  const authComponents: TArrayComponents[] = [
    {
      id: id++,
      component: <Title size="xl" title="Bem vindo!" align="center" />,
    },
    {
      id: id++,
      component: (
        <Text
          size="md"
          text="Entre com"
          color="gray"
          className="pt-4"
          align="center"
        />
      ),
    },
    {
      id: id++,
      component: <ProviderButtons />,
    },
    {
      id: id++,
      component: (
        <Text
          size="md"
          color="gray"
          text="Digite seu e-mail e senha para começar!"
          align="center"
        />
      ),
    },
    {
      id: id++,
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
      id: id++,
      component: (
        <Input.root>
          <Input.label text="Senha" />
          <Input.field name="password" id="password" placeholder="Sua senha" />
          <Input.error field="password" />
        </Input.root>
      ),
    },
    {
      id: id++,
      component: (
        <Button.root>
          <Button.label label="Entrar" />
        </Button.root>
      ),
    },
    {
      id: id++,
      component: <Text text="Não tem uma conta?" align="center" />,
    },
    {
      id: id++,
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
