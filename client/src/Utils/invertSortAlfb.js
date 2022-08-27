export default function invertSortAlfb(recipes){
  function intermedia(x,y) {
    if (x.title > y.title) return -1;
    if (x.title < y.title) return 1;
    return 0;
  };
  var i = recipes.sort(intermedia);
  return i;
  }
