<script context="module">
  import { ButtonTypeEnum } from './interfaces';
  import './styles.css';
</script>

<script lang="ts">
  export let handleClick: () => void;
  export let value: string;
  export let disabled: boolean;
  export let className: keyof typeof ButtonTypeEnum | null;
</script>

<button class={`browserViewer-${className || 'button'}`} on:click={handleClick} {disabled}>
  {value}
</button>
