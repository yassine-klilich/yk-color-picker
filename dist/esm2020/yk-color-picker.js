function w(n) {
  return n.toString(16).padStart(2, "0");
}
function u(n, e, t) {
  const o = document.createElement(n);
  if (e != null && o.classList.add(...e), t)
    for (const i in t)
      Object.prototype.hasOwnProperty.call(t, i) && o.setAttribute(i, t[i]);
  return o;
}
function l(n, e, t) {
  n.addEventListener(e, t);
}
function d(n, e, t) {
  return Math.min(Math.max(Math.round(n), e), t);
}
const p = {
  parse: function(n) {
    if (n == null)
      throw new Error("YKColorParser:: color is undefined");
    if (typeof n == "string") {
      if (n = n.trim(), /^(rgba?)/i.test(n))
        return this.compileRGB(n);
      if (/^(#)/i.test(n))
        return this.compileHEX(n);
      let e = this.getNamedColor(n.toLowerCase());
      if (e != null) {
        const t = e.split(" "), { h: o, s: i, v: s } = p.RGBtoHSV(
          parseInt(t[0]),
          parseInt(t[1]),
          parseInt(t[2])
        );
        return { h: o, s: i, v: s, a: 1 };
      }
    } else {
      const { r: e, g: t, b: o, a: i } = n;
      if (e >= 0 && e <= 255 && t >= 0 && t <= 255 && o >= 0 && o <= 255 && i >= 0 && i <= 1) {
        const { h: s, s: r, v: h } = p.RGBtoHSV(e, t, o);
        return { h: s, s: r, v: h, a: i };
      }
      throw new Error(
        "YKColorParser:: The provided RGB object has invalid values, please make sure red, green, blue are between 0 and 255 and alpha value is between 0 and 1"
      );
    }
    throw new Error(
      "YKColorParser:: Color is not in RGB or HEX format or a named color"
    );
  },
  compileRGB: function(n) {
    let e, t, o, i;
    const s = /rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)\s*(\s+(0?(\.\d+)?|1(\.0*)?)\s*)?\)/i;
    if (s.test(n)) {
      const r = n.split(s).filter((g) => !isNaN(parseInt(g)) && g != "" && g != null);
      if (e = parseInt(r[0]), t = parseInt(r[1]), o = parseInt(r[2]), i = parseFloat(r[3]), e > 255)
        throw new RangeError(
          `YKColorParser:: '${n}' --> ${e} has an invalid red color, it must be an interger between 0 and 255`
        );
      if (t > 255)
        throw new RangeError(
          `YKColorParser:: '${n}' --> ${t} has an invalid green color, it must be an interger between 0 and 255`
        );
      if (o > 255)
        throw new RangeError(
          `YKColorParser:: '${n}' --> ${o} has an invalid blue color, it must be an interger between 0 and 255`
        );
      const { h, s: c, v: _ } = p.RGBtoHSV(e, t, o);
      return { h, s: c, v: _, a: isNaN(i) ? 1 : i };
    }
    throw new SyntaxError(
      `YKColorParser:: '${n}' is an invalid RGB format`
    );
  },
  compileHEX: function(n) {
    const e = p.HEXtoRGBA(n);
    if (e) {
      const { r: t, g: o, b: i, a: s } = e, { h: r, s: h, v: c } = p.RGBtoHSV(t, o, i);
      return { h: r, s: h, v: c, a: s };
    }
    throw new Error(`YKColorParser:: '${n}' is an invalid HEX format`);
  },
  RGBtoHSV: function(n, e, t) {
    n /= 255, e /= 255, t /= 255;
    let o = Math.max(n, e, t), i = Math.min(n, e, t), s = 0, r = 0, h = o, c = o - i;
    if (r = o == 0 ? 0 : c / o, o == i)
      s = 0;
    else {
      switch (o) {
        case n:
          s = (e - t) / c + (e < t ? 6 : 0);
          break;
        case e:
          s = (t - n) / c + 2;
          break;
        case t:
          s = (n - e) / c + 4;
          break;
      }
      s /= 6;
    }
    return s = s * 360, r = r * 100, h = h * 100, { h: s, s: r, v: h };
  },
  HSLtoHSV: function(n, e, t) {
    e /= 100, t /= 100;
    let o = t + e * Math.min(t, 1 - t), i = o == 0 ? 0 : 2 * (1 - t / o);
    return {
      h: n,
      s: d(i * 100, 0, 100),
      v: d(o * 100, 0, 100)
    };
  },
  HSVtoHSL: function(n, e, t) {
    e /= 100, t /= 100;
    let o = (2 - e) * t / 2, i = o !== 0 && o !== 1 ? e * t / (o < 0.5 ? o * 2 : 2 - o * 2) : 0;
    return {
      h: d(n, 0, 360),
      s: d(i * 100, 0, 100),
      l: d(o * 100, 0, 100)
    };
  },
  HEXtoRGBA: function(n) {
    let e = 0, t = 0, o = 0, i = 0;
    if (/^#(([a-f0-9]){3,4}|([a-f0-9]){6}|([a-f0-9]){8})$/i.test(n)) {
      if (n.length < 6) {
        const s = n.split("");
        e = +("0x" + s[1] + s[1]), t = +("0x" + s[2] + s[2]), o = +("0x" + s[3] + s[3]), i = s[4] ? parseFloat(
          (+("0x" + s[4] + s[4]) / 255).toFixed(2)
        ) : 1;
      } else if (n.length < 10) {
        const s = n.split(/([a-f0-9]{2})/i);
        e = +("0x" + s[1]), t = +("0x" + s[3]), o = +("0x" + s[5]), i = s[7] ? parseFloat((+("0x" + s[7]) / 255).toFixed(2)) : 1;
      }
      return { r: e, g: t, b: o, a: i };
    }
  },
  RGBAtoHEX: function(n, e, t, o) {
    return `#${w(d(n, 0, 255))}${w(
      d(e, 0, 255)
    )}${w(d(t, 0, 255))}${o == 1 ? "" : w(d(o, 0, 1) * 255)}`;
  },
  HSVtoRGB: function(n, e, t) {
    n /= 360, e /= 100, t /= 100;
    let o = 0, i = 0, s = 0, r, h, c, _, g;
    switch (r = Math.floor(n * 6), h = n * 6 - r, c = t * (1 - e), _ = t * (1 - h * e), g = t * (1 - (1 - h) * e), r % 6) {
      case 0:
        o = t, i = g, s = c;
        break;
      case 1:
        o = _, i = t, s = c;
        break;
      case 2:
        o = c, i = t, s = g;
        break;
      case 3:
        o = c, i = _, s = t;
        break;
      case 4:
        o = g, i = c, s = t;
        break;
      case 5:
        o = t, i = c, s = _;
        break;
    }
    return {
      r: d(o * 255, 0, 255),
      g: d(i * 255, 0, 255),
      b: d(s * 255, 0, 255)
    };
  },
  getNamedColor: function(n) {
    return {
      aliceblue: "240 248 255",
      antiquewhite: "250 235 215",
      aqua: "0 255 255",
      aquamarine: "127 255 212",
      azure: "240 255 255",
      beige: "245 245 220",
      bisque: "255 228 196",
      black: "0 0 0",
      blanchedalmond: "255 235 205",
      blue: "0 0 255",
      blueviolet: "138 43 226",
      brown: "165 42 42",
      burlywood: "222 184 135",
      cadetblue: "95 158 160",
      chartreuse: "127 255 0",
      chocolate: "210 105 30",
      coral: "255 127 80",
      cornflowerblue: "100 149 237",
      cornsilk: "255 248 220",
      crimson: "220 20 60",
      cyan: "0 255 255",
      darkblue: "0 0 139",
      darkcyan: "0 139 139",
      darkgoldenrod: "184 134 11",
      darkgray: "169 169 169",
      darkgrey: "169 169 169",
      darkgreen: "0 100 0",
      darkkhaki: "189 183 107",
      darkmagenta: "139 0 139",
      darkolivegreen: "85 107 47",
      darkorange: "255 140 0",
      darkorchid: "153 50 204",
      darkred: "139 0 0",
      darksalmon: "233 150 122",
      darkseagreen: "143 188 143",
      darkslateblue: "72 61 139",
      darkslategray: "47 79 79",
      darkslategrey: "47 79 79",
      darkturquoise: "0 206 209",
      darkviolet: "148 0 211",
      deeppink: "255 20 147",
      deepskyblue: "0 191 255",
      dimgray: "105 105 105",
      dimgrey: "105 105 105",
      dodgerblue: "30 144 255",
      firebrick: "178 34 34",
      floralwhite: "255 250 240",
      forestgreen: "34 139 34",
      fuchsia: "255 0 255",
      gainsboro: "220 220 220",
      ghostwhite: "248 248 255",
      gold: "255 215 0",
      goldenrod: "218 165 32",
      gray: "128 128 128",
      grey: "128 128 128",
      green: "0 128 0",
      greenyellow: "173 255 47",
      honeydew: "240 255 240",
      hotpink: "255 105 180",
      indianred: "205 92 92",
      indigo: "75 0 130",
      ivory: "255 255 240",
      khaki: "240 230 140",
      lavender: "230 230 250",
      lavenderblush: "255 240 245",
      lawngreen: "124 252 0",
      lemonchiffon: "255 250 205",
      lightblue: "173 216 230",
      lightcoral: "240 128 128",
      lightcyan: "224 255 255",
      lightgoldenrodyellow: "250 250 210",
      lightgray: "211 211 211",
      lightgrey: "211 211 211",
      lightgreen: "144 238 144",
      lightpink: "255 182 193",
      lightsalmon: "255 160 122",
      lightseagreen: "32 178 170",
      lightskyblue: "135 206 250",
      lightslategray: "119 136 153",
      lightslategrey: "119 136 153",
      lightsteelblue: "176 196 222",
      lightyellow: "255 255 224",
      lime: "0 255 0",
      limegreen: "50 205 50",
      linen: "250 240 230",
      magenta: "255 0 255",
      maroon: "128 0 0",
      mediumaquamarine: "102 205 170",
      mediumblue: "0 0 205",
      mediumorchid: "186 85 211",
      mediumpurple: "147 112 216",
      mediumseagreen: "60 179 113",
      mediumslateblue: "123 104 238",
      mediumspringgreen: "0 250 154",
      mediumturquoise: "72 209 204",
      mediumvioletred: "199 21 133",
      midnightblue: "25 25 112",
      mintcream: "245 255 250",
      mistyrose: "255 228 225",
      moccasin: "255 228 181",
      navajowhite: "255 222 173",
      navy: "0 0 128",
      oldlace: "253 245 230",
      olive: "128 128 0",
      olivedrab: "107 142 35",
      orange: "255 165 0",
      orangered: "255 69 0",
      orchid: "218 112 214",
      palegoldenrod: "238 232 170",
      palegreen: "152 251 152",
      paleturquoise: "175 238 238",
      palevioletred: "216 112 147",
      papayawhip: "255 239 213",
      peachpuff: "255 218 185",
      peru: "205 133 63",
      pink: "255 192 203",
      plum: "221 160 221",
      powderblue: "176 224 230",
      purple: "128 0 128",
      red: "255 0 0",
      rosybrown: "188 143 143",
      royalblue: "65 105 225",
      saddlebrown: "139 69 19",
      salmon: "250 128 114",
      sandybrown: "244 164 96",
      seagreen: "46 139 87",
      seashell: "255 245 238",
      sienna: "160 82 45",
      silver: "192 192 192",
      skyblue: "135 206 235",
      slateblue: "106 90 205",
      slategray: "112 128 144",
      slategrey: "112 128 144",
      snow: "255 250 250",
      springgreen: "0 255 127",
      steelblue: "70 130 180",
      tan: "210 180 140",
      teal: "0 128 128",
      thistle: "216 191 216",
      tomato: "255 99 71",
      turquoise: "64 224 208",
      violet: "238 130 238",
      wheat: "245 222 179",
      white: "255 255 255",
      whitesmoke: "245 245 245",
      yellow: "255 255 0",
      yellowgreen: "154 205 50"
    }[n];
  }
};
class I {
  constructor(e, t, o, i) {
    this.a = i, this.hsv = { h: e, s: t, v: o }, this.rgb = this.toRGB(), this.hsl = this.toHSL(), this.hex = this.toHEX();
  }
  getRGB() {
    return {
      r: d(this.rgb.r, 0, 255),
      g: d(this.rgb.g, 0, 255),
      b: d(this.rgb.b, 0, 255)
    };
  }
  getHSV() {
    return {
      h: d(this.hsv.h, 0, 360),
      s: d(this.hsv.s, 0, 100),
      v: d(this.hsv.v, 0, 100)
    };
  }
  getHSL() {
    return {
      h: d(this.hsl.h, 0, 360),
      s: d(this.hsl.s, 0, 100),
      l: d(this.hsl.l, 0, 100)
    };
  }
  toRGB() {
    let { h: e, s: t, v: o } = this.hsv;
    return p.HSVtoRGB(e, t, o);
  }
  toHSL() {
    let { h: e, s: t, v: o } = this.hsv;
    return p.HSVtoHSL(e, t, o);
  }
  toHEX() {
    let { r: e, g: t, b: o } = this.toRGB();
    return p.RGBAtoHEX(e, t, o, this.a);
  }
}
var M = /* @__PURE__ */ ((n) => (n.TOP = "t", n.BOTTOM = "b", n.LEFT = "l", n.RIGHT = "r", n))(M || {}), A = /* @__PURE__ */ ((n) => (n.RGB = "rgb", n.HSV = "hsv", n.HSL = "hsl", n.HEX = "hex", n))(A || {});
const a = class a {
  constructor(e) {
    this._isOpen = !1, this._options = a.DEFAULT_OPTIONS, this._color = new I(0, 0, 0, 1), this._dom = {}, this._copyTimeout = null, this._prevColor = null, this._targetKeydownOpen = !1, this._options = a._buildOptions(
      a.DEFAULT_OPTIONS,
      e
    );
    const { target: t, representation: o } = this._options;
    this._dom.target = t, this._currentRepresentation = o, t && (this._onClickTargetBind = this._onClickTarget.bind(this), l(t, "click", this._onClickTargetBind)), this.setColor(this._options.color), this._prevColor = this.getHEX(), this._initDOM();
  }
  isOpen() {
    return this._isOpen;
  }
  open() {
    this._prevColor = this.getHEX(), this._options.container ? this._attachToContainer(!0) : this._attachToBody(), this._dom.cursor.focus(), this._options.onOpen && this._options.onOpen(this);
  }
  close() {
    this._dc || (this._prevColor != this.getHEX() && this._options.onChange && this._options.onChange(this), this._detachOverlay(), this._options.onClose && this._options.onClose(this)), this._dc = !1;
  }
  getRGB() {
    return { ...this._color.toRGB(), a: this._color.a };
  }
  getHSV() {
    const { h: e, s: t, v: o } = this._color.getHSV();
    return {
      h: e,
      s: t,
      v: o,
      a: this._color.a
    };
  }
  getHSL() {
    const { h: e, s: t, l: o } = this._color.toHSL();
    return {
      h: e,
      s: t,
      l: o,
      a: this._color.a
    };
  }
  getHEX() {
    return this._color.toHEX();
  }
  updateOptions(e) {
    const t = a._buildOptions(this._options, e);
    this._options = t;
    const { target: o, representation: i } = this._options;
    i && this._currentRepresentation != i && this._updateRepresentation(i), this._dom.target != o && (this._dom.target != null && this._dom.target.removeEventListener("click", this._onClickTargetBind), this._dom.target = o, this._dom.target != null && this._dom.attachEvent(o, "click", this._onClickTargetBind)), this._isOpen && (this._options.container ? this._attachToContainer(!0) : this._attachToBody());
  }
  getColor() {
    switch (this._currentRepresentation) {
      case "rgb": {
        const { r: e, g: t, b: o } = this._color.getRGB();
        return {
          r: e,
          g: t,
          b: o,
          a: this._color.a
        };
      }
      case "hsv": {
        const { h: e, s: t, v: o } = this._color.getHSV();
        return {
          h: e,
          s: t,
          v: o,
          a: this._color.a
        };
      }
      case "hsl": {
        const { h: e, s: t, l: o } = this._color.getHSL();
        return {
          h: e,
          s: t,
          l: o,
          a: this._color.a
        };
      }
      case "hex":
        return this.getHEX();
    }
  }
  setColor(e) {
    const { h: t, s: o, v: i, a: s } = p.parse(e);
    this._color = new I(t, o, i, s);
  }
  _initDOM() {
    const e = u("div", ["yk-overlay-wrapper"]), t = u("div", ["yk-wrapper"]);
    e.appendChild(t), t.appendChild(this._buildPaletteColor()), t.appendChild(this._buildColorSettings()), l(
      e,
      "click",
      (o) => o.stopPropagation()
    ), this._dom.overlayWrapper = e, this._onKeyUpCloseBind = this._onKeyUpClose.bind(this), this._onResizeScrollWindowBind = this._onResizeScrollWindow.bind(this), this._onClickCloseBind = this.close.bind(this), this._options.container ? this._attachToContainer(!1) : document.body.appendChild(this._dom.overlayWrapper), this._options.onInit && this._options.onInit(this);
  }
  _updateGUI() {
    this._updateCursorThumb(), this._updateInputs(), this._updateColorPreview(!1), this._updateHueThumb(), this._updateOpacityThumb();
  }
  _buildPaletteColor() {
    const e = u("div", ["yk-palette-wrapper"]), t = u("div", ["yk-palette"]), o = u("a", ["yk-cursor"], { tabindex: 0 });
    return e.appendChild(t), e.appendChild(o), this._onMouseDownCursorBind = this._onMouseDownCursor.bind(this), this._onMouseUpCursorBind = this._onMouseUpCursor.bind(this), this._onMouseMoveCursorBind = this._onMouseMoveCursor.bind(this), l(e, "pointerdown", this._onMouseDownCursorBind), l(o, "keydown", this._onKeydownCursor.bind(this)), this._dom.palette = t, this._dom.cursor = o, e;
  }
  _buildColorSettings() {
    const e = u("div", ["yk-color-settings"]);
    return e.appendChild(this._buildCopyColor()), e.appendChild(this._buildColorPreview()), e.appendChild(this._buildColorSliders()), e.appendChild(this._buildColorInputs()), e;
  }
  _buildColorInputs() {
    const e = u("div", ["yk-color-model-wrapper"]), t = u("div", ["yk-color-model"]), o = u("button", ["yk-color-model-switch"], {
      type: "button"
    });
    return o.appendChild(
      this._createSVGIcon(
        '<path d="m3.5045 11.431 1.5786-1.5786 3.0256 3.0256 3.0256-3.0256 1.5786 1.5786-4.6042 4.4726zm4.6042-11.313 4.6042 4.4726-1.5786 1.5786-3.0256-3.0256-3.0256 3.0256-1.5786-1.5786z"/>'
      )
    ), e.appendChild(t), e.appendChild(o), l(o, "click", this._onClickInputsSwitch.bind(this)), this._dom.btnSwitch = o, this._dom.inputsWrapper = t, e;
  }
  _buildInput() {
    const { inputsWrapper: e } = this._dom;
    e.innerHTML = "", this._currentRepresentation == "hex" ? e.appendChild(this._buildHEXInput()) : e.appendChild(this._buildQuadrupedInput());
  }
  _buildHEXInput() {
    const e = u("div", ["yk-hex-input"]), t = u("input", ["yk-color-input"]), o = u("label", ["yk-color-model-label"]);
    return t.setAttribute("type", "text"), o.textContent = "HEX", e.appendChild(t), e.appendChild(o), l(t, "focus", this._onFocusInput.bind(this)), l(t, "keydown", this._onKeyDownInputHEX.bind(this)), l(t, "input", this._onInputHEX.bind(this)), l(t, "change", this._onChangeInputHEX.bind(this)), this._dom.inputHEX = t, e;
  }
  _buildQuadrupedInput() {
    const e = u("div", ["yk-input-wrapper"]), t = u("input", ["yk-color-input"], {
      type: "text",
      inputmode: "numeric"
    }), o = u("input", ["yk-color-input"], {
      type: "text",
      inputmode: "numeric"
    }), i = u("input", ["yk-color-input"], {
      type: "text",
      inputmode: "numeric"
    }), s = u("input", ["yk-color-input"], {
      type: "text",
      inputmode: "numeric"
    }), r = u("label", ["yk-color-model-label"]), h = u("label", ["yk-color-model-label"]), c = u("label", ["yk-color-model-label"]), _ = u("label", ["yk-color-model-label"]), g = this._currentRepresentation.toUpperCase();
    return r.textContent = g[0], h.textContent = g[1], c.textContent = g[2], _.textContent = "A", e.appendChild(t), e.appendChild(o), e.appendChild(i), e.appendChild(s), e.appendChild(r), e.appendChild(h), e.appendChild(c), e.appendChild(_), l(t, "focus", this._onFocusInput.bind(this)), l(t, "keydown", this._onKeyDownInputA.bind(this)), l(t, "input", this._onInputA.bind(this)), l(t, "change", this._onChangeInputA.bind(this)), l(o, "focus", this._onFocusInput.bind(this)), l(o, "keydown", this._onKeyDownInputB.bind(this)), l(o, "input", this._onInputB.bind(this)), l(o, "change", this._onChangeInputB.bind(this)), l(i, "focus", this._onFocusInput.bind(this)), l(i, "keydown", this._onKeyDownInputC.bind(this)), l(i, "input", this._onInputC.bind(this)), l(i, "change", this._onChangeInputC.bind(this)), l(s, "keydown", this._onKeyDownAlphaInput.bind(this)), l(s, "input", this._onKeyUpAlphaInput.bind(this)), l(s, "change", this._onChangeAlphaInput.bind(this)), this._dom.inputA = t, this._dom.inputB = o, this._dom.inputC = i, this._dom.inputAlpha = s, e;
  }
  _updateOpacityThumb() {
    const { opacitySlider: e, opacityThumb: t } = this._dom;
    t.style.translate = `${this._color.a * e.offsetWidth}px`;
  }
  _updateHueThumb() {
    const { hueThumb: e, hueSlider: t } = this._dom;
    e.style.translate = `${this._color.hsv.h / 360 * t.offsetWidth}px`;
  }
  _setQuadrupedValue(e, t, o) {
    this._dom.inputA.value = e, this._dom.inputB.value = t, this._dom.inputC.value = o, this._dom.inputAlpha.value = parseFloat(this._color.a.toFixed(2));
  }
  _updateHEXInput() {
    this._dom.inputHEX.value = this._color.hex;
  }
  _updateSettingsView() {
    this._updateInputsValue(), this._updateColorPreview(!0);
  }
  _updateInputs() {
    this._buildInput(), this._updateInputsValue();
  }
  _updateInputsValue() {
    switch (this._currentRepresentation) {
      case "rgb":
        {
          const { r: e, g: t, b: o } = this._color.rgb = this._color.toRGB();
          this._setQuadrupedValue(e, t, o);
        }
        break;
      case "hsv":
        {
          const { h: e, s: t, v: o } = this._color.getHSV();
          this._setQuadrupedValue(`${e}°`, `${t}%`, `${o}%`);
        }
        break;
      case "hsl":
        {
          const { h: e, s: t, l: o } = this._color.hsl = this._color.toHSL();
          this._setQuadrupedValue(`${e}°`, `${t}%`, `${o}%`);
        }
        break;
      case "hex":
        this._updateHEXColor(), this._updateHEXInput();
        break;
    }
  }
  _updateColorPreview(e) {
    const t = this._color.a, o = this._color.toHSL(), { palette: i, opacitySlider: s, colorPreview: r } = this._dom, h = `hsl(${o.h}deg 100% 50% / 1)`;
    i.style.backgroundImage = `linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 100%), linear-gradient(90deg, rgba(255,255,255,1) 0%, ${h} 100%)`;
    const c = `hsl(${o.h}, ${o.s}%, ${o.l}%)`;
    s.style.setProperty(
      "background-image",
      `linear-gradient(90deg, transparent, ${c})`
    ), r.setAttribute("fill", c), r.setAttribute("fill-opacity", t), e == !0 && this._options.onInput(this);
  }
  _updateCursorThumb() {
    const { palette: e, cursor: t } = this._dom, { s: o, v: i } = this._color.getHSV();
    t.style.translate = `${o / 100 * e.offsetWidth}px ${e.offsetHeight - i / 100 * e.offsetHeight}px`;
  }
  _buildCopyColor() {
    const e = u("button", ["yk-clipboard-color"], {
      type: "button"
    });
    return l(e, "click", this._onClickCopyColor.bind(this)), this._dom.copyColor = e, this._attachCopyIcon(), e;
  }
  _attachCopyIcon() {
    const e = '<path d="m1.9695 11.037v-6.7c0-2 1.6-3.7 3.7-3.7h4.3c0.8 0 1.5 0.5 1.7 1.2h-5.6c-1.6 0.1-2.9 1.4-2.9 3.1v7.9c-0.7-0.3-1.2-1-1.2-1.8zm4.3 4.3c-1 0-1.8-0.8-1.8-1.8v-8.6c0-1 0.8-1.8 1.8-1.8h6.1c1 0 1.8 0.8 1.8 1.8v8.6c0 1-0.8 1.8-1.8 1.8zm6.7-1.8v-8.6c0-0.3-0.3-0.6-0.6-0.6h-6.1c-0.3 0-0.6 0.3-0.6 0.6v8.6c0 0.3 0.3 0.6 0.6 0.6h6.1c0.3 0 0.6-0.3 0.6-0.6z"/>';
    this._dom.copyColor.innerHTML = "", this._dom.copyColor.appendChild(this._createSVGIcon(e));
  }
  _attachCheckIcon() {
    const e = '<path d="m13.975 5.3001c0.24929-0.24929 0.16619-0.58168-0.0831-0.83097l-0.66477-0.66477c-0.24929-0.24929-0.58168-0.16619-0.83097 0.083097l-5.5675 6.2322-3.407-3.1577c-0.24929-0.24929-0.58168-0.16619-0.83097 0.083097l-0.66477 0.66477c-0.24929 0.24929-0.16619 0.58168 0.083097 0.83097l4.5703 4.1548c0.24929 0.24929 0.58168 0.16619 0.83097-0.0831z"/>';
    this._dom.copyColor.innerHTML = "", this._dom.copyColor.appendChild(this._createSVGIcon(e));
  }
  _createSVGIcon(e) {
    const t = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    return t.setAttribute("viewBox", "0 0 16 16"), t.setAttribute("width", "16px"), t.setAttribute("height", "16px"), t.innerHTML = e, t;
  }
  _buildColorSliders() {
    const e = u("div", ["yk-sliders"]);
    return e.appendChild(this._buildHueSlider()), e.appendChild(this._buildOpacitySlider()), e;
  }
  _buildHueSlider() {
    const e = u("div", ["yk-hue-slider-wrapper"]), t = u("div", ["yk-hue-slider"]), o = u("a", ["yk-hue-slider-thumb"]);
    return o.setAttribute("tabindex", "0"), e.appendChild(t), e.appendChild(o), this._onMouseDownHueSliderBind = this._onMouseDownHueSlider.bind(this), this._onMouseUpHueSliderBind = this._onMouseUpHueSlider.bind(this), this._onMouseMoveHueSliderBind = this._onMouseMoveHueSlider.bind(this), l(e, "pointerdown", this._onMouseDownHueSliderBind), l(o, "keydown", this._onKeyDownHueSlider.bind(this)), this._dom.hueSlider = t, this._dom.hueThumb = o, e;
  }
  _buildOpacitySlider() {
    const e = u("div", ["yk-opacity-slider-wrapper"]), t = u("div", ["yk-opacity-color"]), o = u("a", ["yk-opacity-slider-thumb"]);
    return o.setAttribute("tabindex", "0"), e.appendChild(t), e.appendChild(o), this._onMouseDownOpacitySliderBind = this._onMouseDownOpacitySlider.bind(this), this._onMouseUpOpacitySliderBind = this._onMouseUpOpacitySlider.bind(this), this._onMouseMoveOpacitySliderBind = this._onMouseMoveOpacitySlider.bind(this), l(
      e,
      "pointerdown",
      this._onMouseDownOpacitySliderBind
    ), l(
      o,
      "keydown",
      this._onKeyDownOpacitySlider.bind(this)
    ), this._dom.opacitySlider = t, this._dom.opacityThumb = o, e;
  }
  _buildColorPreview() {
    const e = u("span", [
      "yk-color-preview-wrapper"
    ]), t = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    t.setAttribute("width", "38"), t.setAttribute("height", "38");
    const o = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    return o.setAttribute("cx", "19"), o.setAttribute("cy", "19"), o.setAttribute("r", "18"), o.classList.add("yk-preview-stroke"), t.innerHTML = '<pattern id="transparent-grid" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse"><path fill="#DBDBDB" d="M0 0h3v3H0z"/><path fill="#fff" d="M3 0h3v3H3z"/><path fill="#DBDBDB" d="M3 3h3v3H3z"/><path fill="#fff" d="M0 3h3v3H0z"/></pattern></defs><circle cx="19" cy="19" r="18" fill="url(#transparent-grid)"/>', t.appendChild(o), e.appendChild(t), this._dom.colorPreview = o, e;
  }
  _rgbUpdateView() {
    this._updateColorPreview(!0), this._updateHueThumb(), this._updateCursorThumb();
  }
  _updateHEXColorSection(e, t, o, i, s, r, h) {
    const c = t.target, { rgb: _, hex: g } = this._color;
    if (o(_[e], i)) {
      _[e] = s(_[e], 1), this._color.hex = g.substring(0, r) + w(d(_[e], 0, 255)) + g.substring(h);
      const { r: S, g: k, b: H } = _;
      this._color.hsv = p.RGBtoHSV(S, k, H), this._rgbUpdateView();
    }
    c.value = this._color.hex, c.setSelectionRange(r, h), t.preventDefault();
  }
  _updateHEXAlphaSection(e, t, o, i) {
    const s = e.target, { hex: r, a: h } = this._color;
    t(h, o) && (this._color.a = parseFloat(i(h, 0.01).toFixed(2)), s.value = this._color.hex = r.substring(0, 7) + w(d(this._color.a * 255, 0, 255)), this._updateColorPreview(!0), this._updateOpacityThumb()), s.value = this._color.hex, s.setSelectionRange(7, 9), e.preventDefault();
  }
  _updateOpacityValue(e) {
    this._color.a = parseFloat(e.toFixed(2)), this._currentRepresentation == "hex" ? (this._updateHEXColor(), this._updateHEXInput()) : this._dom.inputAlpha.value = this._color.a, this._updateColorPreview(!0);
  }
  _updatePosition() {
    if (this._options.target != null) {
      if (!a._isTargetInViewport(this._options.target)) {
        this.close();
        return;
      }
      this._setPositionAxis(this._getPositionAxis());
    }
  }
  _attachToContainer(e) {
    if (!this._options.container)
      throw new Error("YKColorPicker:: container is not defined");
    let t = null;
    if (typeof this._options.container == "string" ? t = document.getElementById(this._options.container) : t = this._options.container, !t)
      throw ReferenceError(
        "ColorPicker:: container to set color picker is undefined"
      );
    this._removeWindowEvents();
    const { overlayWrapper: o } = this._dom, i = o.parentElement;
    t.appendChild(o), o.className = "", o.classList.add(
      "yk-overlay-wrapper",
      "yk-overlay-wrapper--static",
      "yk-overlay-wrapper--open",
      "yk-overlay-wrapper--" + this._options.theme
    ), this._updateGUI(), this._isOpen = !0, e && i != o.parentElement && this._options.onContainerChange && this._options.onContainerChange(this, i);
  }
  _attachToBody() {
    this._removeWindowEvents();
    const { overlayWrapper: e } = this._dom, t = e.parentElement;
    document.body.appendChild(e), e.className = "", e.classList.add(
      "yk-overlay-wrapper",
      "yk-overlay-wrapper--open",
      "yk-overlay-wrapper--" + this._options.theme
    ), this._updateGUI(), this._updatePosition(), l(window, "resize", this._onResizeScrollWindowBind), l(window, "scroll", this._onResizeScrollWindowBind), l(document, "click", this._onClickCloseBind), l(document, "keyup", this._onKeyUpCloseBind), this._isOpen = !0, t != e.parentElement && this._options.onContainerChange && this._options.onContainerChange(this, t);
  }
  _detachOverlay() {
    var e;
    this._dom.overlayWrapper.classList.remove("yk-overlay-wrapper--open"), this._removeWindowEvents(), this._isOpen = !1, (e = this._options.target) == null || e.focus();
  }
  _onKeydownCursor(e) {
    if (["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(e.key)) {
      switch (e.preventDefault(), e.stopPropagation(), e.key) {
        case "ArrowUp":
          {
            let t = Math.round(this._color.hsv.v);
            t < 100 && (this._color.hsv.v = t + 1);
          }
          break;
        case "ArrowDown":
          {
            let t = Math.round(this._color.hsv.v);
            t > 0 && (this._color.hsv.v = t - 1);
          }
          break;
        case "ArrowRight":
          {
            let t = Math.round(this._color.hsv.s);
            t < 100 && (this._color.hsv.s = t + 1);
          }
          break;
        case "ArrowLeft":
          {
            let t = Math.round(this._color.hsv.s);
            t > 0 && (this._color.hsv.s = t - 1);
          }
          break;
      }
      this._updateCursorThumb(), this._updateInputsValue(), this._updateColorPreview(!0);
    }
  }
  _onClickTarget(e) {
    e.stopPropagation(), this._targetKeydownOpen = !0, this._isOpen ? this.close() : this.open();
  }
  _onMouseDownCursor(e) {
    this._dc = !0, l(document, "pointermove", this._onMouseMoveCursorBind), l(document, "pointerup", this._onMouseUpCursorBind), this._onMouseMoveCursorBind(e);
  }
  _onMouseUpCursor(e) {
    document.removeEventListener("pointermove", this._onMouseMoveCursorBind), document.removeEventListener("pointerup", this._onMouseUpCursorBind), this._dom.overlayWrapper.contains(e.target) && (this._dc = !1), this._dom.cursor.focus();
  }
  _onMouseMoveCursor(e) {
    const { x: t, y: o } = this._getCursorPosition(e.clientX, e.clientY);
    this._dom.cursor.style.translate = `${t}px ${o}px`;
    const i = this._dom.palette.offsetHeight, s = this._dom.palette.offsetWidth;
    this._color.hsv.s = t / s * 100, this._color.hsv.v = (i - o) / i * 100, this._updateSettingsView();
  }
  _onClickInputsSwitch() {
    switch (this._currentRepresentation) {
      case "rgb":
        this._updateRepresentation(
          "hsv"
          /* HSV */
        );
        break;
      case "hsv":
        this._updateRepresentation(
          "hsl"
          /* HSL */
        );
        break;
      case "hsl":
        this._updateRepresentation(
          "hex"
          /* HEX */
        );
        break;
      case "hex":
        this._updateRepresentation(
          "rgb"
          /* RGB */
        );
        break;
    }
  }
  _onFocusInput() {
    switch (this._currentRepresentation) {
      case "rgb":
        this._color.rgb = this._color.getRGB();
        break;
      case "hsv":
        this._color.hsv = this._color.getHSV();
        break;
      case "hsl":
        this._color.hsl = this._color.getHSL();
        break;
      case "hex":
        this._updateHEXColor();
        break;
    }
  }
  _onKeyDownAlphaInput(e) {
    const t = e.target, { a: o } = this._color;
    switch (e.key) {
      case "ArrowUp":
        if (o < 1) {
          let i = parseFloat((o + 0.01).toFixed(2));
          i > 1 && (i = 1), t.value = (this._color.a = i).toString(), this._updateColorPreview(!0), this._updateOpacityThumb();
        }
        break;
      case "ArrowDown":
        if (o > 0) {
          let i = parseFloat((o - 0.01).toFixed(2));
          i < 0 && (i = 0), t.value = (this._color.a = i).toString(), this._updateColorPreview(!0), this._updateOpacityThumb();
        }
        break;
      case ".":
        /(\.)/.test(t.value) && e.preventDefault();
        break;
    }
  }
  _onKeyUpAlphaInput(e) {
    const t = e.target;
    if (/^(0(\.\d{1,2})?|(0*)1?)$/.test(t.value) || t.value == "") {
      const o = parseFloat(t.value) || 0;
      !isNaN(o) && o >= 0 && o <= 1 && (this._color.a = o, this._updateColorPreview(!0), this._updateOpacityThumb());
    }
  }
  _onChangeAlphaInput(e) {
    e.target && (e.target.value = this._color.a.toString());
  }
  _onKeyDownInputHEX(e) {
    const t = e.target;
    switch (e.key) {
      case "ArrowUp":
        {
          /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(
            t.value
          ) || (t.value = this._color.hex);
          const o = this._getCaretPosition(t), i = t.value.length;
          i <= 5 ? o < 2 ? this._updateHEXColorSection(
            "r",
            e,
            a._lt,
            255,
            a._add,
            1,
            3
          ) : o < 3 ? this._updateHEXColorSection(
            "g",
            e,
            a._lt,
            255,
            a._add,
            3,
            5
          ) : o <= 4 && i <= 4 || o < 4 ? this._updateHEXColorSection(
            "b",
            e,
            a._lt,
            255,
            a._add,
            5,
            7
          ) : o <= 5 && this._updateHEXAlphaSection(
            e,
            a._lt,
            1,
            a._add
          ) : o < 3 ? this._updateHEXColorSection(
            "r",
            e,
            a._lt,
            255,
            a._add,
            1,
            3
          ) : o < 5 ? this._updateHEXColorSection(
            "g",
            e,
            a._lt,
            255,
            a._add,
            3,
            5
          ) : o <= 7 && i == 7 || o < 7 ? this._updateHEXColorSection(
            "b",
            e,
            a._lt,
            255,
            a._add,
            5,
            7
          ) : o <= 9 && this._updateHEXAlphaSection(
            e,
            a._lt,
            1,
            a._add
          );
        }
        break;
      case "ArrowDown":
        {
          /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(
            t.value
          ) || (t.value = this._color.hex);
          const o = this._getCaretPosition(t), i = t.value.length;
          i <= 5 ? o < 2 ? this._updateHEXColorSection(
            "r",
            e,
            a._gt,
            0,
            a._sub,
            1,
            3
          ) : o < 3 ? this._updateHEXColorSection(
            "g",
            e,
            a._gt,
            0,
            a._sub,
            3,
            5
          ) : o <= 4 && i <= 4 || o < 4 ? this._updateHEXColorSection(
            "b",
            e,
            a._gt,
            0,
            a._sub,
            5,
            7
          ) : o <= 5 && this._updateHEXAlphaSection(
            e,
            a._gt,
            0,
            a._sub
          ) : o < 3 ? this._updateHEXColorSection(
            "r",
            e,
            a._gt,
            0,
            a._sub,
            1,
            3
          ) : o < 5 ? this._updateHEXColorSection(
            "g",
            e,
            a._gt,
            0,
            a._sub,
            3,
            5
          ) : o <= 7 && i == 7 || o < 7 ? this._updateHEXColorSection(
            "b",
            e,
            a._gt,
            0,
            a._sub,
            5,
            7
          ) : o <= 9 && this._updateHEXAlphaSection(
            e,
            a._gt,
            0,
            a._sub
          );
        }
        break;
    }
  }
  _onInputHEX(e) {
    const t = p.HEXtoRGBA(
      e.target.value.trim()
    );
    if (t != null) {
      const { r: o, g: i, b: s, a: r } = t;
      this._color.a = r, this._color.rgb = { r: o, g: i, b: s }, this._color.hex = p.RGBAtoHEX(o, i, s, r), this._color.hsv = p.RGBtoHSV(o, i, s), this._updateColorPreview(!0), this._updateHueThumb(), this._updateOpacityThumb(), this._updateCursorThumb();
    }
  }
  _onChangeInputHEX(e) {
    e.target.value = this._color.hex;
  }
  _onKeyDownInputA(e) {
    const { target: t, key: o } = e;
    switch (o) {
      case "ArrowUp":
        switch (this._currentRepresentation) {
          case "rgb":
            {
              let { r: i, g: s, b: r } = this._color.getRGB();
              i < 255 && (this._color.rgb.r = parseInt(
                t.value = (++i).toString()
              ), this._color.hsv = p.RGBtoHSV(i, s, r), this._rgbUpdateView());
            }
            break;
          case "hsv":
          case "hsl":
            {
              let { h: i } = this._color.hsv;
              i = d(i, 0, 360), i < 360 && (t.value = ++i + "°", this._color.hsv.h = this._color.hsl.h = i, this._updateColorPreview(!0), this._updateHueThumb());
            }
            break;
        }
        break;
      case "ArrowDown":
        switch (this._currentRepresentation) {
          case "rgb":
            {
              let { r: i, g: s, b: r } = this._color.getRGB();
              i > 0 && (this._color.rgb.r = parseInt(
                t.value = (--i).toString()
              ), this._color.hsv = p.RGBtoHSV(i, s, r), this._rgbUpdateView());
            }
            break;
          case "hsv":
          case "hsl":
            {
              let { h: i } = this._color.hsv;
              i = d(i, 0, 360), i > 0 && (t.value = --i + "°", this._color.hsv.h = this._color.hsl.h = i, this._updateColorPreview(!0), this._updateHueThumb());
            }
            break;
        }
        break;
    }
  }
  _onInputA(e) {
    const t = parseInt(e.target.value || "0");
    if (/^(\d{1,3})(°?)$/.test(t.toString()))
      switch (this._currentRepresentation) {
        case "rgb":
          {
            const { g: o, b: i } = this._color.getRGB();
            !isNaN(t) && t >= 0 && t <= 255 && (this._color.rgb.r = t, this._color.hsv = p.RGBtoHSV(t, o, i), this._updateColorPreview(!0), this._updateHueThumb(), this._updateCursorThumb());
          }
          break;
        case "hsv":
        case "hsl":
          !isNaN(t) && t >= 0 && t <= 360 && (this._color.hsv.h = this._color.hsl.h = t, this._updateColorPreview(!0), this._updateHueThumb());
          break;
      }
  }
  _onChangeInputA(e) {
    let t = e.target.value;
    switch (this._currentRepresentation) {
      case "rgb":
        t = d(this._color.rgb.r, 0, 255).toString();
        break;
      case "hsv":
      case "hsl":
        t = `${this._color.getHSV().h}°`;
        break;
    }
    e.target.value = t;
  }
  _onKeyDownInputB(e) {
    const { target: t, key: o } = e;
    switch (o) {
      case "ArrowUp":
        switch (this._currentRepresentation) {
          case "rgb":
            {
              let { r: i, g: s, b: r } = this._color.getRGB();
              s < 255 && (this._color.rgb.g = parseInt(
                t.value = (++s).toString()
              ), this._color.hsv = p.RGBtoHSV(i, s, r), this._rgbUpdateView());
            }
            break;
          case "hsv":
            {
              let { s: i } = this._color.getHSV();
              i < 100 && (t.value = ++i + "%", this._color.hsv.s = i, this._updateColorPreview(!0), this._updateCursorThumb());
            }
            break;
          case "hsl":
            {
              console.log(this._color.hsv.s);
              const { h: i, s, l: r } = this._color.getHSL();
              let h = s;
              h < 100 && (++h, this._color.hsl.s = h, this._color.hsv = p.HSLtoHSV(i, h, r), this._color.hsl.l = this.getHSL().l, this._updateColorPreview(!0), this._updateCursorThumb(), t.value = h + "%", this._dom.inputC.value = this._color.hsl.l + "%");
            }
            break;
        }
        break;
      case "ArrowDown":
        switch (this._currentRepresentation) {
          case "rgb":
            {
              let { r: i, g: s, b: r } = this._color.getRGB();
              s > 0 && (this._color.rgb.g = parseInt(
                t.value = (--s).toString()
              ), this._color.hsv = p.RGBtoHSV(i, s, r), this._rgbUpdateView());
            }
            break;
          case "hsv":
            {
              let { s: i } = this._color.getHSV();
              i > 0 && (t.value = --i + "%", this._color.hsv.s = i, this._updateColorPreview(!0), this._updateCursorThumb());
            }
            break;
          case "hsl":
            {
              const { h: i, s, l: r } = this._color.getHSL();
              let h = s;
              h > 0 && (--h, this._color.hsl.s = h, this._color.hsv = p.HSLtoHSV(i, h, r), this._color.hsl.l = this.getHSL().l, this._updateColorPreview(!0), this._updateCursorThumb(), t.value = h + "%", this._dom.inputC.value = this._color.hsl.l + "%");
            }
            break;
        }
        break;
    }
  }
  _onInputB(e) {
    const t = parseInt(e.target.value || "0");
    if (/^(\d{1,3})(%?)$/.test(t.toString()))
      switch (this._currentRepresentation) {
        case "rgb":
          {
            const { r: o, b: i } = this._color.getRGB();
            !isNaN(t) && t >= 0 && t <= 255 && (this._color.rgb.g = t, this._color.hsv = p.RGBtoHSV(o, t, i), this._updateColorPreview(!0), this._updateHueThumb(), this._updateCursorThumb());
          }
          break;
        case "hsv":
          !isNaN(t) && t >= 0 && t <= 100 && (this._color.hsv.s = t, this._updateColorPreview(!0), this._updateCursorThumb());
          break;
        case "hsl":
          {
            const { h: o, l: i } = this._color.getHSL();
            !isNaN(t) && t >= 0 && t <= 100 && (this._color.hsv = p.HSLtoHSV(o, t, i), this._color.hsl = this._color.toHSL(), this._updateColorPreview(!0), this._updateCursorThumb(), this._dom.inputC.value = Math.round(this._color.hsl.l) + "%");
          }
          break;
      }
  }
  _onChangeInputB(e) {
    let t = e.target.value;
    switch (this._currentRepresentation) {
      case "rgb":
        t = this._color.getRGB().g;
        break;
      case "hsv":
        t = `${this._color.getHSV().s}%`;
        break;
      case "hsl":
        t = `${this._color.getHSL().s}%`;
        break;
    }
    e.target.value = t;
  }
  _onKeyDownInputC(e) {
    const { target: t, key: o } = e;
    switch (o) {
      case "ArrowUp":
        switch (this._currentRepresentation) {
          case "rgb":
            {
              let { r: i, g: s, b: r } = this._color.getRGB();
              r < 255 && (this._color.rgb.b = parseInt(
                t.value = (++r).toString()
              ), this._color.hsv = p.RGBtoHSV(i, s, r), this._rgbUpdateView());
            }
            break;
          case "hsv":
            {
              let { v: i } = this._color.getHSV();
              i < 100 && (t.value = ++i + "%", this._color.hsv.v = i, this._updateColorPreview(!0), this._updateCursorThumb());
            }
            break;
          case "hsl":
            {
              const { h: i, s, l: r } = this._color.getHSL();
              let h = r;
              h < 100 && (++h, this._color.hsl.l = h, this._color.hsv = p.HSLtoHSV(i, s, h), this._color.hsl.s = this.getHSL().s, this._updateColorPreview(!0), this._updateCursorThumb(), t.value = h + "%", this._dom.inputB.value = this._color.hsl.s + "%");
            }
            break;
        }
        break;
      case "ArrowDown":
        switch (this._currentRepresentation) {
          case "rgb":
            {
              let { r: i, g: s, b: r } = this._color.getRGB();
              r > 0 && (this._color.rgb.b = parseInt(
                t.value = (--r).toString()
              ), this._color.hsv = p.RGBtoHSV(i, s, r), this._rgbUpdateView());
            }
            break;
          case "hsv":
            {
              let { v: i } = this._color.getHSV();
              i > 0 && (t.value = --i + "%", this._color.hsv.v = i, this._updateColorPreview(!0), this._updateCursorThumb());
            }
            break;
          case "hsl":
            {
              const { h: i, s, l: r } = this._color.getHSL();
              let h = r;
              r > 0 && (--h, this._color.hsl.l = h, this._color.hsv = p.HSLtoHSV(i, s, h), this._color.hsl.s = this.getHSL().s, this._updateColorPreview(!0), this._updateCursorThumb(), t.value = h + "%", this._dom.inputB.value = this._color.hsl.s + "%");
            }
            break;
        }
        break;
    }
  }
  _onInputC(e) {
    const t = parseInt(e.target.value || "0");
    if (/^(\d{1,3})(%?)$/.test(t.toString()))
      switch (this._currentRepresentation) {
        case "rgb":
          {
            const { r: o, g: i } = this._color.getRGB();
            !isNaN(t) && t >= 0 && t <= 255 && (this._color.rgb.b = t, this._color.hsv = p.RGBtoHSV(o, i, t), this._updateColorPreview(!0), this._updateHueThumb(), this._updateCursorThumb());
          }
          break;
        case "hsv":
          !isNaN(t) && t >= 0 && t <= 100 && (this._color.hsv.v = t, this._updateColorPreview(!0), this._updateCursorThumb());
          break;
        case "hsl":
          {
            const { h: o, s: i } = this._color.getHSL();
            !isNaN(t) && t >= 0 && t <= 100 && (this._color.hsv = p.HSLtoHSV(o, i, t), this._color.hsl = this._color.toHSL(), this._updateColorPreview(!0), this._updateCursorThumb(), this._dom.inputB.value = Math.round(this._color.hsl.s) + "%");
          }
          break;
      }
  }
  _onChangeInputC(e) {
    let t = e.target.value;
    switch (this._currentRepresentation) {
      case "rgb":
        t = this._color.getRGB().b;
        break;
      case "hsv":
        t = `${this._color.getHSV().v}%`;
        break;
      case "hsl":
        t = `${this._color.getHSL().l}%`;
        break;
    }
    e.target.value = t;
  }
  _onClickCopyColor() {
    this._copyTimeout && clearTimeout(this._copyTimeout);
    const e = document.createElement("input");
    e.style.position = "absolute", e.style.left = "-99999px", e.style.top = "-99999px", e.value = this._getColorText() || "", document.body.appendChild(e), e.select();
    try {
      document.execCommand("copy"), this._attachCheckIcon(), this._dom.copyColor.focus(), this._options.onCopy(this), this._copyTimeout = setTimeout(() => {
        this._attachCopyIcon(), this._copyTimeout = null;
      }, 600);
    } catch (t) {
      throw document.body.removeChild(e), new Error(`YKColorPicker:: Failed to copy color.
` + t);
    }
  }
  _onMouseDownHueSlider(e) {
    e.preventDefault(), this._dc = !0, l(document, "pointermove", this._onMouseMoveHueSliderBind), l(document, "pointerup", this._onMouseUpHueSliderBind), this._dom.hueThumb.focus(), this._onMouseMoveHueSliderBind(e);
  }
  _onMouseUpHueSlider(e) {
    document.removeEventListener("pointermove", this._onMouseMoveHueSliderBind), document.removeEventListener("pointerup", this._onMouseUpHueSliderBind), this._dom.overlayWrapper.contains(e.target) && (this._dc = !1);
  }
  _onMouseMoveHueSlider(e) {
    const { hueSlider: t, hueThumb: o } = this._dom, i = t.getBoundingClientRect(), s = i.width;
    let r = e.clientX - i.left;
    r < 0 && (r = 0), r > s && (r = s), this._color.hsv.h = r / i.width * 360, o.style.translate = `${r}px`, this._updateSettingsView();
  }
  _onMouseDownOpacitySlider(e) {
    e.preventDefault(), this._dc = !0, l(document, "pointermove", this._onMouseMoveOpacitySliderBind), l(document, "pointerup", this._onMouseUpOpacitySliderBind), this._dom.opacityThumb.focus(), this._onMouseMoveOpacitySliderBind(e);
  }
  _onMouseUpOpacitySlider(e) {
    document.removeEventListener(
      "pointermove",
      this._onMouseMoveOpacitySliderBind
    ), document.removeEventListener("pointerup", this._onMouseUpOpacitySliderBind), this._dom.overlayWrapper.contains(e.target) && (this._dc = !1);
  }
  _onMouseMoveOpacitySlider(e) {
    const { opacitySlider: t, opacityThumb: o } = this._dom, i = t.getBoundingClientRect(), s = i.width;
    let r = e.clientX - i.left;
    o.focus(), r < 0 && (r = 0), r > s && (r = s), o.style.translate = `${r}px`, this._updateOpacityValue(r / s);
  }
  _onKeyDownHueSlider(e) {
    const { key: t } = e;
    switch (t) {
      case "ArrowUp":
      case "ArrowRight":
        {
          const { hueThumb: o, hueSlider: i } = this._dom;
          let s = parseInt(o.style.translate);
          !isNaN(s) && s < i.offsetWidth && (o.style.translate = `${++s}px`, this._color.hsv.h = s / i.offsetWidth * 360, this._updateSettingsView()), e.preventDefault();
        }
        break;
      case "ArrowDown":
      case "ArrowLeft":
        {
          const { hueThumb: o, hueSlider: i } = this._dom;
          let s = parseInt(o.style.translate);
          !isNaN(s) && s > 0 && (o.style.translate = `${--s}px`, this._color.hsv.h = s / i.offsetWidth * 360, this._updateSettingsView()), e.preventDefault();
        }
        break;
    }
  }
  _onKeyDownOpacitySlider(e) {
    const { key: t } = e;
    switch (t) {
      case "ArrowUp":
      case "ArrowRight":
        {
          const { opacityThumb: o, opacitySlider: i } = this._dom;
          let s = parseInt(o.style.translate);
          !isNaN(s) && s < i.offsetWidth && (o.style.translate = `${++s}px`, this._updateOpacityValue(s / i.offsetWidth)), e.preventDefault();
        }
        break;
      case "ArrowDown":
      case "ArrowLeft":
        {
          const { opacityThumb: o, opacitySlider: i } = this._dom;
          let s = parseInt(o.style.translate);
          !isNaN(s) && s > 0 && (o.style.translate = `${--s}px`, this._updateOpacityValue(s / i.offsetWidth)), e.preventDefault();
        }
        break;
    }
  }
  _onKeyUpClose(e) {
    const { target: t, key: o } = e;
    if (this._targetKeydownOpen && o == "Enter") {
      this._targetKeydownOpen = !1;
      return;
    }
    if (o == "Enter" && this._isOpen && ![this._dom.copyColor, this._dom.btnSwitch].includes(t)) {
      this.close();
      return;
    }
    o == "Escape" && (this._prevColor != this.getHEX() && (this.setColor(this._prevColor), this._updateGUI(), this._options.onInput(this)), this.close());
  }
  _onResizeScrollWindow(e) {
    const { type: t } = e, { target: o, closeOnScroll: i, closeOnResize: s } = this._options;
    if (t == "scroll" && i || t == "resize" && s)
      this.close();
    else {
      if (o == null)
        return;
      if (!a._isTargetInViewport(o)) {
        this.close();
        return;
      }
      this._setPositionAxis(this._getPositionAxis());
    }
  }
  _removeWindowEvents() {
    window.removeEventListener("resize", this._onResizeScrollWindowBind), window.removeEventListener("scroll", this._onResizeScrollWindowBind), document.removeEventListener("keyup", this._onKeyUpCloseBind), document.removeEventListener("click", this._onClickCloseBind);
  }
  _getCursorPosition(e, t) {
    const o = this._dom.palette.getBoundingClientRect();
    let i = e - o.left, s = t - o.top;
    return i < 0 ? i = 0 : i > o.width && (i = o.width), s < 0 ? s = 0 : s > o.height && (s = o.height), {
      x: i,
      y: s
    };
  }
  _updateHEXColor() {
    const { r: e, g: t, b: o } = this._color.rgb = this._color.toRGB();
    this._color.hex = p.RGBAtoHEX(e, t, o, this._color.a);
  }
  _getColorText() {
    switch (this._currentRepresentation) {
      case "rgb":
        const { r: e, g: t, b: o } = this._color.getRGB();
        return `rgba(${e}, ${t}, ${o}, ${this._color.a})`;
      case "hsv": {
        const { h: i, s, v: r } = this._color.getHSV();
        return `hsva(${i}, ${s}%, ${r}%, ${this._color.a})`;
      }
      case "hsl": {
        const { h: i, s, l: r } = this._color.getHSL();
        return `hsla(${i}, ${s}%, ${r}%, ${this._color.a})`;
      }
      case "hex":
        return this.getHEX();
    }
  }
  _getCaretPosition(e) {
    let t = e.selectionStart || 0;
    const o = e.value.length;
    return t > o && (t = o), t;
  }
  _getPositionAxis() {
    const { target: e, position: t, positionFallback: o } = this._options;
    if (!e || !t || !o)
      return { x: 0, y: 0 };
    const i = e.getBoundingClientRect(), s = this._dom.overlayWrapper.getBoundingClientRect(), r = document.documentElement.scrollTop, h = document.documentElement.scrollLeft, c = 6;
    let _ = t;
    const g = a._enoughSpace(
      () => r + i.top,
      () => i.top,
      s.height + c
    ), S = a._enoughSpace(
      () => a._getPageHeight() - (r + i.top + i.height),
      () => window.innerHeight - (i.top + i.height),
      s.height + c
    ), k = a._enoughSpace(
      () => h + i.left,
      () => i.left,
      s.width + c
    ), H = a._enoughSpace(
      () => a._getPageWidth() - (h + i.left + i.width),
      () => window.innerWidth - (i.left + i.width),
      s.width + c
    ), T = {
      t: g,
      b: S,
      l: k,
      r: H
    };
    let f = "";
    for (let v = 0; v < o.length; v++)
      f += o[v] + T[o[v]];
    let y = "", C = "";
    for (let v = 1; v < f.length; v += 2) {
      const R = f[v];
      R == "2" && (y = y + f[v - 1]), R == "1" && (C = C + f[v - 1]);
    }
    y != "" ? y.includes(_) == !1 && (_ = y[0]) : C != "" ? C.includes(_) == !1 && (_ = C[0]) : _ = "b";
    let b = 0, m = 0;
    switch (_) {
      case "t":
        m = i.top - s.height - c, b = i.left + i.width / 2 - s.width / 2;
        break;
      case "b":
        m = i.top + i.height + c, b = i.left + i.width / 2 - s.width / 2;
        break;
      case "l":
        m = i.top + i.height / 2 - s.height / 2, b = i.left - s.width - c;
        break;
      case "r":
        m = i.top + i.height / 2 - s.height / 2, b = i.left + i.width + c;
        break;
    }
    const B = window.innerWidth - document.documentElement.clientWidth, E = window.innerHeight - document.documentElement.clientHeight;
    return window.innerWidth - B < b + s.width && (b -= b + s.width - window.innerWidth + B), window.innerHeight - E < m + s.height && (m -= m + s.height - window.innerHeight + E), b = Math.max(b, 0), m = Math.max(m, 0), {
      x: b,
      y: m
    };
  }
  _setPositionAxis(e) {
    const { x: t, y: o } = e;
    this._dom.overlayWrapper.style.top = `${o}px`, this._dom.overlayWrapper.style.left = `${t}px`;
  }
  _updateRepresentation(e) {
    this._currentRepresentation = e, this._updateInputs(), this._options.onRepresentationChange && this._options.onRepresentationChange(this);
  }
  static _isTargetInViewport(e) {
    if (!e)
      return !1;
    const t = e.getBoundingClientRect();
    return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
  static _getPageHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  }
  static _getPageWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }
  static _enoughSpace(e, t, o) {
    return e() >= o ? t() >= o ? 2 : 1 : 0;
  }
  static _buildOptions(e, t) {
    const o = {}, i = Object.keys(e);
    for (let s = 0; s < i.length; s++) {
      const r = i[s];
      t.hasOwnProperty(r) == !0 ? o[r] = t[r] : o[r] = e[r];
    }
    return o;
  }
  static _lt(e, t) {
    return e < t;
  }
  static _gt(e, t) {
    return e > t;
  }
  static _add(e, t) {
    return e + t;
  }
  static _sub(e, t) {
    return e - t;
  }
};
a.DEFAULT_OPTIONS = {
  target: null,
  container: null,
  position: "b",
  positionFallback: "btrl",
  representation: "rgb",
  color: "red",
  closeOnScroll: !0,
  closeOnResize: !1,
  theme: "light",
  onInit: () => {
  },
  onOpen: () => {
  },
  onClose: () => {
  },
  onInput: () => {
  },
  onChange: () => {
  },
  onCopy: () => {
  },
  onRepresentationChange: () => {
  },
  onContainerChange: () => {
  }
};
let x = a;
export {
  x as YKColorPicker,
  A as YKColorPickerMode,
  M as YKColorPickerPosition
};
//# sourceMappingURL=yk-color-picker.js.map
