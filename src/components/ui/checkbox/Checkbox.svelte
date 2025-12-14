<script lang="ts">
  import type { CheckboxRootProps, WithoutChildren } from "bits-ui"
  import { Checkbox } from "bits-ui"

  type Props = WithoutChildren<CheckboxRootProps>

  let {
    class: className,
    checked = $bindable(false),
    ...restProps
  }: Props = $props()
</script>

<Checkbox.Root
  class={[":uno: text-2xl text-primary i-carbon-checkbox transition-transform duration-100 active:scale-95 data-[state=checked]:(text-accent i-carbon-checkbox-checked-filled)", className]}
  bind:checked={checked}
  {...restProps}
>
</Checkbox.Root>
