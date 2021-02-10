import html2canvas from 'html2canvas';

export const screenUserDesktop = (): Promise<any> => {
  const desktopWidth = document.documentElement.clientWidth;
  const desktopHeight = document.documentElement.clientHeight;
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
