<script context="module">
  import { connect } from 'svelte-mobx';
  import stores from '/operator/stores/index.ts';

  import ConnectionUserItem from './ConnectionUserItem/index.svelte';

  import './styles.css';
</script>

<script lang="ts">
  const { autorun } = connect();
  let idUserSessionAwaitList: [] | number[];
  let handleConnectToUser: (id: number) => svelte.JSX.EventHandler<MouseEvent, HTMLImageElement>;
  $: autorun(() => {
    idUserSessionAwaitList = stores.connectionStore.idUserSessionAwaitList;
    handleConnectToUser = stores.connectionStore.operatorConnectToUser;
  });
</script>

<div class="browserViewer-connectionUserList">
  {#each idUserSessionAwaitList as id}
    <ConnectionUserItem {id} {handleConnectToUser} />
  {/each}
</div>
