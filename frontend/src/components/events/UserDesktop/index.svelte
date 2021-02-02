<script context="module">
  import { onMount, afterUpdate } from 'svelte/internal';
  import { MessageSendingTypeUser } from './../../../utils/messageSending/interfaces';
  import { UserDesktopDataProps } from './interfaces';
  import './styles.css';
</script>

<script lang="ts">
  export let entryMessage: any;

  let canvas: HTMLCanvasElement | null = null;
  let imgScreen: string = '';
  let userDesktopData: UserDesktopDataProps | null = null;

  const updateCanvasData = async () => {
    imgScreen = entryMessage.data.imgScreen;
    userDesktopData = entryMessage.data.userDesktopData;
    // TODO проверку и автосролл написатьж
    if (canvas && userDesktopData?.desktopWidth && userDesktopData?.desktopHeight) {
      let img = new Image();
      let ctx = canvas.getContext('2d');
      img.src = imgScreen;
      img.onload = () => {
        if (ctx) ctx.drawImage(img, 0, 0);
        else console.log('trouble with ctx');
      };

      canvas.width = userDesktopData.desktopWidth;
      canvas.height = userDesktopData.desktopHeight;
      canvas.style.width = `${userDesktopData.desktopWidth}px;`;
      canvas.style.height = `${userDesktopData.desktopHeight}px;`;
    }
  };

  onMount(() => {
    canvas = document.querySelector('.browserViewer-userDesktop');
    if (entryMessage?.messageType === MessageSendingTypeUser.userDesktop) {
      updateCanvasData();
    }
  });

  afterUpdate(() => {
    if (entryMessage?.messageType === MessageSendingTypeUser.userDesktop) {
      updateCanvasData();
    }
  });
</script>

<canvas class="browserViewer-userDesktop" />
