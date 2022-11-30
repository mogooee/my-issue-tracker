export const buttonLogic = (totalPage: number, currentPage: number) => {
  if (totalPage <= 7) {
    const totalArray = Array.from({ length: totalPage }, (_, index) => index + 1);
    return totalArray;
  }

  if (currentPage < 5) {
    const firstArray = Array.from({ length: 5 }, (_, index) => index + 1);
    return [...firstArray, '...', totalPage];
  }

  if (totalPage - 5 < currentPage) {
    const lastArray = Array.from({ length: 5 }, (_, index) => totalPage - 4 + index);
    return [1, '...', ...lastArray];
  }

  const innerArray = Array.from({ length: 3 }, (_, index) => currentPage - 1 + index);
  return [1, '...', ...innerArray, '...', totalPage];
};
