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

  let isSending: boolean;

  const htmlElementUser = document.querySelector('html');

  let mutationObserver: MutationObserver | null = null;

  $: autorun(() => {
    entryMessage = stores.connectionStore.entryMessage;
    sessionId = stores.connectionStore.sessionId;
    handleCloseActiveSession = stores.connectionStore.closeSession;

    // EVENTS
    isSending = stores.eventsStore.isSending;
    sendDesktopToOperator = stores.eventsStore.sendDesktopToOperator;
    sendClick = stores.eventsStore.sendClick;
  });

  const mutationCallback: MutationCallback = async (mutationsList: MutationRecord[]) => {
    console.log('---', mutationsList);
    if (!isSending) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          console.log('suka');
          // await sendDesktopToOperator(sessionId);
        } else if (mutation.type === 'attributes') {
          console.log('pes');
          await sendDesktopToOperator(sessionId);
        }
      }
    }
  };

  onMount(async () => {
    await sendDesktopToOperator(sessionId);

    if (htmlElementUser) {
      mutationObserver = new MutationObserver(mutationCallback);

      mutationObserver.observe(htmlElementUser, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    window.addEventListener('click', (event) => {
      sendClick(event, sessionId);
    });
  });

  onDestroy(() => {
    window.removeEventListener('click', (event) => sendClick(event, sessionId));

    mutationObserver?.disconnect();
  });
</script>

<!-- страница сессии между клиентом и оператором -->
<div>
  <h1>Session Page User</h1>
  <VoiceMessage {entryMessage} {sessionId} userType={TypeUsersEnum.user} />
  <CloseActiveSession {handleCloseActiveSession} />
  <Clicks {entryMessage} />
</div>
