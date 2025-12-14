<script lang="ts">
  import { fetchRandomSite } from "~/lib/api"

  let isFetching = false

  function visitRandom() {
    isFetching = true
    fetchRandomSite().then((site) => {
      window.open(`http://${site.domain}`, "_blank", "noopener")
    }).finally(() => {
      isFetching = false
    })
  }
</script>

<button
  class=":uno: px-2 border-(2 accent) rounded-lg flex cursor-pointer transition hover:(text-background bg-accent)"
  title="Open random site"
  onclick={visitRandom}
  disabled={isFetching}
><div class=":uno: i-mdi-dice size-7 h-full"></div></button>
