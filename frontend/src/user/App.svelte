<script context="module">
  import { StoreProps } from './stores/interfaces';
</script>

<script lang="typescript">
  export let store: StoreProps;

  console.log('---', store.OperatorStore);
</script>

<div>
  <h1>The time is</h1>
  <div>This page has been open for</div>
</div>
