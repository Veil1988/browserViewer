<script context="module">
  import UserDesktop from '/components/events/UserDesktop/index.svelte';
  import VoiceMessage from '/components/events/VoiceMessage/index.svelte';
  import CloseActiveSession from '/components/events/CloseActiveSession/index.svelte';
  import Clicks from '/components/events/Clicks/index.svelte';

  import { onMount, onDestroy } from 'svelte/internal';
  import { TypeUsersEnum, MessageProps } from './../../../utils/messageSending/interfaces';

  // TODO разобраться что за хуйня с index.ts/svelte
  import stores from '/operator/stores/index.ts';
  import { connect } from 'svelte-mobx';

  import './styles.css';
</script>

<script lang="ts">
  const { autorun } = connect();

  let sessionId: number;
  let activateSession: (sessionId: number) => void;
  let entryMessage: MessageProps | {} = {};
  let handleCloseActiveSession: () => void;
  let sendClick: (event: MouseEvent, sessionId: number) => void;

  $: autorun(() => {
    sessionId = stores.connectionStore.sessionId;
    entryMessage = stores.connectionStore.entryMessage;
    activateSession = stores.eventStore.activateSession;
    handleCloseActiveSession = stores.connectionStore.closeSession;

    sendClick = stores.eventStore.sendClick;
  });

  onMount(() => {
    if (sessionId) {
      activateSession(sessionId);

      sessionStorage.setItem('browsingWiever', `${sessionId}`);

      window.addEventListener('click', (event) => {
        sendClick(event, sessionId);
      });
    }
  });

  onDestroy(() => {
    window.removeEventListener('click', (event) => sendClick(event, sessionId));
  });
</script>

<div class="browserViewer-sessionPage">
  <h1>Session Page Operator</h1>
  <UserDesktop {entryMessage} />
  <VoiceMessage {entryMessage} {sessionId} userType={TypeUsersEnum.operator} />
  <CloseActiveSession {handleCloseActiveSession} />
  <Clicks {entryMessage} />
</div>
