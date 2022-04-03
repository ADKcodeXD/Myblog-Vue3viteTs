declare module 'mui-player'{
    export default class MuiPlayer {

        
        constructor({
            container,
            title,
            src
        }:any)
        container: string;
        title: string;
        src: string;
        reloadUrl(src: any):any ;
        destory():any;
        getFullscreen():any;
    }
}