export const getMaxValue = (list: { id: number }[]) => {
  const maxId =
    list.length === 0
      ? 0
      : list.reduce((max, item) => {
          return item.id > max ? item.id : max;
        }, -Infinity);

  return maxId + 1;
};
