import { SseReciverProps } from './interfaces';

export const sseReciver = (props: SseReciverProps) => {
    const { eventSource, cbMessage } = props;
    if (eventSource && cbMessage) {
        // TODO убрать any
        eventSource.addEventListener('message', (event: any) => {
            cbMessage(event);
        })
    }
}