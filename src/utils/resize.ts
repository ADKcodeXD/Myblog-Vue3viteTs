export default function () {
    //利用防抖优化性能
    const newfun = () => {
        let timmer=null;
        return function () {
            if(timmer){
                clearTimeout(timmer);
            }
            timmer = setTimeout(() => {
                let docElement = document.documentElement || document.body;
                let clientWidth = docElement.clientWidth,
                    designWidth = 1920;
                docElement.style.fontSize = ((clientWidth / designWidth) * 14) < 10 ? (10 + "px") : (clientWidth / designWidth) * 14 + "px";
            }, 300);
        }
    }
    window.addEventListener("resize", newfun());
    newfun()();
}
