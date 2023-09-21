export const delay = (time: any) => {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1), time;
    });
  });
};
