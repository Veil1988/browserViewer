import EventSource from 'eventsource';
import EventMessage from 'eventsource';

export interface SseReciverProps {
  eventSource: EventSource;
  cbMessage: (msg: EventMessage) => void;
}
