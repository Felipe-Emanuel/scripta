import { Text, Title } from '@shared/components'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import {
  Reaction,
  TBookPerformanceProperty,
  TCharacterResponse,
} from '@shared/types'

type TUniquePerformance = {
  label: string | number | boolean | Date | TCharacterResponse[] | Reaction[]
  value: string
}

interface BookPerformanceFiltersProps {
  uniqueGenres: TUniquePerformance[]
  uniqueThemes: TUniquePerformance[]
  selectedGenre: string
  selectedTheme: string
  handleGenre: (key: string, value: TBookPerformanceProperty) => void
  handleTheme: (key: string, value: TBookPerformanceProperty) => void
}

export function BookPerformanceFilters({
  selectedGenre,
  selectedTheme,
  uniqueGenres,
  uniqueThemes,
  handleGenre,
  handleTheme,
}: BookPerformanceFiltersProps) {
  return (
    <div className="w-full flex items-center justify-between">
      <div>
        <Title
          as="h2"
          title="Desempenho por Gênero/Tema"
          size="md"
          className="w-full truncate"
        />

        <div className="flex gap-2 items-center pt-2">
          {selectedGenre && (
            <Text as="span" text={selectedGenre} color="green-500" size="sm" />
          )}
          {selectedGenre && selectedTheme && (
            <>
              <Text as="span" text="/" color="green-500" size="sm" />
              <Text as="span" text={selectedTheme} color="gray" size="sm" />
            </>
          )}
        </div>
      </div>

      <div className="flex w-fit flex-wrap md:flex-nowrap gap-4">
        <Autocomplete
          label="Gênero"
          className="w-full max-w-40 text-gray"
          defaultItems={uniqueGenres}
          variant="underlined"
          selectedKey={selectedGenre}
          onSelectionChange={(key) =>
            handleGenre(key?.toString() ?? '', 'title')
          }
          onClear={() => handleGenre('', 'Gender')}
        >
          {(item) => (
            <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          isDisabled={!selectedGenre}
          label="Tema"
          className="w-full max-w-40"
          variant="underlined"
          selectedKey={selectedTheme}
          onSelectionChange={(key) =>
            handleTheme(key?.toString() ?? '', 'title')
          }
          onClear={() => handleTheme('', 'Gender')}
        >
          {uniqueThemes.map((item) => (
            <AutocompleteItem key={item.value} value={item.value}>
              {item.value}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
    </div>
  )
}
