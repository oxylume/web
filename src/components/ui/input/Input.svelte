<script lang="ts">
  import type { Snippet } from "svelte"
  import type { HTMLInputAttributes } from "svelte/elements"

  type Props = HTMLInputAttributes & {
    leading?: Snippet
    trailing?: Snippet
  }

  const {
    leading,
    trailing,
    class: className,
    ...restProps
  }: Props = $props()
</script>

<div class={[":uno: flex gap-2 items-center border-(1 border) rounded-md p-2", className]}>
  {@render leading?.()}
  <input
    class=":uno: flex-1 outline-none placeholder:text-secondary"
    {...restProps}
  />
  {@render trailing?.()}
</div>
