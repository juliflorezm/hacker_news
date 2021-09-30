const stories_detail = ({ index, n, top }) => {
  let init = 0;
  let array = [];

  while (init !== n) {
    array.push(top[index]);
    index++;
    init++;
  }
  return array;
};

module.exports = stories_detail;
