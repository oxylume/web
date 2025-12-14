<script lang="ts">
  import type { SelectSingleRootProps, WithoutChildren } from "bits-ui"
  import { Select } from "bits-ui"

  type Props = WithoutChildren<Omit<SelectSingleRootProps, "type">> & {
    deselectedLabel?: string
  }

  let {
    value = $bindable(),
    class: className,
    items,
    deselectedLabel = "None",
    ...restProps
  }: Props = $props()

  const itemDeselectedLabel = $derived(items?.find(item => item.value === "")?.label)
</script>

<Select.Root type="single" bind:value={value} {...restProps}>
  <Select.Trigger class={[":uno: flex items-center cursor-pointer gap-1", className]}>
    {#if value}
      {items?.find(item => item.value === value)?.label}
    {:else}
      {itemDeselectedLabel ?? deselectedLabel}
    {/if}
    <span class=":uno: i-carbon-chevron-down text-lg text-secondary ml-auto"></span>
  </Select.Trigger>
  <Select.Content class=":uno: border-(1 border) rounded-md bg-background flex flex-col z-1000 overflow-hidden" sideOffset={8} align="end">
    {#each items as { value, label, disabled } (value)}
      <Select.Item
        class={[":uno: p-2 w-full cursor-pointer text-secondary", "data-[highlighted]:(bg-secondary/40 text-primary) data-[selected]:(bg-secondary/20 text-primary)"]}
        {value} {label} {disabled}
      >
        {label}
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
