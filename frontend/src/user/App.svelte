<script context="module">
  import { StoreProps } from './stores/interfaces';
  import { connect } from 'svelte-mobx';

  import './root.css';
</script>

<script lang="ts">
  export let store: StoreProps;

  const { autorun } = connect();

  /**
   * Передаваемая во вне для управления приложением на клиенте
   */
  const browserViewer = {
    start: () => store.sessionStore.fetchIdSession(),
    close: () => store.sessionStore.closeSession(),
  };
  let x: any;
  $: autorun(() => {
    x = store.sessionStore.entryMessage;
  });
  // store.sessionStore.fetchIdSession();
  console.log('---', x);
  window.browserViewer = browserViewer;
</script>

<!-- Компонент отвечает за роутинг клиента и стартовую инициализацию компонентов -->
<div>
  <h1>The time is${x}</h1>
  <div>This page has been open for</div>
</div>
