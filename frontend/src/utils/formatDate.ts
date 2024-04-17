export const FormatDate = (dateString: string) => {
    const date = new Date(dateString);
    const hours = PadZero(date.getHours());
    const minutes = PadZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

const PadZero = (num: number) => {
    return num.toString().padStart(2, "0")
}