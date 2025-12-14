<script module lang="ts">
  const placeholders = [
    "ishoneypot.ton",
    "foundation.ton",
    "gosunov.ton",
    "the-very-test-domain.ton",
  ]
</script>

<script lang="ts">
  import type { ListOptions } from "~/lib/api"
  import { onMount } from "svelte"
  import debounce from "~/lib/debounce"
  import Filters from "./Filters.svelte"
  import Sites from "./Sites.svelte"

  type Props = {
    pageCount: number
  }

  const { pageCount = 12 }: Props = $props()

  const filters = $state<ListOptions>({
    inaccessible: false,
    spam: false,
  })
  let placeholder = $state("")

  onMount(() => {
    placeholder = placeholders[Math.floor(Math.random() * placeholders.length)]
  })

  const setSearch = debounce((value: string) => {
    filters.search = value
  }, 300)
</script>

<div class=":uno: flex flex-col gap-2 w-full">
  <div class=":uno: mx-4 p-2 border-(1 border) rounded-md flex flex-1 gap-2 items-center">
    <span title="Search" class="i-carbon-search text-secondary"></span>
    <input
      class=":uno: outline-none flex-1 placeholder:text-secondary"
      placeholder={placeholder}
      oninput={e => setSearch(e.currentTarget.value)}
    />
  </div>
  <Filters
    bind:sort={filters.sort}
    bind:desc={filters.desc}
    bind:inaccessible={filters.inaccessible}
    bind:punycode={filters.punycode}
    bind:spam={filters.spam}
    bind:zone={filters.zone}
  />
  <Sites {...filters} pageCount={pageCount} />
</div>
