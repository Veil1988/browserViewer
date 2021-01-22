<script context="module">
  import Input from '/components/UI/Input/index.svelte';
  import stores from '/operator/stores/index.ts';
  import { connect } from 'svelte-mobx';
</script>

<script lang="ts">
  const { autorun } = connect();

  // $: autorun(() => {
  //   // isAuthonticadesOperator = stores.authStore.isAuthonticadesOperator;
  // });
  console.log('---', stores);
</script>

<div>
  <h1>auth Page</h1>
  <Input onChange={() => console.log('1')} value="suka" placeholder="suka2" />
</div>
