export const WebWorker = (worker) => {
  const code = worker.toString();
  const iife = `(${code})()`;
  const blob = new window.Blob([iife]);
  const fileURL = window.URL.createObjectURL(blob)
  return new window.Worker(fileURL);
};
