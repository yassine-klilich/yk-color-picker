function w(n) {
  return n.toString(16).padStart(2, "0");
}
function c(n, t, e) {
  const o = document.createElement(n);
  if (t != null && o.classList.add(...t), e)
    for (const i in e)
      Object.prototype.hasOwnProperty.call(e, i) && o.setAttribute(i, e[i]);
  return o;
}
function l(n, t, e) {
  n.addEventListener(t, e);
}
function p(n, t, e) {
  return Math.min(Math.max(Math.round(n), t), e);
}
const u = {
  parse: function(n) {
    if (n == null)
      throw new Error("YKColorParser:: color is undefined");
    if (typeof n == "string") {
      if (n = n.trim(), /^(rgba?)/i.test(n))
        return this.compileRGB(n);
      if (/^(#)/i.test(n))
        return this.compileHEX(n);
      let t = this.getNamedColor(n.toLowerCase());
      if (t != null) {
        const e = t.split(" "), { h: o, s: i, v: s } = u.RGBtoHSV(
          parseInt(e[0]),
          parseInt(e[1]),
          parseInt(e[2])
        );
        return { h: o, s: i, v: s, a: 1 };
      }
    } else {
      const { r: t, g: e, b: o, a: i } = n;
      if (t >= 0 && t <= 255 && e >= 0 && e <= 255 && o >= 0 && o <= 255 && i >= 0 && i <= 1) {
        const { h: s, s: r, v: a } = u.RGBtoHSV(t, e, o);
        return { h: s, s: r, v: a, a: i };
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
    let t, e, o, i;
    const s = /rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)\s*(\s+(0?(\.\d+)?|1(\.0*)?)\s*)?\)/i;
    if (s.test(n)) {
      const r = n.split(s).filter((g) => !isNaN(parseInt(g)) && g != "" && g != null);
      if (t = parseInt(r[0]), e = parseInt(r[1]), o = parseInt(r[2]), i = parseFloat(r[3]), t > 255)
        throw new RangeError(
          `YKColorParser:: '${n}' --> ${t} has an invalid red color, it must be an interger between 0 and 255`
        );
      if (e > 255)
        throw new RangeError(
          `YKColorParser:: '${n}' --> ${e} has an invalid green color, it must be an interger between 0 and 255`
        );
      if (o > 255)
        throw new RangeError(
          `YKColorParser:: '${n}' --> ${o} has an invalid blue color, it must be an interger between 0 and 255`
        );
      const { h: a, s: d, v: _ } = u.RGBtoHSV(t, e, o);
      return { h: a, s: d, v: _, a: isNaN(i) ? 1 : i };
    }
    throw new SyntaxError(
      `YKColorParser:: '${n}' is an invalid RGB format`
    );
  },
  compileHEX: function(n) {
    const t = u.HEXtoRGBA(n);
    if (t) {
      const { r: e, g: o, b: i, a: s } = t, { h: r, s: a, v: d } = u.RGBtoHSV(e, o, i);
      return { h: r, s: a, v: d, a: s };
    }
    throw new Error(`YKColorParser:: '${n}' is an invalid HEX format`);
  },
  RGBtoHSV: function(n, t, e) {
    n /= 255, t /= 255, e /= 255;
    let o = Math.max(n, t, e), i = Math.min(n, t, e), s = 0, r = 0, a = o, d = o - i;
    if (r = o == 0 ? 0 : d / o, o == i)
      s = 0;
    else {
      switch (o) {
        case n:
          s = (t - e) / d + (t < e ? 6 : 0);
          break;
        case t:
          s = (e - n) / d + 2;
          break;
        case e:
          s = (n - t) / d + 4;
          break;
      }
      s /= 6;
    }
    return s = s * 360, r = r * 100, a = a * 100, { h: s, s: r, v: a };
  },
  HSLtoHSV: function(n, t, e) {
    t /= 100, e /= 100;
    let o = e + t * Math.min(e, 1 - e), i = o == 0 ? 0 : 2 * (1 - e / o);
    return {
      h: n,
      s: p(i * 100, 0, 100),
      v: p(o * 100, 0, 100)
    };
  },
  HSVtoHSL: function(n, t, e) {
    t /= 100, e /= 100;
    let o = (2 - t) * e / 2, i = o !== 0 && o !== 1 ? t * e / (o < 0.5 ? o * 2 : 2 - o * 2) : 0;
    return {
      h: p(n, 0, 360),
      s: p(i * 100, 0, 100),
      l: p(o * 100, 0, 100)
    };
  },
  HEXtoRGBA: function(n) {
    let t = 0, e = 0, o = 0, i = 0;
    if (/^#(([a-f0-9]){3,4}|([a-f0-9]){6}|([a-f0-9]){8})$/i.test(n)) {
      if (n.length < 6) {
        const s = n.split("");
        t = +("0x" + s[1] + s[1]), e = +("0x" + s[2] + s[2]), o = +("0x" + s[3] + s[3]), i = s[4] ? parseFloat(
          (+("0x" + s[4] + s[4]) / 255).toFixed(2)
        ) : 1;
      } else if (n.length < 10) {
        const s = n.split(/([a-f0-9]{2})/i);
        t = +("0x" + s[1]), e = +("0x" + s[3]), o = +("0x" + s[5]), i = s[7] ? parseFloat((+("0x" + s[7]) / 255).toFixed(2)) : 1;
      }
      return { r: t, g: e, b: o, a: i };
    }
  },
  RGBAtoHEX: function(n, t, e, o) {
    return `#${w(p(n, 0, 255))}${w(
      p(t, 0, 255)
    )}${w(p(e, 0, 255))}${o < 1 ? w(Math.round(o * 255)) : ""}`;
  },
  HSVtoRGB: function(n, t, e) {
    n /= 360, t /= 100, e /= 100;
    let o = 0, i = 0, s = 0, r, a, d, _, g;
    switch (r = Math.floor(n * 6), a = n * 6 - r, d = e * (1 - t), _ = e * (1 - a * t), g = e * (1 - (1 - a) * t), r % 6) {
      case 0:
        o = e, i = g, s = d;
        break;
      case 1:
        o = _, i = e, s = d;
        break;
      case 2:
        o = d, i = e, s = g;
        break;
      case 3:
        o = d, i = _, s = e;
        break;
      case 4:
        o = g, i = d, s = e;
        break;
      case 5:
        o = e, i = d, s = _;
        break;
    }
    return {
      r: p(o * 255, 0, 255),
      g: p(i * 255, 0, 255),
      b: p(s * 255, 0, 255)
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
class T {
  constructor(t, e, o, i) {
    this.a = i, this.hsv = { h: t, s: e, v: o }, this.rgb = this.toRGB(), this.hsl = this.toHSL(), this.hex = this.toHEX();
  }
  getRGB() {
    return {
      r: p(this.rgb.r, 0, 255),
      g: p(this.rgb.g, 0, 255),
      b: p(this.rgb.b, 0, 255)
    };
  }
  getHSV() {
    return {
      h: p(this.hsv.h, 0, 360),
      s: p(this.hsv.s, 0, 100),
      v: p(this.hsv.v, 0, 100)
    };
  }
  getHSL() {
    return {
      h: p(this.hsl.h, 0, 360),
      s: p(this.hsl.s, 0, 100),
      l: p(this.hsl.l, 0, 100)
    };
  }
  toRGB() {
    let { h: t, s: e, v: o } = this.hsv;
    return u.HSVtoRGB(t, e, o);
  }
  toHSL() {
    let { h: t, s: e, v: o } = this.hsv;
    return u.HSVtoHSL(t, e, o);
  }
  toHEX() {
    let { r: t, g: e, b: o } = this.toRGB();
    return u.RGBAtoHEX(t, e, o, this.a);
  }
}
var A = /* @__PURE__ */ ((n) => (n.TOP = "t", n.BOTTOM = "b", n.LEFT = "l", n.RIGHT = "r", n))(A || {}), P = /* @__PURE__ */ ((n) => (n.RGB = "rgb", n.HSV = "hsv", n.HSL = "hsl", n.HEX = "hex", n))(P || {});
const h = class h {
  constructor(t) {
    this._isOpen = !1, this._options = h.DEFAULT_OPTIONS, this._color = new T(0, 0, 0, 1), this._dom = {}, this._copyTimeout = null, this._prevColor = null, this._targetKeydownOpen = !1, this._options = h._buildOptions(
      h.DEFAULT_OPTIONS,
      t
    );
    const { target: e, representation: o } = this._options;
    let i = null;
    if (typeof e == "string")
      i = document.querySelector(e);
    else if (e && e.nodeType == Node.ELEMENT_NODE)
      i = e;
    else if (e != null)
      throw new Error(
        "YKColorPicker:: target must be a string or an HTMLElement"
      );
    this._dom.target = i, this._currentRepresentation = o, i && (this._onClickTargetBind = this._onClickTarget.bind(this), l(i, "click", this._onClickTargetBind)), this._initDOM(), this.setColor(this._options.color);
  }
  get options() {
    return this._options;
  }
  get target() {
    return this._dom.target;
  }
  isOpen() {
    return this._isOpen;
  }
  open() {
    this._isOpen = !0, this._prevColor = this.getHEX(), this._options.container ? this._attachToContainer(!0) : this._attachToBody(), this._dom.overlayWrapper.classList.add("yk-overlay-wrapper--open"), this._dom.cursor.focus(), this._options.onOpen && this._options.onOpen(this);
  }
  close() {
    this._dc || (this._prevColor != this.getHEX() && this._options.onChange && this._options.onChange(this), this._detachOverlay(), this._options.onClose && this._options.onClose(this)), this._dc = !1;
  }
  getRGB() {
    return { ...this._color.toRGB(), a: this._color.a };
  }
  getHSV() {
    const { h: t, s: e, v: o } = this._color.getHSV();
    return {
      h: t,
      s: e,
      v: o,
      a: this._color.a
    };
  }
  getHSL() {
    const { h: t, s: e, l: o } = this._color.toHSL();
    return {
      h: t,
      s: e,
      l: o,
      a: this._color.a
    };
  }
  getHEX() {
    return this._color.toHEX();
  }
  updateOptions(t) {
    const e = h._buildOptions(this._options, t);
    this._options = e, t.hasOwnProperty("theme") && this._updateTheme(e.theme), t.hasOwnProperty("representation") && this._updateRepresentation(e.representation), (t.hasOwnProperty("position") || t.hasOwnProperty("positionFallback")) && t.hasOwnProperty("container") == !1 && this._updatePosition(), t.hasOwnProperty("container") && (t.container ? this._attachToContainer(!0) : this._attachToBody()), t.hasOwnProperty("target") && this._updateTarget(t.target), t.hasOwnProperty("color") && t.color && this.setColor(t.color);
  }
  getColor() {
    switch (this._currentRepresentation) {
      case "rgb": {
        const { r: t, g: e, b: o } = this._color.getRGB();
        return {
          r: t,
          g: e,
          b: o,
          a: this._color.a
        };
      }
      case "hsv": {
        const { h: t, s: e, v: o } = this._color.getHSV();
        return {
          h: t,
          s: e,
          v: o,
          a: this._color.a
        };
      }
      case "hsl": {
        const { h: t, s: e, l: o } = this._color.getHSL();
        return {
          h: t,
          s: e,
          l: o,
          a: this._color.a
        };
      }
      case "hex":
        return this.getHEX();
    }
  }
  setColor(t) {
    const { h: e, s: o, v: i, a: s } = u.parse(t);
    this._color = new T(e, o, i, s), this._updateGUI(), this._options.onInput(this);
  }
  _initDOM() {
    const t = c("div", ["yk-overlay-wrapper"]), e = c("div", ["yk-wrapper"]);
    t.appendChild(e), e.appendChild(this._buildPaletteColor()), e.appendChild(this._buildColorSettings()), l(
      t,
      "click",
      (o) => o.stopPropagation()
    ), this._dom.overlayWrapper = t, this._onKeyUpCloseBind = this._onKeyUpClose.bind(this), this._onResizeScrollWindowBind = this._onResizeScrollWindow.bind(this), this._onClickCloseBind = this.close.bind(this), this._options.container ? this._attachToContainer(!1) : document.body.appendChild(this._dom.overlayWrapper), this._options.onInit && this._options.onInit(this);
  }
  _updateGUI() {
    this._updateCursorThumb(), this._updateInputs(), this._updateColorPreview(!1), this._updateHueThumb(), this._updateOpacityThumb();
  }
  _buildPaletteColor() {
    const t = c("div", ["yk-palette-wrapper"]), e = c("div", ["yk-palette"]), o = c("a", ["yk-cursor"], { tabindex: 0 });
    return t.appendChild(e), t.appendChild(o), this._onMouseDownCursorBind = this._onMouseDownCursor.bind(this), this._onMouseUpCursorBind = this._onMouseUpCursor.bind(this), this._onMouseMoveCursorBind = this._onMouseMoveCursor.bind(this), l(t, "pointerdown", this._onMouseDownCursorBind), l(o, "keydown", this._onKeydownCursor.bind(this)), this._dom.palette = e, this._dom.cursor = o, t;
  }
  _buildColorSettings() {
    const t = c("div", ["yk-color-settings"]);
    return t.appendChild(this._buildCopyColor()), t.appendChild(this._buildColorPreview()), t.appendChild(this._buildColorSliders()), t.appendChild(this._buildColorInputs()), t;
  }
  _buildColorInputs() {
    const t = c("div", ["yk-color-model-wrapper"]), e = c("div", ["yk-color-model"]), o = c("button", ["yk-color-model-switch"], {
      type: "button"
    });
    return o.appendChild(
      this._createSVGIcon(
        '<path d="m3.5045 11.431 1.5786-1.5786 3.0256 3.0256 3.0256-3.0256 1.5786 1.5786-4.6042 4.4726zm4.6042-11.313 4.6042 4.4726-1.5786 1.5786-3.0256-3.0256-3.0256 3.0256-1.5786-1.5786z"/>'
      )
    ), t.appendChild(e), t.appendChild(o), l(o, "click", this._onClickInputsSwitch.bind(this)), this._dom.btnSwitch = o, this._dom.inputsWrapper = e, t;
  }
  _buildInput() {
    const { inputsWrapper: t } = this._dom;
    t.innerHTML = "", this._currentRepresentation == "hex" ? t.appendChild(this._buildHEXInput()) : t.appendChild(this._buildQuadrupedInput());
  }
  _buildHEXInput() {
    const t = c("div", ["yk-hex-input"]), e = c("input", ["yk-color-input"], {
      id: "yk-color-input-hex"
    }), o = c("label", ["yk-color-model-label"], {
      for: "yk-color-input-hex"
    });
    return e.setAttribute("type", "text"), o.textContent = "HEX", t.appendChild(e), t.appendChild(o), l(e, "focus", this._onFocusInput.bind(this)), l(e, "keydown", this._onKeyDownInputHEX.bind(this)), l(e, "input", this._onInputHEX.bind(this)), l(e, "change", this._onChangeInputHEX.bind(this)), this._dom.inputHEX = e, t;
  }
  _buildQuadrupedInput() {
    const t = c("div", ["yk-input-wrapper"]), e = c("input", ["yk-color-input"], {
      type: "text",
      inputmode: "numeric",
      id: "yk-color-input-1"
    }), o = c("input", ["yk-color-input"], {
      type: "text",
      inputmode: "numeric",
      id: "yk-color-input-2"
    }), i = c("input", ["yk-color-input"], {
      type: "text",
      inputmode: "numeric",
      id: "yk-color-input-3"
    }), s = c("input", ["yk-color-input"], {
      type: "text",
      inputmode: "numeric",
      id: "yk-color-input-4"
    }), r = c("label", ["yk-color-model-label"], {
      for: "yk-color-input-1"
    }), a = c("label", ["yk-color-model-label"], {
      for: "yk-color-input-2"
    }), d = c("label", ["yk-color-model-label"], {
      for: "yk-color-input-3"
    }), _ = c("label", ["yk-color-model-label"], {
      for: "yk-color-input-4"
    }), g = this._currentRepresentation.toUpperCase();
    return r.textContent = g[0], a.textContent = g[1], d.textContent = g[2], _.textContent = "A", t.appendChild(e), t.appendChild(o), t.appendChild(i), t.appendChild(s), t.appendChild(r), t.appendChild(a), t.appendChild(d), t.appendChild(_), l(e, "focus", this._onFocusInput.bind(this)), l(e, "keydown", this._onKeyDownInputA.bind(this)), l(e, "input", this._onInputA.bind(this)), l(e, "change", this._onChangeInputA.bind(this)), l(o, "focus", this._onFocusInput.bind(this)), l(o, "keydown", this._onKeyDownInputB.bind(this)), l(o, "input", this._onInputB.bind(this)), l(o, "change", this._onChangeInputB.bind(this)), l(i, "focus", this._onFocusInput.bind(this)), l(i, "keydown", this._onKeyDownInputC.bind(this)), l(i, "input", this._onInputC.bind(this)), l(i, "change", this._onChangeInputC.bind(this)), l(s, "keydown", this._onKeyDownAlphaInput.bind(this)), l(s, "input", this._onKeyUpAlphaInput.bind(this)), l(s, "change", this._onChangeAlphaInput.bind(this)), this._dom.inputA = e, this._dom.inputB = o, this._dom.inputC = i, this._dom.inputAlpha = s, t;
  }
  _updateOpacityThumb() {
    const { opacitySlider: t, opacityThumb: e } = this._dom;
    e.style.translate = `${this._color.a * t.offsetWidth}px`;
  }
  _updateHueThumb() {
    const { hueThumb: t, hueSlider: e } = this._dom;
    t.style.translate = `${this._color.hsv.h / 360 * e.offsetWidth}px`;
  }
  _setQuadrupedValue(t, e, o) {
    this._dom.inputA.value = t, this._dom.inputB.value = e, this._dom.inputC.value = o, this._dom.inputAlpha.value = parseFloat(this._color.a.toFixed(2));
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
          const { r: t, g: e, b: o } = this._color.rgb = this._color.toRGB();
          this._setQuadrupedValue(t, e, o);
        }
        break;
      case "hsv":
        {
          const { h: t, s: e, v: o } = this._color.getHSV();
          this._setQuadrupedValue(`${t}°`, `${e}%`, `${o}%`);
        }
        break;
      case "hsl":
        {
          const { h: t, s: e, l: o } = this._color.hsl = this._color.toHSL();
          this._setQuadrupedValue(`${t}°`, `${e}%`, `${o}%`);
        }
        break;
      case "hex":
        this._updateHEXColor(), this._updateHEXInput();
        break;
    }
  }
  _updateColorPreview(t) {
    const e = this._color.a, o = this._color.toHSL(), { palette: i, opacitySlider: s, colorPreview: r } = this._dom, a = `hsl(${o.h}deg 100% 50% / 1)`;
    i.style.backgroundImage = `linear-gradient(180deg, transparent 0%, rgba(0,0,0,1) 100%), linear-gradient(90deg, rgba(255,255,255,1) 0%, ${a} 100%)`;
    const d = `hsl(${o.h}, ${o.s}%, ${o.l}%)`;
    s.style.setProperty(
      "background-image",
      `linear-gradient(90deg, transparent, ${d})`
    ), r.setAttribute("fill", d), r.setAttribute("fill-opacity", e), t == !0 && this._options.onInput(this);
  }
  _updateCursorThumb() {
    const { palette: t, cursor: e } = this._dom, { s: o, v: i } = this._color.getHSV();
    e.style.translate = `${o / 100 * t.offsetWidth}px ${t.offsetHeight - i / 100 * t.offsetHeight}px`;
  }
  _buildCopyColor() {
    const t = c("button", ["yk-clipboard-color"], {
      type: "button"
    });
    return l(t, "click", this._onClickCopyColor.bind(this)), this._dom.copyColor = t, this._attachCopyIcon(), t;
  }
  _attachCopyIcon() {
    const t = '<path d="m1.9695 11.037v-6.7c0-2 1.6-3.7 3.7-3.7h4.3c0.8 0 1.5 0.5 1.7 1.2h-5.6c-1.6 0.1-2.9 1.4-2.9 3.1v7.9c-0.7-0.3-1.2-1-1.2-1.8zm4.3 4.3c-1 0-1.8-0.8-1.8-1.8v-8.6c0-1 0.8-1.8 1.8-1.8h6.1c1 0 1.8 0.8 1.8 1.8v8.6c0 1-0.8 1.8-1.8 1.8zm6.7-1.8v-8.6c0-0.3-0.3-0.6-0.6-0.6h-6.1c-0.3 0-0.6 0.3-0.6 0.6v8.6c0 0.3 0.3 0.6 0.6 0.6h6.1c0.3 0 0.6-0.3 0.6-0.6z"/>';
    this._dom.copyColor.innerHTML = "", this._dom.copyColor.appendChild(this._createSVGIcon(t));
  }
  _attachCheckIcon() {
    const t = '<path d="m13.975 5.3001c0.24929-0.24929 0.16619-0.58168-0.0831-0.83097l-0.66477-0.66477c-0.24929-0.24929-0.58168-0.16619-0.83097 0.083097l-5.5675 6.2322-3.407-3.1577c-0.24929-0.24929-0.58168-0.16619-0.83097 0.083097l-0.66477 0.66477c-0.24929 0.24929-0.16619 0.58168 0.083097 0.83097l4.5703 4.1548c0.24929 0.24929 0.58168 0.16619 0.83097-0.0831z"/>';
    this._dom.copyColor.innerHTML = "", this._dom.copyColor.appendChild(this._createSVGIcon(t));
  }
  _createSVGIcon(t) {
    const e = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    return e.setAttribute("viewBox", "0 0 16 16"), e.setAttribute("width", "16px"), e.setAttribute("height", "16px"), e.innerHTML = t, e;
  }
  _buildColorSliders() {
    const t = c("div", ["yk-sliders"]);
    return t.appendChild(this._buildHueSlider()), t.appendChild(this._buildOpacitySlider()), t;
  }
  _buildHueSlider() {
    const t = c("div", ["yk-hue-slider-wrapper"]), e = c("div", ["yk-hue-slider"]), o = c("div", ["yk-hue-slider-thumb"]);
    return o.setAttribute("tabindex", "0"), t.appendChild(e), t.appendChild(o), this._onMouseDownHueSliderBind = this._onMouseDownHueSlider.bind(this), this._onMouseUpHueSliderBind = this._onMouseUpHueSlider.bind(this), this._onMouseMoveHueSliderBind = this._onMouseMoveHueSlider.bind(this), l(t, "pointerdown", this._onMouseDownHueSliderBind), l(o, "keydown", this._onKeyDownHueSlider.bind(this)), this._dom.hueSlider = e, this._dom.hueThumb = o, t;
  }
  _buildOpacitySlider() {
    const t = c("div", ["yk-opacity-slider-wrapper"]), e = c("div", ["yk-opacity-color"]), o = c("div", ["yk-opacity-slider-thumb"]);
    return o.setAttribute("tabindex", "0"), t.appendChild(e), t.appendChild(o), this._onMouseDownOpacitySliderBind = this._onMouseDownOpacitySlider.bind(this), this._onMouseUpOpacitySliderBind = this._onMouseUpOpacitySlider.bind(this), this._onMouseMoveOpacitySliderBind = this._onMouseMoveOpacitySlider.bind(this), l(
      t,
      "pointerdown",
      this._onMouseDownOpacitySliderBind
    ), l(
      o,
      "keydown",
      this._onKeyDownOpacitySlider.bind(this)
    ), this._dom.opacitySlider = e, this._dom.opacityThumb = o, t;
  }
  _buildColorPreview() {
    const t = c("span", [
      "yk-color-preview-wrapper"
    ]), e = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    e.setAttribute("width", "38"), e.setAttribute("height", "38");
    const o = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    return o.setAttribute("cx", "19"), o.setAttribute("cy", "19"), o.setAttribute("r", "18"), o.classList.add("yk-preview-stroke"), e.innerHTML = '<pattern id="transparent-grid" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse"><path fill="#DBDBDB" d="M0 0h3v3H0z"/><path fill="#fff" d="M3 0h3v3H3z"/><path fill="#DBDBDB" d="M3 3h3v3H3z"/><path fill="#fff" d="M0 3h3v3H0z"/></pattern></defs><circle cx="19" cy="19" r="18" fill="url(#transparent-grid)"/>', e.appendChild(o), t.appendChild(e), this._dom.colorPreview = o, t;
  }
  _rgbUpdateView() {
    this._updateColorPreview(!0), this._updateHueThumb(), this._updateCursorThumb();
  }
  _updateHEXColorSection(t, e, o, i, s, r, a) {
    const d = e.target, { rgb: _, hex: g } = this._color;
    if (o(_[t], i)) {
      _[t] = s(_[t], 1), this._color.hex = g.substring(0, r) + w(p(_[t], 0, 255)) + g.substring(a);
      const { r: k, g: S, b: H } = _;
      this._color.hsv = u.RGBtoHSV(k, S, H), this._rgbUpdateView();
    }
    d.value = this._color.hex, d.setSelectionRange(r, a), e.preventDefault();
  }
  _updateHEXAlphaSection(t, e, o, i) {
    const s = t.target, { hex: r, a } = this._color;
    e(a, o) && (this._color.a = parseFloat(i(a, 0.01).toFixed(2)), s.value = this._color.hex = r.substring(0, 7) + w(p(this._color.a * 255, 0, 255)), this._updateColorPreview(!0), this._updateOpacityThumb()), s.value = this._color.hex, s.setSelectionRange(7, 9), t.preventDefault();
  }
  _updateOpacityValue(t) {
    this._color.a = parseFloat(t.toFixed(2)), this._currentRepresentation == "hex" ? (this._updateHEXColor(), this._updateHEXInput()) : this._dom.inputAlpha.value = this._color.a, this._updateColorPreview(!0);
  }
  _updatePosition() {
    if (this._dom.target != null) {
      if (!h._isTargetInViewport(this._dom.target)) {
        this.close();
        return;
      }
      this._setPositionAxis(this._getPositionAxis());
    }
  }
  _attachToContainer(t) {
    if (!this._options.container)
      throw new Error("YKColorPicker:: container is not defined");
    let e = null;
    if (typeof this._options.container == "string" ? e = document.querySelector(this._options.container) : this._options.container && this._options.container.nodeType == Node.ELEMENT_NODE && (e = this._options.container), !e)
      throw ReferenceError(
        "ColorPicker:: container to set color picker is undefined"
      );
    this._removeWindowEvents();
    const { overlayWrapper: o } = this._dom, i = o.parentElement;
    e.appendChild(o), o.classList.add("yk-overlay-wrapper--static"), this._updateTheme(this._options.theme), this._updateGUI(), t && i != o.parentElement && this._options.onContainerChange && this._options.onContainerChange(this, i);
  }
  _attachToBody() {
    this._removeWindowEvents();
    const { overlayWrapper: t } = this._dom, e = t.parentElement;
    document.body.appendChild(t), t.classList.remove("yk-overlay-wrapper--static"), this._updateTheme(this._options.theme), this._updateGUI(), this._updatePosition(), l(window, "resize", this._onResizeScrollWindowBind), l(window, "scroll", this._onResizeScrollWindowBind), l(document, "click", this._onClickCloseBind), l(document, "keyup", this._onKeyUpCloseBind), e != t.parentElement && this._options.onContainerChange && this._options.onContainerChange(this, e);
  }
  _detachOverlay() {
    var t;
    this._dom.overlayWrapper.classList.remove("yk-overlay-wrapper--open"), this._removeWindowEvents(), this._isOpen = !1, (t = this._dom.target) == null || t.focus();
  }
  _onKeydownCursor(t) {
    if (["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(t.key)) {
      switch (t.preventDefault(), t.stopPropagation(), t.key) {
        case "ArrowUp":
          {
            let e = Math.round(this._color.hsv.v);
            e < 100 && (this._color.hsv.v = e + 1);
          }
          break;
        case "ArrowDown":
          {
            let e = Math.round(this._color.hsv.v);
            e > 0 && (this._color.hsv.v = e - 1);
          }
          break;
        case "ArrowRight":
          {
            let e = Math.round(this._color.hsv.s);
            e < 100 && (this._color.hsv.s = e + 1);
          }
          break;
        case "ArrowLeft":
          {
            let e = Math.round(this._color.hsv.s);
            e > 0 && (this._color.hsv.s = e - 1);
          }
          break;
      }
      this._updateCursorThumb(), this._updateInputsValue(), this._updateColorPreview(!0);
    }
  }
  _onClickTarget(t) {
    t.stopPropagation(), this._targetKeydownOpen = !0, this._isOpen ? this.close() : this.open();
  }
  _onMouseDownCursor(t) {
    this._dc = !0, l(document, "pointermove", this._onMouseMoveCursorBind), l(document, "pointerup", this._onMouseUpCursorBind), this._onMouseMoveCursorBind(t);
  }
  _onMouseUpCursor(t) {
    document.removeEventListener("pointermove", this._onMouseMoveCursorBind), document.removeEventListener("pointerup", this._onMouseUpCursorBind), this._dom.overlayWrapper.contains(t.target) && (this._dc = !1), this._dom.cursor.focus();
  }
  _onMouseMoveCursor(t) {
    const { x: e, y: o } = this._getCursorPosition(t.clientX, t.clientY);
    this._dom.cursor.style.translate = `${e}px ${o}px`;
    const i = this._dom.palette.offsetHeight, s = this._dom.palette.offsetWidth;
    this._color.hsv.s = e / s * 100, this._color.hsv.v = (i - o) / i * 100, this._updateSettingsView();
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
  _onKeyDownAlphaInput(t) {
    const e = t.target, { a: o } = this._color;
    switch (t.key) {
      case "ArrowUp":
        if (o < 1) {
          let i = parseFloat((o + 0.01).toFixed(2));
          i > 1 && (i = 1), e.value = (this._color.a = i).toString(), this._updateColorPreview(!0), this._updateOpacityThumb();
        }
        break;
      case "ArrowDown":
        if (o > 0) {
          let i = parseFloat((o - 0.01).toFixed(2));
          i < 0 && (i = 0), e.value = (this._color.a = i).toString(), this._updateColorPreview(!0), this._updateOpacityThumb();
        }
        break;
      case ".":
        /(\.)/.test(e.value) && t.preventDefault();
        break;
    }
  }
  _onKeyUpAlphaInput(t) {
    const e = t.target;
    if (/^(0(\.\d{1,2})?|(0*)1?)$/.test(e.value) || e.value == "") {
      const o = parseFloat(e.value) || 0;
      !isNaN(o) && o >= 0 && o <= 1 && (this._color.a = o, this._updateColorPreview(!0), this._updateOpacityThumb());
    }
  }
  _onChangeAlphaInput(t) {
    t.target && (t.target.value = this._color.a.toString());
  }
  _onKeyDownInputHEX(t) {
    const e = t.target;
    switch (t.key) {
      case "ArrowUp":
        {
          /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(
            e.value
          ) || (e.value = this._color.hex);
          const o = this._getCaretPosition(e), i = e.value.length;
          i <= 5 ? o < 2 ? this._updateHEXColorSection(
            "r",
            t,
            h._lt,
            255,
            h._add,
            1,
            3
          ) : o < 3 ? this._updateHEXColorSection(
            "g",
            t,
            h._lt,
            255,
            h._add,
            3,
            5
          ) : o <= 4 && i <= 4 || o < 4 ? this._updateHEXColorSection(
            "b",
            t,
            h._lt,
            255,
            h._add,
            5,
            7
          ) : o <= 5 && this._updateHEXAlphaSection(
            t,
            h._lt,
            1,
            h._add
          ) : o < 3 ? this._updateHEXColorSection(
            "r",
            t,
            h._lt,
            255,
            h._add,
            1,
            3
          ) : o < 5 ? this._updateHEXColorSection(
            "g",
            t,
            h._lt,
            255,
            h._add,
            3,
            5
          ) : o <= 7 && i == 7 || o < 7 ? this._updateHEXColorSection(
            "b",
            t,
            h._lt,
            255,
            h._add,
            5,
            7
          ) : o <= 9 && this._updateHEXAlphaSection(
            t,
            h._lt,
            1,
            h._add
          );
        }
        break;
      case "ArrowDown":
        {
          /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(
            e.value
          ) || (e.value = this._color.hex);
          const o = this._getCaretPosition(e), i = e.value.length;
          i <= 5 ? o < 2 ? this._updateHEXColorSection(
            "r",
            t,
            h._gt,
            0,
            h._sub,
            1,
            3
          ) : o < 3 ? this._updateHEXColorSection(
            "g",
            t,
            h._gt,
            0,
            h._sub,
            3,
            5
          ) : o <= 4 && i <= 4 || o < 4 ? this._updateHEXColorSection(
            "b",
            t,
            h._gt,
            0,
            h._sub,
            5,
            7
          ) : o <= 5 && this._updateHEXAlphaSection(
            t,
            h._gt,
            0,
            h._sub
          ) : o < 3 ? this._updateHEXColorSection(
            "r",
            t,
            h._gt,
            0,
            h._sub,
            1,
            3
          ) : o < 5 ? this._updateHEXColorSection(
            "g",
            t,
            h._gt,
            0,
            h._sub,
            3,
            5
          ) : o <= 7 && i == 7 || o < 7 ? this._updateHEXColorSection(
            "b",
            t,
            h._gt,
            0,
            h._sub,
            5,
            7
          ) : o <= 9 && this._updateHEXAlphaSection(
            t,
            h._gt,
            0,
            h._sub
          );
        }
        break;
    }
  }
  _onInputHEX(t) {
    const e = u.HEXtoRGBA(
      t.target.value.trim()
    );
    if (e != null) {
      const { r: o, g: i, b: s, a: r } = e;
      this._color.a = r, this._color.rgb = { r: o, g: i, b: s }, this._color.hex = u.RGBAtoHEX(o, i, s, r), this._color.hsv = u.RGBtoHSV(o, i, s), this._updateColorPreview(!0), this._updateHueThumb(), this._updateOpacityThumb(), this._updateCursorThumb();
    }
  }
  _onChangeInputHEX(t) {
    t.target.value = this._color.hex;
  }
  _onKeyDownInputA(t) {
    const { target: e, key: o } = t;
    switch (o) {
      case "ArrowUp":
        switch (this._currentRepresentation) {
          case "rgb":
            {
              let { r: i, g: s, b: r } = this._color.getRGB();
              i < 255 && (this._color.rgb.r = parseInt(
                e.value = (++i).toString()
              ), this._color.hsv = u.RGBtoHSV(i, s, r), this._rgbUpdateView());
            }
            break;
          case "hsv":
          case "hsl":
            {
              let { h: i } = this._color.hsv;
              i = p(i, 0, 360), i < 360 && (e.value = ++i + "°", this._color.hsv.h = this._color.hsl.h = i, this._updateColorPreview(!0), this._updateHueThumb());
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
                e.value = (--i).toString()
              ), this._color.hsv = u.RGBtoHSV(i, s, r), this._rgbUpdateView());
            }
            break;
          case "hsv":
          case "hsl":
            {
              let { h: i } = this._color.hsv;
              i = p(i, 0, 360), i > 0 && (e.value = --i + "°", this._color.hsv.h = this._color.hsl.h = i, this._updateColorPreview(!0), this._updateHueThumb());
            }
            break;
        }
        break;
    }
  }
  _onInputA(t) {
    const e = parseInt(t.target.value || "0");
    if (/^(\d{1,3})(°?)$/.test(e.toString()))
      switch (this._currentRepresentation) {
        case "rgb":
          {
            const { g: o, b: i } = this._color.getRGB();
            !isNaN(e) && e >= 0 && e <= 255 && (this._color.rgb.r = e, this._color.hsv = u.RGBtoHSV(e, o, i), this._updateColorPreview(!0), this._updateHueThumb(), this._updateCursorThumb());
          }
          break;
        case "hsv":
        case "hsl":
          !isNaN(e) && e >= 0 && e <= 360 && (this._color.hsv.h = this._color.hsl.h = e, this._updateColorPreview(!0), this._updateHueThumb());
          break;
      }
  }
  _onChangeInputA(t) {
    let e = t.target.value;
    switch (this._currentRepresentation) {
      case "rgb":
        e = p(this._color.rgb.r, 0, 255).toString();
        break;
      case "hsv":
      case "hsl":
        e = `${this._color.getHSV().h}°`;
        break;
    }
    t.target.value = e;
  }
  _onKeyDownInputB(t) {
    const { target: e, key: o } = t;
    switch (o) {
      case "ArrowUp":
        switch (this._currentRepresentation) {
          case "rgb":
            {
              let { r: i, g: s, b: r } = this._color.getRGB();
              s < 255 && (this._color.rgb.g = parseInt(
                e.value = (++s).toString()
              ), this._color.hsv = u.RGBtoHSV(i, s, r), this._rgbUpdateView());
            }
            break;
          case "hsv":
            {
              let { s: i } = this._color.getHSV();
              i < 100 && (e.value = ++i + "%", this._color.hsv.s = i, this._updateColorPreview(!0), this._updateCursorThumb());
            }
            break;
          case "hsl":
            {
              const { h: i, s, l: r } = this._color.getHSL();
              let a = s;
              a < 100 && (++a, this._color.hsl.s = a, this._color.hsv = u.HSLtoHSV(i, a, r), this._color.hsl.l = this.getHSL().l, this._updateColorPreview(!0), this._updateCursorThumb(), e.value = a + "%", this._dom.inputC.value = this._color.hsl.l + "%");
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
                e.value = (--s).toString()
              ), this._color.hsv = u.RGBtoHSV(i, s, r), this._rgbUpdateView());
            }
            break;
          case "hsv":
            {
              let { s: i } = this._color.getHSV();
              i > 0 && (e.value = --i + "%", this._color.hsv.s = i, this._updateColorPreview(!0), this._updateCursorThumb());
            }
            break;
          case "hsl":
            {
              const { h: i, s, l: r } = this._color.getHSL();
              let a = s;
              a > 0 && (--a, this._color.hsl.s = a, this._color.hsv = u.HSLtoHSV(i, a, r), this._color.hsl.l = this.getHSL().l, this._updateColorPreview(!0), this._updateCursorThumb(), e.value = a + "%", this._dom.inputC.value = this._color.hsl.l + "%");
            }
            break;
        }
        break;
    }
  }
  _onInputB(t) {
    const e = parseInt(t.target.value || "0");
    if (/^(\d{1,3})(%?)$/.test(e.toString()))
      switch (this._currentRepresentation) {
        case "rgb":
          {
            const { r: o, b: i } = this._color.getRGB();
            !isNaN(e) && e >= 0 && e <= 255 && (this._color.rgb.g = e, this._color.hsv = u.RGBtoHSV(o, e, i), this._updateColorPreview(!0), this._updateHueThumb(), this._updateCursorThumb());
          }
          break;
        case "hsv":
          !isNaN(e) && e >= 0 && e <= 100 && (this._color.hsv.s = e, this._updateColorPreview(!0), this._updateCursorThumb());
          break;
        case "hsl":
          {
            const { h: o, l: i } = this._color.getHSL();
            !isNaN(e) && e >= 0 && e <= 100 && (this._color.hsv = u.HSLtoHSV(o, e, i), this._color.hsl = this._color.toHSL(), this._updateColorPreview(!0), this._updateCursorThumb(), this._dom.inputC.value = Math.round(this._color.hsl.l) + "%");
          }
          break;
      }
  }
  _onChangeInputB(t) {
    let e = t.target.value;
    switch (this._currentRepresentation) {
      case "rgb":
        e = this._color.getRGB().g;
        break;
      case "hsv":
        e = `${this._color.getHSV().s}%`;
        break;
      case "hsl":
        e = `${this._color.getHSL().s}%`;
        break;
    }
    t.target.value = e;
  }
  _onKeyDownInputC(t) {
    const { target: e, key: o } = t;
    switch (o) {
      case "ArrowUp":
        switch (this._currentRepresentation) {
          case "rgb":
            {
              let { r: i, g: s, b: r } = this._color.getRGB();
              r < 255 && (this._color.rgb.b = parseInt(
                e.value = (++r).toString()
              ), this._color.hsv = u.RGBtoHSV(i, s, r), this._rgbUpdateView());
            }
            break;
          case "hsv":
            {
              let { v: i } = this._color.getHSV();
              i < 100 && (e.value = ++i + "%", this._color.hsv.v = i, this._updateColorPreview(!0), this._updateCursorThumb());
            }
            break;
          case "hsl":
            {
              const { h: i, s, l: r } = this._color.getHSL();
              let a = r;
              a < 100 && (++a, this._color.hsl.l = a, this._color.hsv = u.HSLtoHSV(i, s, a), this._color.hsl.s = this.getHSL().s, this._updateColorPreview(!0), this._updateCursorThumb(), e.value = a + "%", this._dom.inputB.value = this._color.hsl.s + "%");
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
                e.value = (--r).toString()
              ), this._color.hsv = u.RGBtoHSV(i, s, r), this._rgbUpdateView());
            }
            break;
          case "hsv":
            {
              let { v: i } = this._color.getHSV();
              i > 0 && (e.value = --i + "%", this._color.hsv.v = i, this._updateColorPreview(!0), this._updateCursorThumb());
            }
            break;
          case "hsl":
            {
              const { h: i, s, l: r } = this._color.getHSL();
              let a = r;
              r > 0 && (--a, this._color.hsl.l = a, this._color.hsv = u.HSLtoHSV(i, s, a), this._color.hsl.s = this.getHSL().s, this._updateColorPreview(!0), this._updateCursorThumb(), e.value = a + "%", this._dom.inputB.value = this._color.hsl.s + "%");
            }
            break;
        }
        break;
    }
  }
  _onInputC(t) {
    const e = parseInt(t.target.value || "0");
    if (/^(\d{1,3})(%?)$/.test(e.toString()))
      switch (this._currentRepresentation) {
        case "rgb":
          {
            const { r: o, g: i } = this._color.getRGB();
            !isNaN(e) && e >= 0 && e <= 255 && (this._color.rgb.b = e, this._color.hsv = u.RGBtoHSV(o, i, e), this._updateColorPreview(!0), this._updateHueThumb(), this._updateCursorThumb());
          }
          break;
        case "hsv":
          !isNaN(e) && e >= 0 && e <= 100 && (this._color.hsv.v = e, this._updateColorPreview(!0), this._updateCursorThumb());
          break;
        case "hsl":
          {
            const { h: o, s: i } = this._color.getHSL();
            !isNaN(e) && e >= 0 && e <= 100 && (this._color.hsv = u.HSLtoHSV(o, i, e), this._color.hsl = this._color.toHSL(), this._updateColorPreview(!0), this._updateCursorThumb(), this._dom.inputB.value = Math.round(this._color.hsl.s) + "%");
          }
          break;
      }
  }
  _onChangeInputC(t) {
    let e = t.target.value;
    switch (this._currentRepresentation) {
      case "rgb":
        e = this._color.getRGB().b;
        break;
      case "hsv":
        e = `${this._color.getHSV().v}%`;
        break;
      case "hsl":
        e = `${this._color.getHSL().l}%`;
        break;
    }
    t.target.value = e;
  }
  _onClickCopyColor() {
    this._copyTimeout && clearTimeout(this._copyTimeout);
    const t = document.createElement("input");
    t.style.position = "absolute", t.style.left = "-99999px", t.style.top = "-99999px", t.value = this._getColorText() || "", document.body.appendChild(t), t.select();
    try {
      document.execCommand("copy"), this._attachCheckIcon(), this._dom.copyColor.focus(), this._options.onCopy(this), this._copyTimeout = setTimeout(() => {
        this._attachCopyIcon(), this._copyTimeout = null;
      }, 600);
    } catch (e) {
      throw document.body.removeChild(t), new Error(`YKColorPicker:: Failed to copy color.
` + e);
    }
  }
  _onMouseDownHueSlider(t) {
    t.preventDefault(), this._dc = !0, l(document, "pointermove", this._onMouseMoveHueSliderBind), l(document, "pointerup", this._onMouseUpHueSliderBind), this._dom.hueThumb.focus(), this._onMouseMoveHueSliderBind(t);
  }
  _onMouseUpHueSlider(t) {
    document.removeEventListener("pointermove", this._onMouseMoveHueSliderBind), document.removeEventListener("pointerup", this._onMouseUpHueSliderBind), this._dom.overlayWrapper.contains(t.target) && (this._dc = !1);
  }
  _onMouseMoveHueSlider(t) {
    const { hueSlider: e, hueThumb: o } = this._dom, i = e.getBoundingClientRect(), s = i.width;
    let r = t.clientX - i.left;
    r < 0 && (r = 0), r > s && (r = s), this._color.hsv.h = r / i.width * 360, o.style.translate = `${r}px`, this._updateSettingsView();
  }
  _onMouseDownOpacitySlider(t) {
    t.preventDefault(), this._dc = !0, l(document, "pointermove", this._onMouseMoveOpacitySliderBind), l(document, "pointerup", this._onMouseUpOpacitySliderBind), this._dom.opacityThumb.focus(), this._onMouseMoveOpacitySliderBind(t);
  }
  _onMouseUpOpacitySlider(t) {
    document.removeEventListener(
      "pointermove",
      this._onMouseMoveOpacitySliderBind
    ), document.removeEventListener("pointerup", this._onMouseUpOpacitySliderBind), this._dom.overlayWrapper.contains(t.target) && (this._dc = !1);
  }
  _onMouseMoveOpacitySlider(t) {
    const { opacitySlider: e, opacityThumb: o } = this._dom, i = e.getBoundingClientRect(), s = i.width;
    let r = t.clientX - i.left;
    o.focus(), r < 0 && (r = 0), r > s && (r = s), o.style.translate = `${r}px`, this._updateOpacityValue(r / s);
  }
  _onKeyDownHueSlider(t) {
    const { key: e } = t;
    switch (e) {
      case "ArrowUp":
      case "ArrowRight":
        {
          const { hueThumb: o, hueSlider: i } = this._dom;
          let s = parseInt(o.style.translate);
          !isNaN(s) && s < i.offsetWidth && (o.style.translate = `${++s}px`, this._color.hsv.h = s / i.offsetWidth * 360, this._updateSettingsView()), t.preventDefault();
        }
        break;
      case "ArrowDown":
      case "ArrowLeft":
        {
          const { hueThumb: o, hueSlider: i } = this._dom;
          let s = parseInt(o.style.translate);
          !isNaN(s) && s > 0 && (o.style.translate = `${--s}px`, this._color.hsv.h = s / i.offsetWidth * 360, this._updateSettingsView()), t.preventDefault();
        }
        break;
    }
  }
  _onKeyDownOpacitySlider(t) {
    const { key: e } = t;
    switch (e) {
      case "ArrowUp":
      case "ArrowRight":
        {
          const { opacityThumb: o, opacitySlider: i } = this._dom;
          let s = parseInt(o.style.translate);
          !isNaN(s) && s < i.offsetWidth && (o.style.translate = `${++s}px`, this._updateOpacityValue(s / i.offsetWidth)), t.preventDefault();
        }
        break;
      case "ArrowDown":
      case "ArrowLeft":
        {
          const { opacityThumb: o, opacitySlider: i } = this._dom;
          let s = parseInt(o.style.translate);
          !isNaN(s) && s > 0 && (o.style.translate = `${--s}px`, this._updateOpacityValue(s / i.offsetWidth)), t.preventDefault();
        }
        break;
    }
  }
  _onKeyUpClose(t) {
    const { target: e, key: o } = t;
    if (this._targetKeydownOpen && o == "Enter") {
      this._targetKeydownOpen = !1;
      return;
    }
    if (o == "Enter" && this._isOpen && ![this._dom.copyColor, this._dom.btnSwitch].includes(e)) {
      this.close();
      return;
    }
    o == "Escape" && (this._prevColor != this.getHEX() && this.setColor(this._prevColor), this.close());
  }
  _onResizeScrollWindow(t) {
    const { type: e } = t, { target: o } = this._dom;
    if (o == null)
      return;
    const { closeOnScroll: i, closeOnResize: s } = this._options;
    if (e == "scroll" && i || e == "resize" && s)
      this.close();
    else {
      if (!h._isTargetInViewport(o)) {
        this.close();
        return;
      }
      this._setPositionAxis(this._getPositionAxis());
    }
  }
  _removeWindowEvents() {
    window.removeEventListener("resize", this._onResizeScrollWindowBind), window.removeEventListener("scroll", this._onResizeScrollWindowBind), document.removeEventListener("keyup", this._onKeyUpCloseBind), document.removeEventListener("click", this._onClickCloseBind);
  }
  _getCursorPosition(t, e) {
    const o = this._dom.palette.getBoundingClientRect();
    let i = t - o.left, s = e - o.top;
    return i < 0 ? i = 0 : i > o.width && (i = o.width), s < 0 ? s = 0 : s > o.height && (s = o.height), {
      x: i,
      y: s
    };
  }
  _updateHEXColor() {
    const { r: t, g: e, b: o } = this._color.rgb = this._color.toRGB();
    this._color.hex = u.RGBAtoHEX(t, e, o, this._color.a);
  }
  _getColorText() {
    switch (this._currentRepresentation) {
      case "rgb":
        const { r: t, g: e, b: o } = this._color.getRGB();
        return `rgba(${t}, ${e}, ${o}, ${this._color.a})`;
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
  _getCaretPosition(t) {
    let e = t.selectionStart || 0;
    const o = t.value.length;
    return e > o && (e = o), e;
  }
  _getPositionAxis() {
    const { position: t, positionFallback: e } = this._options, { target: o } = this._dom;
    if (!o || !t)
      return { x: 0, y: 0 };
    const i = e || h.DEFAULT_OPTIONS.positionFallback;
    if (!/^[btlr]+$/.test(i) || /(.).*\1/.test(i))
      throw new Error(
        "YKColorPicker:: Invalid positionFallback value. It must only contain the characters 'b' (bottom), 't' (top), 'l' (left), and 'r' (right) without any repetition. Examples of a valid value: 'btrl', 'lr', or just one character for example 'b' to force at one position."
      );
    const s = o.getBoundingClientRect(), r = this._dom.overlayWrapper.getBoundingClientRect(), a = document.documentElement.scrollTop, d = document.documentElement.scrollLeft, _ = 6;
    let g = t;
    const k = h._enoughSpace(
      () => a + s.top,
      () => s.top,
      r.height + _
    ), S = h._enoughSpace(
      () => h._getPageHeight() - (a + s.top + s.height),
      () => window.innerHeight - (s.top + s.height),
      r.height + _
    ), H = h._enoughSpace(
      () => d + s.left,
      () => s.left,
      r.width + _
    ), x = h._enoughSpace(
      () => h._getPageWidth() - (d + s.left + s.width),
      () => window.innerWidth - (s.left + s.width),
      r.width + _
    ), M = {
      t: k,
      b: S,
      l: H,
      r: x
    };
    let f = "";
    for (let v = 0; v < i.length; v++)
      f += i[v] + M[i[v]];
    let y = "", C = "";
    for (let v = 1; v < f.length; v += 2) {
      const R = f[v];
      R == "2" && (y = y + f[v - 1]), R == "1" && (C = C + f[v - 1]);
    }
    y != "" ? y.includes(g) == !1 && (g = y[0]) : C != "" ? C.includes(g) == !1 && (g = C[0]) : g = "b";
    let b = 0, m = 0;
    switch (g) {
      case "t":
        m = s.top - r.height - _, b = s.left + s.width / 2 - r.width / 2;
        break;
      case "b":
        m = s.top + s.height + _, b = s.left + s.width / 2 - r.width / 2;
        break;
      case "l":
        m = s.top + s.height / 2 - r.height / 2, b = s.left - r.width - _;
        break;
      case "r":
        m = s.top + s.height / 2 - r.height / 2, b = s.left + s.width + _;
        break;
    }
    const E = window.innerWidth - document.documentElement.clientWidth, B = window.innerHeight - document.documentElement.clientHeight;
    return window.innerWidth - E < b + r.width && (b -= b + r.width - window.innerWidth + E), window.innerHeight - B < m + r.height && (m -= m + r.height - window.innerHeight + B), b = Math.max(b, 0), m = Math.max(m, 0), {
      x: b,
      y: m
    };
  }
  _setPositionAxis(t) {
    const { x: e, y: o } = t;
    this._dom.overlayWrapper.style.top = `${o}px`, this._dom.overlayWrapper.style.left = `${e}px`;
  }
  _updateRepresentation(t) {
    this._currentRepresentation = t, this._updateInputs(), this._options.onRepresentationChange && this._options.onRepresentationChange(this);
  }
  _updateTheme(t) {
    if (this._dom.overlayWrapper.classList.remove(
      "yk-overlay-wrapper--light",
      "yk-overlay-wrapper--dark"
    ), t !== "light" && t !== "dark")
      throw new Error("YKColorPicker:: Theme must be light or dark");
    this._dom.overlayWrapper.classList.add(`yk-overlay-wrapper--${t}`);
  }
  _updateTarget(t) {
    let e = null;
    if (typeof t == "string")
      e = document.querySelector(t);
    else if (t && t.nodeType == Node.ELEMENT_NODE)
      e = t;
    else if (t != null)
      throw new Error(
        "YKColorPicker:: target must be a string or an HTMLElement"
      );
    const o = this._dom.target;
    o != null && o.removeEventListener("click", this._onClickTargetBind), this._dom.target = e, this._dom.target != null && l(this._dom.target, "click", this._onClickTargetBind), this._updatePosition(), this._options.onTargetChange(this, o);
  }
  static _isTargetInViewport(t) {
    if (!t)
      return !1;
    const e = t.getBoundingClientRect();
    return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
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
  static _enoughSpace(t, e, o) {
    return t() >= o ? e() >= o ? 2 : 1 : 0;
  }
  static _buildOptions(t, e) {
    const o = {}, i = Object.keys(t);
    for (let s = 0; s < i.length; s++) {
      const r = i[s];
      e.hasOwnProperty(r) == !0 ? o[r] = e[r] : o[r] = t[r];
    }
    return o;
  }
  static _lt(t, e) {
    return t < e;
  }
  static _gt(t, e) {
    return t > e;
  }
  static _add(t, e) {
    return t + e;
  }
  static _sub(t, e) {
    return t - e;
  }
};
h.DEFAULT_OPTIONS = {
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
  onTargetChange: () => {
  },
  onContainerChange: () => {
  }
};
let I = h;
export {
  I as YKColorPicker,
  P as YKColorPickerMode,
  A as YKColorPickerPosition
};
//# sourceMappingURL=yk-color-picker.js.map
