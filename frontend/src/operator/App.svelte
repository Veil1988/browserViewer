<script context="module">
  import AuthPage from './pages/authPage/index.svelte';

  import { StoreProps } from './stores/interfaces';
  import { connect } from 'svelte-mobx';

  import './root.css';
</script>

<script lang="ts">
  export let store: StoreProps;

  const { autorun } = connect();

  let isAuthonticadesOperator: boolean = false;
  $: autorun(() => {
    isAuthonticadesOperator = store.authStore.isAuthonticadesOperator;
  });

</script>

<!-- Компонент отвечает за роутинг оператора между страницами -->
<div>
  {#if !isAuthonticadesOperator}
    <AuthPage />
  {/if}
</div>
