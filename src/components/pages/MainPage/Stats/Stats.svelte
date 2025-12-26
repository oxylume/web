<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query"
  import { abbreviateNumber } from "~/lib/abbrev"
  import { fetchSiteStats } from "~/lib/api"
  import queryClient from "~/lib/queryClient"

  const stats = createQuery(() => ({
    queryKey: ["siteStats"],
    queryFn: () => fetchSiteStats(),
  }), () => queryClient)
</script>

{#snippet stat(label: string, value?: number)}
  <div>
    <div class=":uno: text-4xl/12 sm:text-5xl/16" title={value?.toString() ?? "0"}>
      {abbreviateNumber(value ?? 0)}
    </div>
    <div>{label}</div>
  </div>
{/snippet}

<div class=":uno: mx-4 flex justify-evenly gap-2 border-(1 border) rounded-lg py-2 text-center">
  {@render stat("Total domains", stats.data?.domains)}
  {@render stat("Total sites", stats.data?.sites)}
  {@render stat("Active sites", stats.data?.active)}
</div>
