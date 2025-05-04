export const getYearLabel = (year: number | string) => {
    const suffixes = ['st', 'nd', 'rd', 'th'];
    const y = Number(year);
    const suffix = y === 1 ? 'st' : y === 2 ? 'nd' : y === 3 ? 'rd' : 'th';
    return `${y}${suffix} Year`;
};
