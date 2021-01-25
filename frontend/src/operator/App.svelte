<script context="module">
  import AuthPage from './pages/authPage/index.svelte';
  import ConnectionPage from './pages/connectionPage/index.svelte';
  import { connect } from 'svelte-mobx';
  import stores from './stores';

  import './root.css';
</script>

<script lang="ts">
  const { autorun } = connect();

  let isAuthonticadesOperator: boolean = false;
  $: autorun(() => {
    isAuthonticadesOperator = stores.authStore.isAuthonticadesOperator;
  });
</script>

<!-- Компонент отвечает за роутинг оператора между страницами -->
<div>
  {#if !isAuthonticadesOperator}
    <AuthPage />
  {:else}
    <ConnectionPage />
  {/if}
</div>
