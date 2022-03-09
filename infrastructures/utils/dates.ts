export const toTimeFormat = (date: Date) => {
  return `${date.getHours() > 12 ? 'PM' : 'AM'} ${(date.getHours() % 12)
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};
