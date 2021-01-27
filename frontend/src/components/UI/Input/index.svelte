<script context="module">
  // TODO разобраться что за
  // import { beforeUpdate } from 'svelte';
  import './styles.css';
</script>

<script lang="ts">
  export let onInput: (event: Event) => void;
  export let value: string;
  export let placeholder: string;
  export let id: string;

  let inputClassValid: string =
    value.length > 0 ? 'browserViewer-inputValid' : 'browserViewer-input';

  // beforeUpdate(() => {
  //   console.log('---', value.length);
  //   inputClassValid = value.length > 0 ? 'browserViewer-inputValid' : 'browserViewer-input';
  // });
</script>

<input {id} class={inputClassValid} on:input={(event) => onInput(event)} {value} {placeholder} />
