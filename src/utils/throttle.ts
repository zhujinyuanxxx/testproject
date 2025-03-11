
function throttle(fn: (...args: any[]) => void, delay: number) {
    let timer: NodeJS.Timeout | null;
    return function (this: any, ...args: any[]) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
        }, delay);
    };
}


export default throttle