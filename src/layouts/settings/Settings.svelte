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

  export let settings = $state(loadSettings() ?? { useProxy: false })
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";

  let {} = $props()

  $effect(() => {
    const json = JSON.stringify(settings)
    localStorage.setItem("settings", json)
  });
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class=":uno: i-mdi-cog size-6 opacity-50 transition-opacity hover:opacity-100 data-[state=open]:opacity-100">
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      class=":uno: border-(1 border) rounded-md bg-background flex flex-col z-1000 overflow-hidden"
      sideOffset={8}
      align="end"
    >
      <DropdownMenu.RadioGroup
        bind:value={() => settings.useProxy ? "proxy" : "gateway", v => settings.useProxy = v === "proxy"}
      >
        <DropdownMenu.GroupHeading class=":uno: px-2 pt-2 text-secondary text-sm mb-1">
          Open sites via
        </DropdownMenu.GroupHeading>
        <DropdownMenu.RadioItem
          class={[":uno: p-2 w-full cursor-pointer flex gap-2 items-center text-secondary", "data-[highlighted]:(bg-secondary/40 text-primary) data-[state=checked]:(bg-secondary/20 text-primary)"]}
          value="gateway"
        >
          <div class=":uno: i-carbon-gateway size-6 text-secondary"></div>
          Public Gateway
        </DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem
          class={[":uno: p-2 w-full cursor-pointer flex gap-2 items-center text-secondary", "data-[highlighted]:(bg-secondary/40 text-primary) data-[state=checked]:(bg-secondary/20 text-primary)"]}
          value="proxy"
        >
          <div class=":uno: i-carbon-gateway-vpn size-6 text-secondary"></div>
          TON Proxy
        </DropdownMenu.RadioItem>
      </DropdownMenu.RadioGroup>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
