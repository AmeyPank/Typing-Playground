/**
 * ChartPointDto represents a coordinate pair for chart visualization
 */
export class ChartPointDto {
  constructor(x, y) {
    this.x = x;
    this.y = Number(y) || 0;
  }

  toArray() {
    return [this.x, this.y];
  }
}
