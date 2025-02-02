import { roundToRange } from "./utility";
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

  getRGB() {
    return {
      r: roundToRange(this.rgb.r, 0, 255),
      g: roundToRange(this.rgb.g, 0, 255),
      b: roundToRange(this.rgb.b, 0, 255),
    };
  }

  getHSV() {
    return {
      h: roundToRange(this.hsv.h, 0, 360),
      s: roundToRange(this.hsv.s, 0, 100),
      v: roundToRange(this.hsv.v, 0, 100),
    };
  }

  getHSL() {
    return {
      h: roundToRange(this.hsl.h, 0, 360),
      s: roundToRange(this.hsl.s, 0, 100),
      l: roundToRange(this.hsl.l, 0, 100),
    };
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
