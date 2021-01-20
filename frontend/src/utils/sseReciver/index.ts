export const sseReciver = (eventSource: any) => {
    if (eventSource) {
        eventSource.addEventListener('message', (event: any) => {
            console.log('event', event);
        })
    }
}
