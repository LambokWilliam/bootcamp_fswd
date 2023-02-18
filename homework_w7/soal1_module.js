class RumusPersegi {
  constructor(sisi) {
    this.sisi = sisi;
  }

  luas() {
    return this.sisi * this.sisi;
  }

  keliling() {
    this.keliling = 0;
    for (let i = 0; i < 4; i++) {
      this.keliling += this.sisi;
    }
    return this.keliling;
  }
}

class RumusPersegiPanjang {
  constructor(panjang, lebar) {
    this.panjang = panjang;
    this.lebar = lebar;
  }

  luas() {
    return this.panjang * this.lebar;
  }

  keliling() {
    this.sumPanjang = 0;
    this.sumLebar = 0;
    for (let i = 0; i < 2; i++) {
      this.sumPanjang += this.panjang;
      this.sumLebar += this.lebar;
    }
    return this.sumPanjang + this.sumLebar;
  }
}

module.exports = {
  RumusPersegi,
  RumusPersegiPanjang,
};
