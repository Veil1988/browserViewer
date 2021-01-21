export const sseReciver = (props: any) => {
    const { eventSource, cbMessage } = props;
    if (eventSource && cbMessage) {
        eventSource.addEventListener('message', (event: any) => {
            cbMessage(event);
        })
    }
}