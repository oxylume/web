<script lang="ts">
  import type { ToggleGroupItemProps } from "bits-ui"
  import { ToggleGroup } from "bits-ui"

  type Props = ToggleGroupItemProps

  const {
    class: className,
    ...restProps
  }: Props = $props()
</script>

<ToggleGroup.Item
  class={[":uno: cursor-pointer flex items-center justify-center rounded-md transition-transform duration-100 active:scale-95", className]}
  {...restProps}
/>
