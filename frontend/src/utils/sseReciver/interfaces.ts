import EventSource from 'eventsource';
import EventMessage from 'eventsource';

export interface SseReciverProps {
  eventSource: EventSource | null;
  cbMessage: (msg: EventMessage) => void;
}
