import { GoalsEntitie } from 'src/entities/Goals'
import { mockGoal } from 'src/entities/Goals/mocks/'
import { throwGoalsMessages } from 'src/entities/Goals/utils'

describe('setGoal', () => {
  const { email } = mockGoal

  it('should throw a exception about email reference', () => {
    const { setGoal } = GoalsEntitie('unexpected email', [mockGoal])

    const sut = setGoal(mockGoal)

    expect(sut).rejects.toThrow(throwGoalsMessages.emailReference)
  })

  it('should throw a exception about goal complete missing', () => {
    const { setGoal } = GoalsEntitie(email, [mockGoal])

    const sut = setGoal({
      ...mockGoal,
      goalCompletePercent: undefined,
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.goalCompletePercent)
  })

  it('should set a goal', async () => {
    const { setGoal } = GoalsEntitie(email, [mockGoal])

    const sut = await setGoal(mockGoal)

    expect(sut.email).toEqual(email)
  })
})

describe('getGoals', () => {
  const { email } = mockGoal

  it('should throw a exception about missing email', () => {
    const { getGoals } = GoalsEntitie(email, [mockGoal])

    const sut = getGoals('', mockGoal.createdAt, mockGoal.createdAt)

    expect(sut).rejects.toThrow(throwGoalsMessages.missingEmail)
  })

  it('should throw a exception about goal not found', () => {
    const { getGoals } = GoalsEntitie(email, [mockGoal])

    const sut = getGoals(
      'unexpectedemail',
      mockGoal.createdAt,
      mockGoal.createdAt,
    )

    expect(sut).rejects.toThrow(throwGoalsMessages.goalNotFound)
  })

  it('should throw a exception about wrong filter', async () => {
    const { getGoals } = GoalsEntitie(email, [mockGoal])

    // @ts-expect-error: isto está testando a garantia de que um filtro é esperado
    const sut = getGoals(mockGoal.email, 'unexpectedFilterMethod')

    expect(sut).rejects.toThrow(throwGoalsMessages.wrongFilter)
  })

  it('should get a goal list', async () => {
    const { getGoals } = GoalsEntitie(email, [mockGoal])

    const sut = await getGoals(
      mockGoal.email,
      mockGoal.createdAt,
      mockGoal.createdAt,
    )

    expect(sut[0].email).toEqual(email)
  })
})

describe('insertGoal', () => {
  const { email } = mockGoal

  it('should throw a exception about goal not found', () => {
    const { insertGoal } = GoalsEntitie(email, [mockGoal])

    const sut = insertGoal([mockGoal], {
      ...mockGoal,
      email: 'unexpectedemail',
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.goalNotFound)
  })

  it('should throw a exception about goal complete missing', () => {
    const { insertGoal } = GoalsEntitie(email, [mockGoal])

    const sut = insertGoal([mockGoal], {
      ...mockGoal,
      goalCompletePercent: undefined,
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.goalCompletePercent)
  })

  it('should set a goal', async () => {
    const { insertGoal } = GoalsEntitie(email, [mockGoal])

    const sut = await insertGoal([mockGoal], mockGoal)

    expect(sut[1].email).toEqual(email)
  })
})

describe('updateGoal', () => {
  const { email } = mockGoal

  it('should throw a exception about goal not found', () => {
    const { updateGoal } = GoalsEntitie(email, [mockGoal])

    const sut = updateGoal('unexpectedId', mockGoal)

    expect(sut).rejects.toThrow(throwGoalsMessages.goalNotFound)
  })

  it('should set a goal', async () => {
    const { updateGoal } = GoalsEntitie(email, [mockGoal])

    const sut = await updateGoal(mockGoal.id, mockGoal)

    expect(sut.email).toEqual(email)
  })
})
