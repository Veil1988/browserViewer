<script context="module">
  import { onMount, afterUpdate } from 'svelte/internal';
  import { fly } from 'svelte/transition';
  import './styles.css';
  import cursorClient from './assets/cursorClient.svg';
  import cursorOperator from './assets/cursorOperator.svg';

  import {
    UserClick,
    MessageSendingTypeUser,
    TypeUsersEnum,
  } from '../../../utils/messageSending/interfaces';
</script>

<script lang="ts">
  export let entryMessage: UserClick['messageToOperator'];
  // Определение класса, типа пользователя, srcImg
  const typeUser =
    entryMessage?.messageType === MessageSendingTypeUser.userClick
      ? TypeUsersEnum.user
      : TypeUsersEnum.operator;
  const className = `browserViewer-click${typeUser === TypeUsersEnum.user ? 'User' : 'Operator'}`;
  const srcImg = typeUser === TypeUsersEnum.user ? cursorClient : cursorOperator;

  let prevX = 0;
  let prevY = 0;
  let nextX = 0;
  let nextY = 0;

  // Просчет движения анимации
  const calculateMove = (prev: number, next: number): number => {
    if (prev > next) {
      return (prev - next) * -1;
    } else if (prev < next) {
      return next - prev;
    } else {
      return 0;
    }
  };

  onMount(() => {
    if (entryMessage?.messageType === MessageSendingTypeUser.userClick) {
      const { clientX, clientY } = entryMessage.data;
      nextX = clientX;
      nextY = clientY;
    }
  });

  afterUpdate(() => {
    if (entryMessage?.messageType === MessageSendingTypeUser.userClick) {
      const { clientX, clientY } = entryMessage.data;
      nextX = clientX;
      nextY = clientY;
      setTimeout(() => {
        prevX = nextX;
        prevY = nextY;
      }, 501);
    }
  });
</script>

{#key nextX}
  <img
    class={className}
    style={`top: ${prevY}px; left: ${prevX}px;`}
    src={srcImg}
    alt=""
    out:fly={{
      duration: 500,
      x: calculateMove(prevX, nextX),
      y: calculateMove(prevY, nextY),
      opacity: 1,
    }}
  />
{/key}
