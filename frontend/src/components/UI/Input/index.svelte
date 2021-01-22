<script context="module">
  import './styles.css';
</script>

<script lang="ts">
  export let onChange: any;
  export let value: string;
  export let placeholder: string;
</script>

<input type="text" on:change={onChange} {value} {placeholder} />
