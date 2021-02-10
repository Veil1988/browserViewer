<script context="module">
  import { afterUpdate } from 'svelte/internal';
  import { spring } from 'svelte/motion';
  import cursorClient from './assets/cursorClient.svg';
  import cursorOperator from './assets/cursorOperator.svg';

  import {
    UserClick,
    MessageSendingTypeUser,
    TypeUsersEnum,
  } from '../../../utils/messageSending/interfaces';

  import './styles.css';
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

  const transformSpring = spring({ x: 0, y: 0 }, { stiffness: 0.25, damping: 0.8 });

  afterUpdate(() => {
    if (entryMessage?.messageType === MessageSendingTypeUser.userClick) {
      const { clientX, clientY } = entryMessage.data;
      transformSpring.update(() => {
        return {
          x: clientX,
          y: clientY,
        };
      });
    }
  });
</script>

<img
  class={className}
  style={`top: ${$transformSpring.y}px; left: ${$transformSpring.x}px;`}
  src={srcImg}
  alt=""
/>
