export default function sortAlfabet(recipes){
  function intermedia(x,y) {
    if (x.title < y.title) return -1;
    if (x.title > y.title) return 1;
    return 0;
  };
  var s = recipes.sort(intermedia);
  return s;
}
