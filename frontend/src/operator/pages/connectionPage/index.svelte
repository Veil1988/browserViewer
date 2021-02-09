<script context="module">
  import { onMount, onDestroy } from 'svelte/internal';

  import ConnectionUserList from '/components/connectionUserList/index.svelte';
  // TODO разобраться что за хуйня с index.ts/svelte
  import stores from '/operator/stores/index.ts';
  import { connect } from 'svelte-mobx';

  import './styles.css';
</script>

<script lang="ts">
  const { autorun } = connect();

  let idUserSessionAwaitList: [] | number[];

  $: autorun(() => {
    idUserSessionAwaitList = stores.connectionStore.idUserSessionAwaitList;
  });

  onMount(() => {
    stores.connectionStore.createServerSubscribeEvents();

    const isPreviusActiveStatus: string | null = sessionStorage.getItem('browsingWiever');
    if (isPreviusActiveStatus) {
      stores.connectionStore.closeSession();
    }
  });

  onDestroy(() => {
    stores.connectionStore.closeServerSubscribeEvents();
  });
</script>

<div class="browserViewer-connectionPage">
  <h1>Connection Page</h1>
  {#if idUserSessionAwaitList.length}
    <ConnectionUserList />
  {/if}
  {#if !idUserSessionAwaitList.length}
    Нету сессий
  {/if}
</div>
