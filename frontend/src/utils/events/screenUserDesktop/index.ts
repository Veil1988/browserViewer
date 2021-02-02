import html2canvas from 'html2canvas';

import { ScreenUserDesktopProps } from './interfaces';

export const screenUserDesktop = (): Promise<ScreenUserDesktopProps> => {
  const desktopWidth = document.body.offsetWidth;
  const desktopHeight = document.body.offsetHeight;
  const desktopScrollTop = window.pageYOffset;
  const desktopScollLeft = window.pageXOffset;

  return html2canvas(document.body).then((canvas) => {
    const base64image = canvas.toDataURL();
    return {
      imgScreen: base64image,
      userDesktopData: {
        desktopWidth,
        desktopHeight,
        desktopScrollTop,
        desktopScollLeft,
      },
    };
  });
};
