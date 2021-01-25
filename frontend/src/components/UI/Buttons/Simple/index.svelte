<script context="module">
  import './styles.css';
</script>

<script lang="ts">
  export let handleClick: () => void;
  export let value: string;
  export let disabled: boolean;
  export let className: string;
</script>

<button class={className} on:click={handleClick} {disabled}>
  {value}
</button>
