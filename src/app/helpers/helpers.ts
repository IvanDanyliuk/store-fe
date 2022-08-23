export const getFormattedTitle = (pathname: string, position: number) => {
  const title = pathname.split('/')[position];
  return title[0].toUpperCase() + title.slice(1);
};