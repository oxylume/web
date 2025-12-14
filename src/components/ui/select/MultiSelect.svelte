<script lang="ts">
  import type { SelectMultipleRootProps, WithoutChildren } from "bits-ui"
  import { Select } from "bits-ui"

  type Props = WithoutChildren<Omit<SelectMultipleRootProps, "type">>

  let {
    value: values = $bindable(),
    class: className,
    items,
    ...restProps
  }: Props = $props()

  const allRef: HTMLButtonElement | null | undefined = $state()

  $effect(() => {
    if (!allRef)
      return
    const allSelected = values?.length === items?.length
    allRef.toggleAttribute("data-selected", allSelected)
  })
</script>

<Select.Root type="multiple" bind:value={values} {...restProps}>
  <Select.Trigger class={[":uno: flex items-center cursor-pointer gap-1", className]}>
    {#if !values || values.length === 0}
      None
    {:else if values.length === 1}
      {items?.find(item => item.value === values![0])?.label}
    {:else if values.length === items?.length}
      All
    {:else}
      {values.length} selected
    {/if}
    <span class=":uno: i-carbon-chevron-down text-lg text-secondary ml-auto"></span>
  </Select.Trigger>
  <Select.Content class=":uno: border-(1 border) rounded-md bg-background flex flex-col min-w-(--bits-select-anchor-width) overflow-hidden" sideOffset={8}>
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
