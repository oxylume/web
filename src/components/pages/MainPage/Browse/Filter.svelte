<script lang="ts">
  import type { Snippet } from "svelte"

  type Props = {
    children: Snippet
  }

  const { children }: Props = $props()
</script>

<div class=":uno: text-secondary px-3 py-1 border-(1 border) rounded-full flex gap-2 items-center">
  {@render children()}
</div>
