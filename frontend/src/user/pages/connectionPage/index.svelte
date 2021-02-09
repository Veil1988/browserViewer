<script context="module">
  import { onMount } from 'svelte/internal';
  import { connect } from 'svelte-mobx';
  import stores from '/user/stores/index.ts';

  import SessionInviteMessage from '/components/SessionInviteMessage/index.svelte';
</script>

<script lang="ts">
  const { autorun } = connect();

  let sessionId: number | null = stores.connectionStore.sessionId;
  let handleClose: () => void = stores.connectionStore.closeSession;
  /**
   * Передаваемая во вне для управления приложением на клиенте
   */

  $: autorun(() => {
    sessionId = stores.connectionStore.sessionId;
  });

  onMount(() => {
    if (sessionId) {
      sessionStorage.setItem('browsingWiever', `${sessionId}`);
    }
  });
</script>

<!-- страница подключение клиента к оператору -->
<div>
  {#if sessionId}
    <SessionInviteMessage {sessionId} {handleClose} />
  {/if}
</div>
