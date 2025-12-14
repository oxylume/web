<script lang="ts">
  import type { Snippet } from "svelte"
  import { Dialog, Separator } from "bits-ui"

  type Props = Dialog.RootProps & {
    trigger: Snippet
    closeButton: string
    title?: Snippet
  }

  let {
    open = $bindable(false),
    children,
    trigger,
    closeButton,
    title,
    ...restProps
  }: Props = $props()
</script>

<Dialog.Root bind:open {...restProps}>
  <Dialog.Trigger>
    {@render trigger()}
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay class=":uno: bg-black/80 inset-0 fixed z-999 keyframes-(fade-in fade-out) animate-(duration-250 ease-in-out) data-[state=closed]:animate-name-fade-out data-[state=open]:animate-name-fade-in" />
    <Dialog.Content
      class=":uno: text-primary p-5 border-(1 border) rounded-lg bg-background max-w-[calc(100%-2rem)] w-full translate-[-50%] left-[50%] top-[50%] fixed z-1000 keyframes-(fade-in fade-out) animate-(duration-250 ease-in-out) sm:max-w-120 data-[state=closed]:animate-name-fade-out data-[state=open]:animate-name-fade-in"
    >
      <Dialog.Close class=":uno: i-carbon-close size-6 right-2 top-2 absolute" />
      {#if title}
        <Dialog.Title class=":uno: text-lg font-semibold px-5 flex w-full items-center justify-center">
          {@render title()}
        </Dialog.Title>
        <Separator.Root class=":uno: mb-6 mt-5 bg-border h-px -mx-5" />
      {/if}
      {@render children?.()}
      <Dialog.Close class=":uno: p-2 border-(1 accent) rounded-lg w-full transition hover:(text-background bg-accent)">
        {closeButton}
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
