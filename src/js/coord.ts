class Coord {
  i: number;
  j: number;

  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
  }

  plus(coord2: Coord): Coord {
    return new Coord(this.i + coord2.i, this.j + coord2.j);
  }

  equals(coord2: Coord): boolean {
    return this.i === coord2.i && this.j === coord2.j;
  }

  isOpposite(coord2: Coord): boolean {
    return this.i === -1 * coord2.i && this.j === -1 * coord2.j;
  }
}

export default Coord;
