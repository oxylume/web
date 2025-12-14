<script lang="ts">
  import type { SeparatorRootProps } from "bits-ui"
  import { Separator } from "bits-ui"

  type Props = SeparatorRootProps

  const {
    class: className,
    ...restProps
  }: Props = $props()
</script>

<Separator.Root
  class={["", className]}
  {...restProps}
/>
