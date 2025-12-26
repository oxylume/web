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
  import Random from "../Random/Random.svelte"
  import Disclaimer from "./Disclaimer.svelte"
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
  let disclaimerAccepted = $state(true)

  const setSearch = debounce((value: string) => {
    filters.search = value
  }, 300)

  function onDisclaimerAccepted() {
    disclaimerAccepted = true
    localStorage.setItem("disclaimer", "true")
  }

  onMount(() => {
    placeholder = placeholders[Math.floor(Math.random() * placeholders.length)]

    const saved = localStorage.getItem("disclaimer")
    disclaimerAccepted = saved === "true"
  })
</script>

<div class=":uno: relative w-full flex flex-col gap-2">
  {#if !disclaimerAccepted}
    <Disclaimer onAccept={onDisclaimerAccepted} />
  {/if}
  <div class=":uno: mx-4 flex gap-2">
    <div class=":uno: flex flex-1 items-center gap-2 border-(1 border) rounded-md p-2">
      <span title="Search" class="i-carbon-search text-secondary"></span>
      <input
        class=":uno: flex-1 bg-transparent outline-none placeholder:text-secondary"
        placeholder={placeholder}
        oninput={e => setSearch(e.currentTarget.value)}
      />
    </div>
    <Random />
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
