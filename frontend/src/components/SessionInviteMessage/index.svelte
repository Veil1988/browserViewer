<script context="module">
  import Button from '/components/UI/Buttons/Simple/index.svelte';
  import './styles.css';
</script>

<script lang="ts">
  export let sessionId: string | null;
  export let handleClose: () => void;
</script>

<div class="connectionPage-sessionInviteMessage">
  <div class="connectionPage-sessionInviteMessage-title">Ваш ID {sessionId}</div>
  <div class="connectionPage-sessionInviteMessage-text">Ожидайте оператора</div>
  <div class="connectionPage-sessionInviteMessage-buttonWrapper">
    <Button
      handleClick={handleClose}
      value="Завершить показ"
      disabled={false}
      className="ButtonGreen"
    />
  </div>
</div>
