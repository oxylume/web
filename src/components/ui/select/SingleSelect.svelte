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
    <span class=":uno: i-carbon-chevron-down ml-auto text-lg text-secondary"></span>
  </Select.Trigger>
  <Select.Content class=":uno: z-1000 flex flex-col overflow-hidden border-(1 border) rounded-md bg-background" sideOffset={8} align="end">
    {#each items as { value, label, disabled } (value)}
      <Select.Item
        class=":uno: group w-full flex cursor-pointer items-center gap-2 p-2 text-secondary data-[selected]:text-primary"
        {value} {label} {disabled}
      >
        {label}
        <div class=":uno: i-carbon-checkmark invisible size-4 group-data-[selected]:visible"></div>
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
