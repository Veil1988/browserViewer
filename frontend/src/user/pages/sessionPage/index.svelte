<script context="module">
  import VoiceMessage from '/components/events/VoiceMessage/index.svelte';

  import { onMount } from 'svelte/internal';

  import { connect } from 'svelte-mobx';

  import stores from '/user/stores/index.ts';
</script>

<script lang="ts">
  const { autorun } = connect();

  let sendDesktopToOperator: (sessionId: number) => void;
  let sessionId: number;
  let entryMessage: any;

  $: autorun(() => {
    sendDesktopToOperator = stores.eventsStore.sendDesktopToOperator;
  
    entryMessage = stores.connectionStore.entryMessage;
    sessionId = stores.connectionStore.sessionId;
  });

  onMount(() => {
    sendDesktopToOperator(sessionId);
  });

</script>

<!-- страница сессии между клиентом и оператором -->
<div>
  <h1>Session Page User</h1>
  <VoiceMessage {entryMessage} {sessionId} userType="user" />
</div>

