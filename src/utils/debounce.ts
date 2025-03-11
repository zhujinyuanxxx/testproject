

function debounce(fn: (...args: any[]) => void, delay: number) {
    let timer: NodeJS.Timeout | null; // 维护一个 timer
    return function (this: any, ...args: any[]) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout( () => {
            fn.apply(this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
        }, delay);
    };
}


export default debounce