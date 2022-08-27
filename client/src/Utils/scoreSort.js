export default function scoreSort(array, prop){

  let swap = true;
  while(swap){
    swap = false;
    for(let i = 0; i < array.length-1; i++){
      if( array[i][prop] >= array[i+1][prop] ) {
        [array[i] , array[i+1]] = [array[i+1] , array[i]];
        swap = true
      };
    };
  };
  return array;
};
