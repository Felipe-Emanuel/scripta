import { Text, Title } from '@shared/components'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { TReaction, TCharacterResponse } from '@shared/types'
import * as tv from '../BookPerformanceTV'

type TUniquePerformance = {
  label: string | number | boolean | Date | TCharacterResponse[] | TReaction[]
  value: string
}

interface BookPerformanceFiltersProps {
  uniqueGenres: TUniquePerformance[]
  uniqueThemes: TUniquePerformance[]
  selectedGenre: string
  selectedTheme: string
  handleGenre: (key: string) => void
  handleTheme: (key: string) => void
}

export function BookPerformanceFilters({
  selectedGenre,
  selectedTheme,
  uniqueGenres,
  uniqueThemes,
  handleGenre,
  handleTheme
}: BookPerformanceFiltersProps) {
  return (
    <div className={tv.bookPerformanceFiltersRootTV()}>
      <div>
        <Title
          as="h2"
          title="Desempenho por Gênero/Tema"
          size="md"
          className={tv.bookPerformanceFiltersTitleTV()}
        />

        <div className={tv.bookPerformanceFiltersSelectedContentTV()}>
          {selectedGenre && (
            <Text
              data-testid={`selected-genre-${selectedGenre}`}
              as="span"
              text={selectedGenre}
              color="green-500"
              size="sm"
            />
          )}
          {selectedGenre && selectedTheme && (
            <>
              <Text as="span" text="/" color="green-500" size="sm" />
              <Text as="span" text={selectedTheme} color="gray" size="sm" />
            </>
          )}
        </div>
      </div>

      <div className={tv.bookPerformanceFiltersSelectedWrapperTV()}>
        <Autocomplete
          label="Gênero"
          className={tv.bookPerformanceFiltersAutocompleteTV()}
          defaultItems={uniqueGenres}
          variant="underlined"
          selectedKey={selectedGenre}
          onSelectionChange={(key) => handleGenre(key?.toString() ?? '')}
          onClear={() => handleGenre('')}
        >
          {(item) => (
            <AutocompleteItem
              textValue={item.value}
              data-testid={`item-${item.value}`}
              key={item.value}
            >
              {item.value}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          isDisabled={!selectedGenre}
          label="Tema"
          className={tv.bookPerformanceFiltersAutocompleteItemTV()}
          variant="underlined"
          selectedKey={selectedTheme}
          onSelectionChange={(key) => handleTheme(key?.toString() ?? '')}
          onClear={() => handleTheme('')}
        >
          {uniqueThemes.map((item) => (
            <AutocompleteItem textValue={item.value} key={item.value} value={item.value}>
              {item.value}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
    </div>
  )
}
