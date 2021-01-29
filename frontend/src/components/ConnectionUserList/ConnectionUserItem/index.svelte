<script context="module">
  import connectIcon from './assets/connect.svg';

  import './styles.css';
</script>

<script lang="ts">
  export let id: number;
  // TODO сука не прикидывайся пнем это же хуйня а не типизация
  export let handleConnectToUser: (id: number) => any;
</script>

<div class="browserViewer-connectionUserItem">
  <div class="browserViewer-connectionUserItem-wrapper">
    <div class="browserViewer-connectionUserItem-info">
      {id}
    </div>
    <img
      src={connectIcon}
      alt=""
      class="browserViewer-connectionUserItem-connectButton"
      on:click={handleConnectToUser(id)}
    />
  </div>
</div>
