import { YKColorParser } from "./yk-color-parser";

/**
 * Color
 */
export class YKColor {
  a: number;
  hsv: { h: number; s: number; v: number };
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  hex: string;

  constructor(h: number, s: number, v: number, a: number) {
    this.a = a;
    this.hsv = { h, s, v };
    this.rgb = this.toRGB();
    this.hsl = this.toHSL();
    this.hex = this.toHEX();
  }

  toRGB() {
    let { h, s, v } = this.hsv;
    return YKColorParser.HSVtoRGB(h, s, v);
  }

  toHSL() {
    let { h, s, v } = this.hsv;
    return YKColorParser.HSVtoHSL(h, s, v);
  }

  toHEX() {
    let { r, g, b } = this.toRGB();
    return YKColorParser.RGBAtoHEX(r, g, b, this.a);
  }
}
