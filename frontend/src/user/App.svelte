<script context="module">
  import { StoreProps } from './stores/interfaces';
</script>

<script lang="ts">
  export let store: StoreProps;

  console.log('---', store.sessionStore.fetchIdSession);

  /**
   * Передаваемая во вне для управления приложением на клиенте
   */
  const browserViewer = {
    start: () => store.sessionStore.fetchIdSession(),
    close: () => store.sessionStore.closeSession(),
  };

  // store.sessionStore.fetchIdSession();

  window.browserViewer = browserViewer;

  // fetchIdSession();
</script>

<div>
  <h1>The time is</h1>
  <div>This page has been open for</div>
</div>
