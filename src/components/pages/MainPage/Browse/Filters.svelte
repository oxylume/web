<script lang="ts" module>
  type SortOption = {
    value: `${SortField}` | `${SortField}_desc`
    label: string
  }

  const sorts: SortOption[] = [
    { value: "domain", label: "Alphabetical (A-Z)" },
    { value: "domain_desc", label: "Alphabetical (Z-A)" },
    { value: "checked_at_desc", label: "Recent" },
  ]
</script>

<script lang="ts">
  import type { FilterOptions, SortField } from "~/lib/api"
  import { Label } from "bits-ui"
  import Checkbox from "~/components/ui/checkbox/Checkbox.svelte"
  import SingleSelect from "~/components/ui/select/SingleSelect.svelte"
  import Filter from "./Filter.svelte"

  type Props = FilterOptions

  let {
    inaccessible = $bindable(false),
    punycode = $bindable(),
    spam = $bindable(false),
    zone = $bindable(),
    sort = $bindable(),
    desc = $bindable(),
  }: Props = $props()

  function onPunycodeSelected(value: string) {
    punycode = value ? value === "y" : undefined
  }

  function setSort(value: string | null) {
    if (!value) {
      sort = undefined
      desc = false
      return
    }
    if (value.endsWith("_desc")) {
      sort = value.slice(0, -5) as SortField
      desc = true
    }
    else {
      sort = value as SortField
      desc = false
    }
  }
</script>

<div class=":uno: text-sm px-4 flex gap-1 whitespace-nowrap overflow-x-auto no-scrollbar">
  <Filter>
    <Label.Root for="sort">Sort by</Label.Root>
    <SingleSelect
      id="sort"
      class=":uno: text-primary"
      value="domain"
      onValueChange={setSort}
      items={sorts}
    />
  </Filter>
  <Filter>
    <Label.Root for="zone">Zone</Label.Root>
    <SingleSelect
      id="zone"
      class=":uno: text-primary"
      items={[
        { value: "", label: "Any" },
        { value: ".ton", label: ".ton" },
        { value: ".t.me", label: ".t.me" },
      ]}
      bind:value={zone as string | undefined}
    />
  </Filter>
  <Filter>
    <Label.Root for="inaccessible">Show inaccessible?</Label.Root>
    <Checkbox id="inaccessible" bind:checked={inaccessible} />
  </Filter>
  <Filter>
    <Label.Root for="punycode">Show punycode?</Label.Root>
    <SingleSelect
      id="punycode"
      class=":uno: text-primary"
      items={[
        { value: "", label: "Any" },
        { value: "y", label: "Yes" },
        { value: "n", label: "No" },
      ]}
      onValueChange={onPunycodeSelected}
    />
  </Filter>
  <Filter>
    <Label.Root for="spam">Spam filter</Label.Root>
    <Checkbox id="spam" bind:checked={() => !spam, v => spam = !v} />
  </Filter>
</div>
