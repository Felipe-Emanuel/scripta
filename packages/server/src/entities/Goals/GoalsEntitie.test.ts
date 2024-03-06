import { GoalsEntitie } from 'src/entities/Goals/GoalsEntitie'
import { mockGoals } from 'src/entities/Goals/mocks/mockGoals'
import { throwGoalsMessages } from 'src/entities/Goals/utils'

describe('setGoal', () => {
  const { email } = mockGoals

  it('should throw a exception about email reference', () => {
    const { setGoal } = GoalsEntitie('unexpected email', [mockGoals])

    const sut = setGoal(mockGoals)

    expect(sut).rejects.toThrow(throwGoalsMessages.emailReference)
  })

  it('should throw a exception about wrong date', () => {
    const { setGoal } = GoalsEntitie(email, [mockGoals])

    const sut = setGoal({
      ...mockGoals,
      week: undefined,
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.wrongDate)
  })

  it('should throw a exception about goal complete missing', () => {
    const { setGoal } = GoalsEntitie(email, [mockGoals])

    const sut = setGoal({
      ...mockGoals,
      goalCompletePercent: undefined,
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.goalCompletePercent)
  })

  it('should set a goal', async () => {
    const { setGoal } = GoalsEntitie(email, [mockGoals])

    const sut = await setGoal(mockGoals)

    expect(sut.email).toEqual(email)
  })
})

describe('getGoals', () => {
  const { email } = mockGoals

  it('should throw a exception about missing email', () => {
    const { getGoals } = GoalsEntitie(email, [mockGoals])

    const sut = getGoals('', 'day')

    expect(sut).rejects.toThrow(throwGoalsMessages.missingEmail)
  })

  it('should throw a exception about goal not found', () => {
    const { getGoals } = GoalsEntitie(email, [mockGoals])

    const sut = getGoals('unexpectedemail', 'month')

    expect(sut).rejects.toThrow(throwGoalsMessages.goalNotFound)
  })

  it('should throw a exception about wrong filter', async () => {
    const { getGoals } = GoalsEntitie(email, [mockGoals])

    // @ts-expect-error: isto está testando a garantia de que um filtro é esperado
    const sut = getGoals(mockGoals.email, '')

    expect(sut).rejects.toThrow(throwGoalsMessages.wrongFilter)
  })

  it('should get a goal list', async () => {
    const { getGoals } = GoalsEntitie(email, [mockGoals])

    const sut = await getGoals(mockGoals.email, 'week')

    expect(sut[0].email).toEqual(email)
  })
})

describe('insertGoal', () => {
  const { email } = mockGoals

  it('should throw a exception about goal not found', () => {
    const { insertGoal } = GoalsEntitie(email, [mockGoals])

    const sut = insertGoal([mockGoals], {
      ...mockGoals,
      email: 'unexpectedemail',
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.goalNotFound)
  })

  it('should throw a exception about goal complete missing', () => {
    const { insertGoal } = GoalsEntitie(email, [mockGoals])

    const sut = insertGoal([mockGoals], {
      ...mockGoals,
      goalCompletePercent: undefined,
    })

    expect(sut).rejects.toThrow(throwGoalsMessages.goalCompletePercent)
  })

  it('should set a goal', async () => {
    const { insertGoal } = GoalsEntitie(email, [mockGoals])

    const sut = await insertGoal([mockGoals], mockGoals)

    expect(sut[1].email).toEqual(email)
  })
})
