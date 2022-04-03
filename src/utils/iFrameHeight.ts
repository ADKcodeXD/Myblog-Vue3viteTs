export const setIframeHeight=(iframe: HTMLIFrameElement)=> {
    let height="100";
    if (iframe) {
        var iframeWin =
            iframe.contentWindow;
        if (iframeWin&&iframeWin.document.body) {
            height =
                iframeWin.document.documentElement.scrollHeight.toString() ||
                iframeWin.document.body.scrollHeight.toString();
        }
    }
    return height;
}