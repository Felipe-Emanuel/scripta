import { WordGoals } from '@features/wordGoals'

export function DashboardWordGoals() {
  return (
    <WordGoals.root>
      <WordGoals.wrapper>
        <WordGoals.graphic />
        <WordGoals.info />
      </WordGoals.wrapper>
    </WordGoals.root>
  )
}
