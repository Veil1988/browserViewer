<script context="module">
  import ConnectionPage from '/user/pages/ConnectionPage/index.svelte';
  import SessionPage from '/user/pages/SessionPage/index.svelte';

  import { connect } from 'svelte-mobx';
  import stores from './stores';

  import { SessionStatusEnum } from '../user/stores/connectionStore/interfaces';

  import './root.css';
</script>

<script lang="ts">
  const { autorun } = connect();
  /**
   * Передаваемая во вне для управления приложением на клиенте
   */
  const browserViewer = {
    start: () => stores.connectionStore.fetchIdSession(),
    close: () => stores.connectionStore.closeSession(),
  };

  window.browserViewer = browserViewer;

  let sessionId: number | null = null;
  let status: keyof typeof SessionStatusEnum | null = null;

  $: autorun(() => {
    sessionId = stores.connectionStore.sessionId;
    status = stores.connectionStore.status;
  });
</script>

<!-- Компонент отвечает за роутинг клиента и стартовую инициализацию компонентов -->
<div>
  {#if sessionId && status === SessionStatusEnum.await}
    <ConnectionPage />
  {/if}
  {#if sessionId && status === SessionStatusEnum.active}
    <SessionPage />
  {/if}
</div>
