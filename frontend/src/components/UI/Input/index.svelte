<script context="module">
  // TODO разобраться что за
  import { afterUpdate } from 'svelte';
  import './styles.css';
</script>

<script lang="ts">
  export let onInput: (event: Event) => void;
  export let value: string;
  export let placeholder: string;
  export let id: string;

  let inputClassValid: string = value.length > 0 ? 'input-valid' : 'input';
  afterUpdate(() => {
    // он тупой и не понимает что length = 1
    inputClassValid = value.length > 0 ? 'input-valid' : 'input';
  });
</script>

<input {id} class={inputClassValid} on:input={(event) => onInput(event)} {value} {placeholder} />
