<script context="module">
  import { onMount, afterUpdate } from 'svelte/internal';

  import { messageSending } from '../../../utils/messageSending';

  import { MessageSendingTypeUser } from '../../../utils/messageSending/interfaces';

  import './styles.css';
</script>

<script lang="ts">
  export let sessionId: any;
  export let userType: any;
  export let entryMessage: any;

  let hasSupportModue: boolean = 'webkitSpeechRecognition' in window;
  let recognition: any = null;
  let classBtn: string = 'browserViewer-voiceMessage';

  let utterance: any = null;

  // ** запуск распознования речи */
  const startRecognition = () => {
    if (hasSupportModue && recognition) {
      let final_transcript = '';
      classBtn = 'browserViewer-voiceMessage-recording';
      recognition.start();

      recognition.lang = 'rus';
      // ** распознование речи */
      recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          }
        }
      };
      // ** отправка сообщения по завершению */
      recognition.onend = async () => {
        classBtn = 'browserViewer-voiceMessage';
        recognition.stop();
        
        await messageSending({
          sessionId,
          userType,
          messageType: MessageSendingTypeUser.voiceEvent,
          message: {
            [`${userType === 'operator' ? 'messageToUser' : 'messageToOperator'}`]: {
              messageType: MessageSendingTypeUser.voiceEvent,
              data: final_transcript,
            },
          },
        });
      };
    }
  };


  // ** подьем кнопки */
  const endRecognition = () => {
    classBtn = 'browserViewer-voiceMessage';
  };

  const startReading = () => {

    utterance = new SpeechSynthesisUtterance(entryMessage.data);
    speechSynthesis.speak(utterance);
  }

  onMount(() => {
    if (hasSupportModue) {
      // @ts-ignore
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
    }
  });

  afterUpdate(() => {
    if (entryMessage?.messageType === MessageSendingTypeUser.voiceEvent) {
      startReading();
    }
  })
</script>

<div>
  {#if hasSupportModue}
    <div class={`${classBtn}`} on:mousedown={startRecognition} on:mouseup={endRecognition}>
      {classBtn === 'browserViewer-voiceMessage' ? 'нажми' : 'идет запись'}
    </div>
  {/if}
  {#if !hasSupportModue}
    no support
  {/if}
</div>
