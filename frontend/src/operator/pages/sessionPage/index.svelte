<script context="module">
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

  $: autorun(() => {
    sessionId = stores.connectionStore.sessionId;
    activateSession = stores.eventStore.activateSession;
    //idUserSessionAwaitList = stores.connectionStore.idUserSessionAwaitList;
  });

  onMount(() => {
    activateSession(sessionId);
  });
</script>

<div class="browserViewer-sessionPage">
  <h1>Session Page</h1>
</div>
