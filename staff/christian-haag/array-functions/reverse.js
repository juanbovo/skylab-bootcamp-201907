function reverse(array) {
    for (var i = 0; i <= Math.floor((array.length - 1) / 2); i++) {
        var a = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = a;
    }
    return array;
  }