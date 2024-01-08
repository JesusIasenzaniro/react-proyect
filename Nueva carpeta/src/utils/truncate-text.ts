export const truncateText = (text: string | null | undefined, maxLength: number): string => {
  if (!text) {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + '...';
  }
};