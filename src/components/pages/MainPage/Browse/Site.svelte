<script lang="ts" module>
  import type { DomainZone } from "~/lib/api"
  import { domainZones } from "~/lib/api"

  const tldColors: Record<DomainZone, string> = {
    ".ton": "bg-sky-600",
    ".t.me": "bg-violet-600",
  }
</script>

<script lang="ts">
  type Props = {
    domain: string
    unicode: string
    accessible: boolean
    inStorage: boolean
    checkedUtime: number
  }

  const {
    domain,
    unicode,
    accessible,
    inStorage,
    checkedUtime,
  }: Props = $props()

  const zone = $derived.by(() => {
    for (const zone of domainZones) {
      if (domain.endsWith(zone)) {
        const color = tldColors[zone] ?? tldColors[".ton"]
        return { name: zone, color }
      }
    }
    return null
  })
</script>

<a
  class=":uno: group px-4 py-3 border-(1 border) rounded-lg flex flex-col gap-2 h-24 w-full cursor-pointer items-center justify-center"
  href={`http://${domain}`}
>
  <div class=":uno: text-center flex flex-1 flex-col w-full justify-center" title={unicode}>
    <div class=":uno: text-lg/5 w-full whitespace-nowrap text-ellipsis overflow-hidden">
      {unicode}
    </div>
    {#if unicode !== domain}
      <p class=":uno: text-sm/4 text-secondary">
        {domain}
      </p>
    {/if}
  </div>
  <div class=":uno: flex gap-2 w-full">
    {#if accessible}
      <div
        class=":uno: rounded-full bg-green size-5 relative before:(rounded-full bg-green content-empty inset-0 absolute group-hover:animate-ping)"
        title={`Accessible (last checked at ${new Date(checkedUtime * 1000).toLocaleString()})`}
      ></div>
    {:else}
      <div
        title={`Inaccessible (last checked at ${new Date(checkedUtime * 1000).toLocaleString()})`}
        class=":uno: rounded-full bg-red-500 size-5 group-hover:animate-pulse"
      ></div>
    {/if}
    {#if zone}
      <div class={[":uno: px-2 rounded-full inline-flex items-center text-xs font-bold uppercase", zone.color]}>
        {zone.name}
      </div>
    {/if}
    {#if inStorage}
      <div class=":uno: text-xs font-bold px-2 rounded-full bg-indigo-500 inline-flex uppercase items-center">
        TON Storage
      </div>
    {/if}
  </div>
</a>
