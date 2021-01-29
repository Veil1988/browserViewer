<script context="module">
  import AuthPage from './pages/authPage/index.svelte';
  import ConnectionPage from './pages/connectionPage/index.svelte';
  import SessionPage from './pages/sessionPage/index.svelte';
  import { connect } from 'svelte-mobx';
  import stores from './stores';

  import './root.css';
</script>

<script lang="ts">
  const { autorun } = connect();

  let isAuthonticadesOperator: boolean = false;
  let sessionId: number | null;
  $: autorun(() => {
    isAuthonticadesOperator = stores.authStore.isAuthonticadesOperator;
    sessionId = stores.connectionStore.sessionId;
  });
</script>

<!-- Компонент отвечает за роутинг оператора между страницами -->
<div>
  {#if !isAuthonticadesOperator}
    <AuthPage />
  {/if}
  {#if !sessionId && isAuthonticadesOperator}
    <ConnectionPage />
  {/if}
  {#if sessionId && isAuthonticadesOperator}
    <SessionPage />
  {/if}
</div>
