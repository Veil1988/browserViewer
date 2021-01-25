<script context="module">
  // TODO разобраться что за хуйня с index.ts/svelte
  import { connect } from 'svelte-mobx';

  import './styles.css';
</script>

<script lang="ts">
  const { autorun } = connect();

  $: autorun(() => {});
</script>

<div>
  <h1>Connection Page</h1>
</div>
