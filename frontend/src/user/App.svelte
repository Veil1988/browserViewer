<script context="module">
  import { connect } from 'svelte-mobx';
  import stores from './stores';

  import './root.css';
</script>

<script lang="ts">
  const { autorun } = connect();

  /**
   * Передаваемая во вне для управления приложением на клиенте
   */
  const browserViewer = {
    start: () => stores.sessionStore.fetchIdSession(),
    close: () => stores.sessionStore.closeSession(),
  };
  let x: any;
  $: autorun(() => {
    x = stores.sessionStore.entryMessage;
  });

  window.browserViewer = browserViewer;

</script>

<!-- Компонент отвечает за роутинг клиента и стартовую инициализацию компонентов -->
<div>
  <h1>The time is${x}</h1>
  <div>This page has been open for</div>
</div>
