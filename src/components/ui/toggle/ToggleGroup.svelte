<script lang="ts">
  import type { ToggleGroupRootProps } from "bits-ui"
  import { ToggleGroup } from "bits-ui"

  type Props = ToggleGroupRootProps

  const {
    class: className,
    ...restProps
  }: Props = $props()

</script>

<ToggleGroup.Root
  class={[":uno: h-control rounded-md inline-flex items-center py-1 gap-1", className]}
  {...restProps}
/>
