<script lang="ts" module>
  import type { DomainZone } from "~/lib/api"
  import { settings } from "~/layouts/settings/Settings.svelte"
  import { domainZones, wrapGateway } from "~/lib/api"

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
  class=":uno: group h-24 w-full flex flex-col cursor-pointer items-center justify-center gap-2 border-(1 border) rounded-lg px-4 py-3"
  href={settings.useProxy ? `http://${domain}` : wrapGateway(domain)}
>
  <div class=":uno: w-full flex flex-1 flex-col justify-center text-center" title={unicode}>
    <div class=":uno: w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg/5">
      {unicode}
    </div>
    {#if unicode !== domain}
      <p class=":uno: text-sm/4 text-secondary">
        {domain}
      </p>
    {/if}
  </div>
  <div class=":uno: w-full flex gap-2">
    {#if accessible}
      <div
        class=":uno: relative size-5 rounded-full bg-green before:(absolute inset-0 rounded-full bg-green content-empty group-hover:animate-ping)"
        title={`Accessible (last checked at ${new Date(checkedUtime * 1000).toLocaleString()})`}
      ></div>
    {:else}
      <div
        title={`Inaccessible (last checked at ${new Date(checkedUtime * 1000).toLocaleString()})`}
        class=":uno: size-5 rounded-full bg-red-500 group-hover:animate-pulse"
      ></div>
    {/if}
    {#if zone}
      <div class={[":uno: px-2 rounded-full inline-flex items-center text-xs font-bold uppercase", zone.color]}>
        {zone.name}
      </div>
    {/if}
    {#if inStorage}
      <div class=":uno: inline-flex items-center rounded-full bg-indigo-500 px-2 text-xs font-bold uppercase">
        TON Storage
      </div>
    {/if}
  </div>
</a>
