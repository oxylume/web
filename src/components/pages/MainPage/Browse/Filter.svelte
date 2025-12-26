<script lang="ts">
  import type { Snippet } from "svelte"

  type Props = {
    children: Snippet
  }

  const { children }: Props = $props()
</script>

<div class=":uno: flex items-center gap-2 border-(1 border) rounded-full px-3 py-1 text-secondary">
  {@render children()}
</div>
