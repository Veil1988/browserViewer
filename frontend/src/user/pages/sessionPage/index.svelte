<script context="module">
  import VoiceMessage from '/components/events/VoiceMessage/index.svelte';
  import CloseActiveSession from '/components/events/CloseActiveSession/index.svelte';
  import Clicks from '/components/events/Clicks/index.svelte';

  import { onMount, onDestroy } from 'svelte/internal';

  import { connect } from 'svelte-mobx';

  import { TypeUsersEnum, MessageProps } from './../../../utils/messageSending/interfaces';

  import stores from '/user/stores/index.ts';
</script>

<script lang="ts">
  const { autorun } = connect();

  let sendDesktopToOperator: (sessionId: number) => void;
  let sessionId: number;
  let entryMessage: MessageProps | {} = {};
  let handleCloseActiveSession: () => void;
  let sendClick: (event: MouseEvent, sessionId: number) => void;

  $: autorun(() => {
    entryMessage = stores.connectionStore.entryMessage;
    sessionId = stores.connectionStore.sessionId;
    handleCloseActiveSession = stores.connectionStore.closeSession;
    // EVENTS
    sendDesktopToOperator = stores.eventsStore.sendDesktopToOperator;
    sendClick = stores.eventsStore.sendClick;
  });

  onMount(() => {
    sendDesktopToOperator(sessionId);

    window.addEventListener('click', (event) => {
      sendClick(event, sessionId);
    });
  });

  onDestroy(() => {
    window.removeEventListener('click', (event) => sendClick(event, sessionId));
  });
</script>

<!-- страница сессии между клиентом и оператором -->
<div>
  <h1>Session Page User</h1>
  <VoiceMessage {entryMessage} {sessionId} userType={TypeUsersEnum.user} />
  <CloseActiveSession {handleCloseActiveSession} />
  <Clicks {entryMessage} />
</div>
