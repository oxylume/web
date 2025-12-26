<script lang="ts">
  type Props = {
    onAccept: () => void
  }

  const { onAccept }: Props = $props()
</script>

<div class=":uno: backdrop-blur-xs absolute inset-0 z-5 h-[max(100%,500px)] flex flex-col items-center justify-center gap-2 px-[12%] py-4 text-center text-lg">
  <h1 class=":uno: text-3xl text-red-500 font-bold">DISCLAIMER</h1>
  <p>TON Sites ARE user-produced content. This website has no control over, and provides no warranty that subsequent websites will not contain any disturbing and/or illegal content</p>
  <button
    class=":uno: flex cursor-pointer border-(2 accent) rounded-lg p-2 transition hover:(bg-accent text-background)"
    onclick={() => onAccept()}
  >
    I understand
  </button>
</div>
