import { MessageSendingTypeUser } from 'utils/messageSending/interfaces';

export interface ScreenUserDesktopProps {
  imgScreen: string;
  messageType: MessageSendingTypeUser.userDesktop;
  userDesktopData: {
    desktopWidth: number;
    desktopHeight: number;
    desktopScrollTop: number;
    desktopScollLeft: number;
  };
}
