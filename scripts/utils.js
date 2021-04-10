const delay = ms => new Promise(resolve => setTimeout(() => resolve(true), ms));

const fetchData = (path, key) =>
  fetch(path)
    .then(res => res.text())
    .then(res => {
      screens[key] = res;
      return res;
    })
    .catch(err => {
      console.error('error to get Home layout', err);
      screens[key] = '<div></div>';
      return '<div></div>';
    });
