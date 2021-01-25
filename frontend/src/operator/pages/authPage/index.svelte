<script context="module">
  import { afterUpdate } from 'svelte';
  // TODO разобраться что за хуйня с index.ts/svelte
  import Input from '/components/UI/Input/index.svelte';
  import Button from '/components/UI/Buttons/Simple/index.svelte';
  import stores from '/operator/stores/index.ts';
  import { connect } from 'svelte-mobx';

  import './styles.css';
</script>

<script lang="ts">
  const { autorun } = connect();

  // TODO сам знаешь что делать
  let onInputAuth: (event: any) => void;
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

  afterUpdate(() => {
    isDisabled = !isLoading && operatorLogin.length && operatorPassword.length ? false : true;
  });
</script>

<div class="authPage">
  <div class="authPage-submitForm">
    <h1>Auth Page</h1>
    <div class="authPage-inputContainer">
      <Input
        id="authLogin"
        onInput={onInputAuth}
        value={operatorLogin}
        placeholder="login"
        type="login"
      />
      <Input
        id="authPassword"
        onInput={onInputAuth}
        value={operatorPassword}
        placeholder="password"
        type="password"
      />
    </div>

    <div class="authPage-buttonContainer">
      <Button
        handleClick={handleAuth}
        value="Авторизоваться"
        disabled={isDisabled}
        className="ButtonGreen"
      />
    </div>
  </div>
</div>
