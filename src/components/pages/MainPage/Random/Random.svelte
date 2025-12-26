<script lang="ts">
  import { settings } from "~/layouts/settings/Settings.svelte"
  import { fetchRandomSite, wrapGateway } from "~/lib/api"

  let isFetching = false

  function visitRandom() {
    isFetching = true
    fetchRandomSite().then((site) => {
      const link = settings.useProxy ? `http://${site.domain}` : wrapGateway(site.domain)
      window.open(link, "_blank", "noopener")
    }).finally(() => {
      isFetching = false
    })
  }
</script>

<button
  class=":uno: flex cursor-pointer border-(2 accent) rounded-lg px-2 transition hover:(bg-accent text-background)"
  title="Open random site"
  onclick={visitRandom}
  disabled={isFetching}
><div class=":uno: i-mdi-dice size-7 h-full"></div></button>
