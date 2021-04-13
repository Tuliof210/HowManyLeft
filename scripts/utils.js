const turnIntoString = (value, size, fill) =>
  value.toString().padStart(size, fill);

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
