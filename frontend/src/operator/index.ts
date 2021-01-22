import App from './App.svelte';
import store from './stores';

new App({
  props: { store },
  target: document.body,
});
