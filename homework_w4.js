// Generate array dengan 100 nilai random dari 1 - 50
const array_random = [];
for (let i = 0, x = 100; i < x; i++) {
  array_random.push(Math.ceil(Math.random() * 50));
}
console.log(array_random);

// Memecah array_random menjadi array genap dan array ganjil dengan masing-masing jumlah index 50
const array_genap = [];
const array_ganjil = [];
for (let i = 0; i < array_random.length; i++) {
  if (i % 2 == 0) {
    array_genap.push(array_random[i]);
  } else {
    array_ganjil.push(array_random[i]);
  }
}
console.log(array_genap, array_ganjil);

// Function min max sum average array genap dan array ganjil
function minMaxSumAverage(array) {
  let min = array[0];
  let max = array[0];
  let sum = array[0];
  let average = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
    }
    if (array[i] > max) {
      max = array[i];
    }
  }
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  average = sum / array.length;
  if (array == array_genap) {
    return "\nArray Genap" + "\nMin = " + min + "\nMax = " + max + "\nSum = " + sum + "\nRata-rata = " + average;
  }
  if (array == array_ganjil) {
    return "\nArray Ganjil" + "\nMin = " + min + "\nMax = " + max + "\nSum = " + sum + "\nRata-rata = " + average;
  }
}
console.log(minMaxSumAverage(array_genap));
console.log(minMaxSumAverage(array_ganjil));

// Function perbandingan min array
function perbandinganMinArray(array1, array2) {
  let min_array1 = array1[0];
  let min_array2 = array2[0];
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] < min_array1) {
      min_array1 = array1[i];
    }
  }
  for (let i = 0; i < array2.length; i++) {
    if (array2[i] < min_array2) {
      min_array2 = array2[i];
    }
  }
  if (min_array1 < min_array2) {
    return "\nMin lebih besar array ganjil";
  } else if (min_array1 > min_array2) {
    return "\nMin lebih besar array genap";
  } else {
    return "\nMin memiliki nilai sama antara array genap dan array ganjil";
  }
}
console.log(perbandinganMinArray(array_genap, array_ganjil));

// Function perbandingan max array
function perbandinganMaxArray(array1, array2) {
  let max_array1 = array1[0];
  let max_array2 = array2[0];
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] > max_array1) {
      max_array1 = array1[i];
    }
  }
  for (let i = 0; i < array2.length; i++) {
    if (array2[i] > max_array2) {
      max_array2 = array2[i];
    }
  }
  if (max_array1 < max_array2) {
    return "\nMax lebih besar array ganjil";
  } else if (max_array1 > max_array2) {
    return "\nMax lebih besar array genap";
  } else {
    return "\nMax memiliki nilai sama antara array genap dan array ganjil";
  }
}
console.log(perbandinganMaxArray(array_genap, array_ganjil));

// Function perbandingan sum array
function perbandinganSumArray(array1, array2) {
  let sum_array1 = array1[0];
  let sum_array2 = array2[0];
  for (let i = 0; i < array1.length; i++) {
    sum_array1 += array1[i];
  }
  for (let i = 0; i < array2.length; i++) {
    sum_array2 += array2[i];
  }
  if (sum_array1 < sum_array2) {
    return "\nSum lebih besar array ganjil";
  } else if (sum_array1 > sum_array2) {
    return "\nSum lebih besar array genap";
  } else {
    return "\nSum memiliki nilai sama antara array genap dan array ganjil";
  }
}
console.log(perbandinganSumArray(array_genap, array_ganjil));

// Function perbandingan average array
function perbandinganAverageArray(array1, array2) {
  let sum_array1 = array1[0];
  let sum_array2 = array2[0];
  let average_array1 = array1[0];
  let average_array2 = array2[0];
  for (let i = 0; i < array1.length; i++) {
    sum_array1 += array1[i];
  }
  average_array1 = sum_array1 / array1.length;
  for (let i = 0; i < array2.length; i++) {
    sum_array2 += array2[i];
  }
  average_array2 = sum_array2 / array2.length;
  if (average_array1 < average_array2) {
    return "\nRata-rata lebih besar array ganjil\n";
  } else if (average_array1 > average_array2) {
    return "\nRata-rata lebih besar array genap\n";
  } else {
    return "\nRata-rata memiliki nilai sama antara array genap dan array ganjil\n";
  }
}
console.log(perbandinganAverageArray(array_genap, array_ganjil));
