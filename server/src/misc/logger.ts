export default class Logger {
    static log(source: string, message: string) {
        const date = new Date();
        console.log(`\x1b[34m[${date.toLocaleTimeString()}][${source}]\x1b[0m ${message}`);
    }

    static error(source: string, message: string) {
        const date = new Date();
        console.log(`\x1b[31m[${date.toLocaleTimeString()}][${source}]\x1b[0m ${message}`);
    }
}