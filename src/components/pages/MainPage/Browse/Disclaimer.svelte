<script lang="ts">
  type Props = {
    onAccept: () => void
  }

  const { onAccept }: Props = $props()
</script>

<div class=":uno: text-lg px-[12%] py-4 text-center flex flex-col gap-2 h-[max(100%,500px)] items-center inset-0 justify-center absolute z-5 backdrop-blur-xs">
  <h1 class=":uno: text-3xl text-red-500 font-bold">DISCLAIMER</h1>
  <p>TON Sites ARE user-produced content. This website has no control over, and provides no warranty that subsequent websites will not contain any disturbing and/or illegal content</p>
  <button
    class=":uno: p-2 border-(2 accent) rounded-lg flex cursor-pointer transition hover:(text-background bg-accent)"
    onclick={() => onAccept()}
  >
    I understand
  </button>
</div>
