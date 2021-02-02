<script context="module">
  import { beforeUpdate } from 'svelte/internal';

  import Input from '/components/UI/Input/index.svelte';
  import Button from '/components/UI/Buttons/Simple/index.svelte';

  import stores from '/operator/stores/index.ts';
  import { connect } from 'svelte-mobx';

  import './styles.css';
</script>

<script lang="ts">
  const { autorun } = connect();

  // TODO сам знаешь что делать
  let onInputAuth: (event: svelte.JSX.EventHandler) => void;
  let handleAuth: () => void;
  let operatorLogin: string = '';
  let operatorPassword: string = '';
  let isLoading: boolean = false;
  let isDisabled: boolean = true;

  $: autorun(() => {
    operatorLogin = stores.authStore.operatorLogin;
    operatorPassword = stores.authStore.operatorPassword;
    isLoading = stores.authStore.isLoading;
  });

  onInputAuth = stores.authStore.onInputAuth;
  handleAuth = stores.authStore.handleAuth;

  /** Функция проверки валидации для кнопки */
  isDisabled = !isLoading && operatorLogin.length && operatorPassword.length ? false : true;
  beforeUpdate(() => {
    isDisabled = !isLoading && operatorLogin.length && operatorPassword.length ? false : true;
  });
</script>

<div class="browserViewer-authPage">
  <div class="browserViewer-authPage-submitForm">
    <h1>Auth Page</h1>
    <div class="browserViewer-authPage-inputContainer">
      <Input
        id="browserViewer-authLogin"
        onInput={onInputAuth}
        value={operatorLogin}
        placeholder="login"
      />
      <Input
        id="browserViewer-authPassword"
        onInput={onInputAuth}
        value={operatorPassword}
        placeholder="password"
      />
    </div>

    <div class="browserViewer-authPage-buttonContainer">
      <Button
        handleClick={handleAuth}
        value="Авторизоваться"
        disabled={isDisabled}
        className="buttonGreen"
      />
    </div>
  </div>
</div>
