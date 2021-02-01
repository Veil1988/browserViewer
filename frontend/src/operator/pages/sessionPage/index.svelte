<script context="module">
  import UserDesktop from '/components/events/UserDesktop/index.svelte';

  import { onMount } from 'svelte/internal';

  // TODO разобраться что за хуйня с index.ts/svelte
  import stores from '/operator/stores/index.ts';
  import { connect } from 'svelte-mobx';

  import './styles.css';
</script>

<script lang="ts">
  const { autorun } = connect();

  let sessionId: number;
  let activateSession: (sessionId: number) => void;
  let entryMessage: any;

  $: autorun(() => {
    sessionId = stores.connectionStore.sessionId;
    entryMessage = stores.connectionStore.entryMessage;

    activateSession = stores.eventStore.activateSession;
  });

  onMount(() => {
    activateSession(sessionId);
  });
</script>

<div class="browserViewer-sessionPage">
  <h1>Session Page</h1>
  <span>{entryMessage}</span>
  <UserDesktop {entryMessage} />
</div>
