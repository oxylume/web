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
    <Dialog.Overlay class=":uno: fixed inset-0 z-999 keyframes-(fade-in fade-out) animate-(duration-250 ease-in-out) bg-black/80 data-[state=closed]:animate-name-fade-out data-[state=open]:animate-name-fade-in" />
    <Dialog.Content
      class=":uno: fixed left-[50%] top-[50%] z-1000 max-w-[calc(100%-2rem)] w-full translate-[-50%] keyframes-(fade-in fade-out) animate-(duration-250 ease-in-out) border-(1 border) rounded-lg bg-background p-5 text-primary sm:max-w-120 data-[state=closed]:animate-name-fade-out data-[state=open]:animate-name-fade-in"
    >
      <Dialog.Close class=":uno: i-carbon-close absolute right-2 top-2 size-6" />
      {#if title}
        <Dialog.Title class=":uno: w-full flex items-center justify-center px-5 text-lg font-semibold">
          {@render title()}
        </Dialog.Title>
        <Separator.Root class=":uno: mb-6 mt-5 h-px bg-border -mx-5" />
      {/if}
      {@render children?.()}
      <Dialog.Close class=":uno: w-full border-(1 accent) rounded-lg p-2 transition hover:(bg-accent text-background)">
        {closeButton}
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
