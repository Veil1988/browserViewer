<script context="module">
  import { onMount, beforeUpdate } from 'svelte/internal';
  import './styles.css';
</script>

<script lang="ts">
  export let entryMessage: any;

  let canvas: any = null; //document.querySelector('.browserViewer-userDesktop');
  let imgScreen: string = '';
  let userDesktopData: any | null = null;


  const updateCanvasData = async () => {

    console.log('suka');
    imgScreen = entryMessage.data.imgScreen;
    userDesktopData = entryMessage.data.userDesktopData;
    // TODO проверку и автосролл написатьж
    console.log('----', canvas, userDesktopData);
    if (canvas && userDesktopData?.desktopWidth && userDesktopData?.desktopHeight) {
      let img = new Image();
      let ctx = canvas.getContext('2d');
      img.src = imgScreen;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      }
      console.log('---', img);

      canvas.width = userDesktopData.desktopWidth;
      canvas.height = userDesktopData.desktopHeight;
      // canvas.getContext('2d');
      // const img = new Image;

    }

  }

  onMount(() => {
    canvas = document.querySelector('.browserViewer-userDesktop');
    if (entryMessage.messageType === 'userDesktop') {
      updateCanvasData();
    }
  });

  beforeUpdate(() => {
    if (entryMessage.messageType === 'userDesktop') {
      updateCanvasData();
    }
  });

  // afterUpdate(() => {
  //   if (entryMessage.messageType === 'userDesktop') {
  //     updateCanvasData();
  //   }
  // })
</script>

<canvas class="browserViewer-userDesktop" />
