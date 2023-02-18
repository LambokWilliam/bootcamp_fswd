const { RumusPersegi, RumusPersegiPanjang } = require('./soal1_module');
console.log(RumusPersegi);
console.log(RumusPersegiPanjang);

// Persegi
const persegi = new RumusPersegi(10);
console.log('Luas Persegi = ' + persegi.luas());
console.log('\nKeliling Persegi = ' + persegi.keliling());

// Persegi Panjang
const persegiPanjang = new RumusPersegiPanjang(10, 5);
console.log('\nLuas Persegi Panjang = ' + persegiPanjang.luas());
console.log('\nKeliling Persegi Panjang = ' + persegiPanjang.keliling());
