<script context="module">
  import Input from '/components/UI/Input/index.svelte';
  import { connect } from 'svelte-mobx';
  import stores from "/operator/stores";
</script>

<script lang="ts">
  const { autorun } = connect();

  $: autorun(() => {
    isAuthonticadesOperator = stores.authStore.isAuthonticadesOperator;
  });

  console.log('store', stores);
</script>
  
<div>
  <h1>auth Page</h1>
  <Input onChange={() => console.log('1')} value="suka" placeholder="suka2"/>
</div>
