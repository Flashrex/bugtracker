export function formatDateString(dateString: string) {
    const [date, time] = dateString.split('T');
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':').map((str, index) => index < 2 ? str : str.slice(0, 2));

    return `${day}.${month}.${year} ${hour}:${minute}:${second}`;
}