<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query"
  import Dialog from "~/components/ui/dialog/Dialog.svelte"
  import queryClient from "~/lib/queryClient"

  const connectivity = createQuery(() => ({
    queryKey: ["connectivity"],
    queryFn: async () => {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 6 * 1000)
      try {
        await fetch("http://the-very-test-domain.ton", {
          method: "HEAD",
          cache: "no-cache",
          mode: "no-cors",
          keepalive: false,
          signal: controller.signal,
        })
        clearTimeout(timeout)
        // at this point, we should get an opaque response if a client reached the server, which means the client have ton proxy set up
        return true
      }
      catch {
        return false
      }
    },
    retry: false,
    staleTime: 600 * 1000,
  }), () => queryClient)

  const borderColor = $derived(connectivity.isFetching ? "border-border" : connectivity.data ? "border-green" : "border-red")
</script>

<div class={[":uno: border-1 rounded-lg flex items-center p-2 gap-2 flex-1", borderColor]}>
  {#if connectivity.isFetching}
    <span class=":uno: border-(3 x-border b-accent t-border) rounded-full size-6 animate-spin"></span>
    <span class=":uno: flex-1">
      Checking connectivity to TON Sites...
    </span>
  {:else if connectivity.data}
    <span class=":uno: i-carbon-thumbs-up-filled text-green size-6"></span>
    <span class=":uno: flex-1">
      You are ready to explore TON Sites
    </span>
  {:else}
    <span class=":uno: i-carbon-thumbs-down-filled text-red size-6"></span>
    <span class=":uno: flex-1">
      No connection to TON Sites
    </span>
  {/if}
  <Dialog closeButton="Got it">
    {#snippet trigger()}
      <div class=":uno: i-carbon-help size-6" title="Help"></div>
    {/snippet}
    {#snippet title()}
      How to access TON Sites?
    {/snippet}
    Accessing TON Sites require running TON Proxy, you have several options to do so:
    <ul class=":uno: mb-5 mt-2 list-(disc inside)">
      <li>Install <a class=":uno: text-accent hover:(underline underline-accent underline-offset-2)" href="https://mytonwallet.io" target="_blank">MyTonWallet browser extension</a> and enable TON Proxy in the extension's settings</li>
      <li>Download and run <a class=":uno: text-accent hover:(underline underline-accent underline-offset-2)" href="https://github.com/xssnick/Tonutils-Proxy/tree/master#download-precompiled-version">TON Proxy app</a></li>
    </ul>
  </Dialog>
  <button
    class=":uno: i-carbon-rotate-360 size-6 disabled:(opacity-50 cursor-not-allowed)"
    title="Recheck"
    onclick={() => connectivity.refetch()}
    disabled={connectivity.isFetching}
  ></button>
</div>
