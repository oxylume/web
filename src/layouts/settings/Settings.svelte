<script module lang="ts">
  function loadSettings(): {
    useProxy: boolean
  } | null {
    if (typeof window === "undefined")
      return null
    const json = localStorage.getItem("settings")
    if (!json)
      return null
    return JSON.parse(json)
  }

  export const settings = $state(loadSettings() ?? { useProxy: false })
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui"

  let {} = $props()

  $effect(() => {
    const json = JSON.stringify(settings)
    localStorage.setItem("settings", json)
  })
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class=":uno: i-mdi-cog size-6 opacity-50 transition-opacity data-[state=open]:opacity-100 hover:opacity-100">
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      class=":uno: z-1000 flex flex-col overflow-hidden border-(1 border) rounded-md bg-background"
      sideOffset={8}
      align="end"
    >
      <DropdownMenu.RadioGroup
        bind:value={() => settings.useProxy ? "proxy" : "gateway", v => settings.useProxy = v === "proxy"}
      >
        <DropdownMenu.GroupHeading class=":uno: mb-1 px-2 pt-2 text-sm text-secondary">
          Open sites via
        </DropdownMenu.GroupHeading>
        <DropdownMenu.RadioItem
          class=":uno: group w-full flex cursor-pointer items-center gap-2 p-2 text-secondary data-[state=checked]:text-primary"
          value="gateway"
        >
          <div class=":uno: i-carbon-gateway size-6 text-secondary"></div>
          Public Gateway
          <div class=":uno: i-carbon-checkmark invisible size-4 group-data-[state=checked]:visible"></div>
        </DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem
          class=":uno: group w-full flex cursor-pointer items-center gap-2 p-2 text-secondary data-[state=checked]:text-primary"
          value="proxy"
        >
          <div class=":uno: i-carbon-gateway-vpn size-6 text-secondary"></div>
          TON Proxy
          <div class=":uno: i-carbon-checkmark invisible size-4 group-data-[state=checked]:visible"></div>
        </DropdownMenu.RadioItem>
      </DropdownMenu.RadioGroup>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
