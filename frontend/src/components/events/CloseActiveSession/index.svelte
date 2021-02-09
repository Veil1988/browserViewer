<script context="module">
  import './styles.css';
</script>

<script lang="ts">
  export let handleCloseActiveSession: () => void;
</script>

<button class="browserViewer-closeActiveSession" on:click={handleCloseActiveSession}>
  Завершить сессию
</button>
