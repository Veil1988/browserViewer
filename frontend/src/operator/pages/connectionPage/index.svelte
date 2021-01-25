<script context="module">
  import { onMount } from 'svelte';
  // TODO разобраться что за хуйня с index.ts/svelte
  import stores from '/operator/stores/index.ts';
  import { connect } from 'svelte-mobx';

  import './styles.css';
</script>

<script lang="ts">
  const { autorun } = connect();
  // TODO сука ты знаешь что делаешь?
  let entryMessage: any;

  $: autorun(() => {
    entryMessage = stores.connectionStore.entryMessage;
  });

  onMount(() => {
    stores.connectionStore.createServerSubscribeEvents();
  });
</script>

<div>
  <h1>Connection Page</h1>
</div>
