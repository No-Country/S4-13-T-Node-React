const difDays = (date1: number, date2: number) => {
    let dif = (date1 - date2) / (1000 * 60 * 60 * 24);

    return Math.floor(dif);
  };

  const difHours = (date1: number, date2: number) => {
    let dif = (date1 - date2) / (1000 * 60 * 60);

    return Math.floor(dif);
  };

  const difMinutes = (date1: number, date2: number) => {
    let dif = (date1 - date2) / (1000 * 60);

    return Math.floor(dif);
  };

export const calculateDates = (createdAt:string) => {
    const lastDate = new Date(createdAt).getTime();
  let actualDate = new Date().getTime();

    const days = difDays(actualDate, lastDate)
    const hours = difHours(actualDate, lastDate)
    const minutes = difMinutes(actualDate, lastDate)

    if (minutes <= 0) {
        return 'ahora';
    } else if (minutes > 0 && minutes < 60) {
        return minutes + ' min';
    } else if (hours > 0 && hours < 24) {
        return hours + ' hs';
    } else {
        return days + ' días'
    }
}