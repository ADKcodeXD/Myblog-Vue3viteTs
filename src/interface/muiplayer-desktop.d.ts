declare module 'mui-player-desktop-plugin' {
    export default class MuiPlayerDesktopPlugin {

        constructor({
            customSetting,
            contextmenu,
            thumbnails
        }: any)
    }
}
declare module 'xgplayer-hls.js'{
    export default class HlsJsPlayer {

        constructor(config: any);
        destroy():any;
        rotate():any;
        on():any;
    }
}