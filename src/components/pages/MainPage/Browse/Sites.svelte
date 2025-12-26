<script lang="ts">
  import type { ListOptions } from "~/lib/api"
  import { createInfiniteQuery } from "@tanstack/svelte-query"
  import { fetchLatestSites } from "~/lib/api"
  import queryClient from "~/lib/queryClient"
  import Site from "./Site.svelte"

  type Props = ListOptions & {
    pageCount: number
  }

  const {
    pageCount,
    ...filters
  }: Props = $props()

  const query = createInfiniteQuery(() => ({
    queryKey: ["sites", filters, pageCount],
    queryFn: ({ pageParam }) => fetchLatestSites(filters, pageCount, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: page => page.cursor,
  }), () => queryClient)

  const totalSites = $derived.by(() => {
    const pages = query.data?.pages
    if (!pages)
      return 0
    if (pages.length > 1)
      return (pages.length - 1) * pageCount + pages[pages.length - 1].sites.length
    return pages.length === 1 ? pages[pages.length - 1].sites.length : 0
  })
</script>

<div class=":uno: mx-4 flex flex-col gap-2">
  <div class=":uno: grid grid-cols-1 w-full gap-2 md:grid-cols-3 sm:grid-cols-2">
    {#if query.isSuccess}
      {#each query.data.pages as pages}
        {#each pages.sites as site (site.domain)}
          <Site {...site} />
        {/each}
      {/each}
    {/if}
  </div>
  {#if query.hasNextPage}
    <div class=":uno: mt-4 flex justify-center">
      <button class=":uno: button rounded-vw px-4 py-2" onclick={() => query.fetchNextPage()}>
        Load More
      </button>
    </div>
  {/if}
  <p class=":uno: mt-4 text-center">
    Showing {totalSites} sites
  </p>
</div>
