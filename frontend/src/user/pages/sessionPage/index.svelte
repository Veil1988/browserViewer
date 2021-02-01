<script context="module">
  import { onMount } from 'svelte/internal';

  import { connect } from 'svelte-mobx';

  import stores from '/user/stores/index.ts';
</script>

<script lang="ts">
  const { autorun } = connect();

  let sendDesktopToOperator: (sessionId: number) => void;
  let sessionId: number;

  $: autorun(() => {
    sendDesktopToOperator = stores.eventsStore.sendDesktopToOperator;
    sessionId = stores.connectionStore.sessionId;
  });

  onMount(() => {
    sendDesktopToOperator(sessionId);
  });
</script>

<!-- страница сессии между клиентом и оператором -->
<div><h1>Session Page</h1></div>
