<script context="module">
  import { onMount } from 'svelte/internal';

  // TODO разобраться что за хуйня с index.ts/svelte
  import stores from '/operator/stores/index.ts';
  import { connect } from 'svelte-mobx';

  import './styles.css';
</script>

<script lang="ts">
  const { autorun } = connect();

  // let idUserSessionAwaitList: [] | number[];

  $: autorun(() => {
    //idUserSessionAwaitList = stores.connectionStore.idUserSessionAwaitList;
  });

  onMount(() => {
    //   stores.connectionStore.createServerSubscribeEvents();
    //   // console.log('111', idUserSessionAwaitList);
  });
</script>

<div class="browserViewer-sessionPage">
  <h1>Session Page</h1>
</div>
