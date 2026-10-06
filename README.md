# YKColorPicker

[![Generic badge](https://img.shields.io/badge/npm%20package-v2.0.1-3FB911.svg)](https://www.npmjs.com/package/yk-color-picker)

YKColorPicker is a flexible color picker library designed with a strong focus on user experience (UX), including full keyboard interaction support. It provides a seamless way to integrate a customizable color picker into your project, offering various color models such as RGB, HSV, HSL, and HEX.

## Live Demo

Check out the live demo [here](https://yassine-klilich.github.io/yk-color-picker/).

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
   - [With a bundler](#with-a-bundler)
   - [Without a bundler](#without-a-bundler)
   - [Upgrading from 2.0.0](#upgrading-from-200)
4. [Keyboard Interaction](#keyboard-interaction)
5. [Methods](#methods)
   - [open()](#open)
   - [close(options?: CloseOptions)](#closeoptions-closeoptions)
   - [isOpen()](#isopen)
   - [getRGB()](#getrgb)
   - [getHSV()](#gethsv)
   - [getHSL()](#gethsl)
   - [getHEX()](#gethex)
   - [getColor()](#getcolor)
   - [setColor(value: string)](#setcolorvalue-string)
   - [updateOptions(options: YKColorPickerOptions)](#updateoptionsoptions-ykcolorpickeroptions)
   - [Properties](#properties)
6. [Options](#options)
7. [Events](#events)
8. [Example](#example)
9. [References](#references)
   - [YKColorPickerPosition](#ykcolorpickerposition)
   - [YKColorPickerMode](#ykcolorpickermode)
   - [YKColorPickerOptions](#ykcolorpickeroptions)
   - [YKColorPickerPositionFallback](#ykcolorpickerpositionfallback)
10. [License](#license)

## [Features](#features)

- **Multiple Color Formats**: Supports RGB, HSV, HSL, and HEX color formats, with alpha.
- **Customizable Position**: The color picker can be positioned relative to a target element (top, bottom, left, right) with fallback positions.
- **Popup or Inline**: Float the picker next to its target, or render it inside a container of your choice.
- **Theme Support**: Light and dark themes are available.
- **Event Handlers**: Provides various event handlers for initialization, opening, closing, input changes, and more.
- **Copy to Clipboard**: Allows users to copy the selected color to the clipboard.
- **Keyboard Interaction**: Full keyboard interaction support for accessibility and ease of use.

## [Installation](#installation)

To install YKColorPicker, you can use npm:

```sh
npm install yk-color-picker
```

## [Usage](#usage)

### With a bundler

Import the YKColorPicker styles once, either from your CSS:

```css
@import "yk-color-picker/style.css";
```

or from your JavaScript:

```javascript
import "yk-color-picker/style.css";
```

Then import the `YKColorPicker` class and initialize the color picker:

```javascript
import { YKColorPicker } from "yk-color-picker";

const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  color: "red",
});
```

### Without a bundler

Load the UMD build from a CDN. It exposes the library as the global `YK`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yk-color-picker@2/dist/umd/style.css" />
<script src="https://cdn.jsdelivr.net/npm/yk-color-picker@2/dist/umd/yk-color-picker.js"></script>

<button id="color-picker-trigger">Pick a color</button>

<script>
  const colorPicker = new YK.YKColorPicker({
    target: document.getElementById("color-picker-trigger"),
    color: "red",
  });
</script>
```

### Upgrading from 2.0.0

The build folders no longer include the version number, so import paths stay the same from one release to the next. If you referenced the files directly, update the paths once:

| 2.0.0 | 2.0.1 and later |
| --- | --- |
| `yk-color-picker/dist/esm2020-2.0.0/style.css` | `yk-color-picker/style.css` |
| `yk-color-picker/dist/umd2020-2.0.0/style.css` | `yk-color-picker/dist/umd/style.css` |
| `yk-color-picker/dist/umd2020-2.0.0/yk-color-picker.js` | `yk-color-picker/dist/umd/yk-color-picker.js` |

## [Keyboard Interaction](#keyboard-interaction)

| Where | Keys | Action |
| --- | --- | --- |
| Target (when it is a button) | <kbd>Enter</kbd> / <kbd>Space</kbd> | Open or close the picker |
| Color area | <kbd>←</kbd> <kbd>→</kbd> | Decrease / increase saturation |
| Color area | <kbd>↓</kbd> <kbd>↑</kbd> | Decrease / increase brightness |
| Hue and opacity sliders | <kbd>←</kbd> <kbd>↓</kbd> / <kbd>→</kbd> <kbd>↑</kbd> | Move the slider |
| Number inputs | <kbd>↑</kbd> <kbd>↓</kbd> | Step the value by 1 (alpha by 0.01) |
| Anywhere in the picker | <kbd>Tab</kbd> | Move between controls |
| Anywhere in the picker | <kbd>Enter</kbd> | Confirm the color and close (on the copy and format buttons, activates the button instead) |
| Anywhere in the picker | <kbd>Esc</kbd> | Revert to the color it had when opened, and close |

When the picker opens, focus moves to the color area so the arrow keys work straight away. When it closes, focus returns to the target.

## [Methods](#methods)

### open()

Opens the color picker. In popup mode, it does nothing if the target is outside the viewport.

Example:

```javascript
const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  color: "red",
});

// Open the color picker
colorPicker.open();
```

### close(options?: CloseOptions)

Closes the color picker and moves focus back to the target. It does nothing if the picker is already closed. The `options` parameter is optional and can be used to customize the close behavior.

Example:

```javascript
const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  color: "red",
});

// Open the color picker
colorPicker.open();

// Close the color picker after 3 seconds
setTimeout(() => {
  colorPicker.close();
}, 3000);
```

```javascript
colorPicker.close({
  preventFocusTarget: true, // Prevent focusing the target element after closing
});
```

### isOpen()

Returns `true` while the color picker is open.

```javascript
colorPicker.open();
console.log(colorPicker.isOpen()); // true
```

### getRGB()

Returns the current color in RGB format.

Example:

```javascript
const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  color: "red",
});

// Get the current color in RGB format
const rgbColor = colorPicker.getRGB();
console.log(rgbColor); // { r: 255, g: 0, b: 0, a: 1 }
```

### getHSV()

Returns the current color in HSV format.

Example:

```javascript
const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  color: "red",
});

// Get the current color in HSV format
const hsvColor = colorPicker.getHSV();
console.log(hsvColor); // { h: 0, s: 100, v: 100, a: 1 }
```

### getHSL()

Returns the current color in HSL format.

Example:

```javascript
const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  color: "red",
});

// Get the current color in HSL format
const hslColor = colorPicker.getHSL();
console.log(hslColor); // { h: 0, s: 100, l: 50, a: 1 }
```

### getHEX()

Returns the current color in HEX format. The alpha channel is appended (`#rrggbbaa`) when the color is not fully opaque.

Example:

```javascript
const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  color: "red",
});

// Get the current color in HEX format
const hexColor = colorPicker.getHEX();
console.log(hexColor); // "#ff0000"
```

### getColor()

Returns the current color in the selected representation format: an object for RGB, HSV and HSL, and a string for HEX.

Example:

```javascript
import { YKColorPicker, YKColorPickerMode } from "yk-color-picker";

const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  representation: YKColorPickerMode.RGB, // Set representation to RGB
  color: "red",
});

// Get the current color in the selected representation format
const currentColor = colorPicker.getColor();
console.log(currentColor); // { r: 255, g: 0, b: 0, a: 1 }
```

### setColor(value: string)

Sets the color picker to the specified color and triggers `onInput`. Accepted formats:

- HEX with 3, 4, 6 or 8 digits: `"#f00"`, `"#ff000080"`
- `rgb()` / `rgba()`, with commas or spaces: `"rgb(255, 0, 0)"`, `"rgba(255, 0, 0, 0.5)"`, `"rgb(255 0 0 / 0.5)"`
- CSS color names: `"red"`, `"tomato"`

It throws an error for any other value.

Example:

```javascript
const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  color: "red",
});

// Set the color to green
colorPicker.setColor("#00FF00");

// Verify the color change
console.log(colorPicker.getHEX()); // "#00ff00"
```

### updateOptions(options: YKColorPickerOptions)

Updates the color picker options dynamically. Only the options you pass are changed.

Example:

```javascript
import { YKColorPicker, YKColorPickerMode } from "yk-color-picker";

const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  color: "red",
});

// Update options to change the theme and representation
colorPicker.updateOptions({
  theme: "dark",
  representation: YKColorPickerMode.HEX,
  color: "#0000FF", // Change color to blue
});

// Verify the updated options
console.log(colorPicker.getHEX()); // "#0000ff"
```

### Properties

- **options** (read-only): The current options, including defaults for anything you did not set.
- **target** (read-only): The current target element, or `null`.

## [Options](#options)

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | `HTMLElement \| string \| null` | `null` | The element, or a CSS selector for it, that opens and closes the picker when clicked. |
| `container` | `HTMLElement \| string \| null` | `null` | Renders the picker inline inside this element (or selector). When `null`, the picker is a popup appended to `<body>` and positioned next to the target. |
| `position` | `YKColorPickerPosition` | `"b"` | Preferred popup position relative to the target: `"t"`, `"b"`, `"l"` or `"r"`. |
| `positionFallback` | `YKColorPickerPositionFallback` | `"btrl"` | Positions to try, in order, when the preferred one has no room. Any combination of `b`, `t`, `r` and `l` without repeats; a single letter forces that position. |
| `representation` | `YKColorPickerMode` | `"rgb"` | Initial color format shown in the inputs: `"rgb"`, `"hsv"`, `"hsl"` or `"hex"`. |
| `color` | `string` | `"red"` | Initial color. See [setColor()](#setcolorvalue-string) for accepted formats. |
| `closeOnScroll` | `boolean` | `true` | Close the popup when the page scrolls. When `false`, it follows its target. |
| `closeOnResize` | `boolean` | `false` | Close the popup when the window resizes. When `false`, it is repositioned. |
| `theme` | `"light" \| "dark"` | `"light"` | Color theme of the picker. |

`position`, `positionFallback`, `closeOnScroll` and `closeOnResize` only apply to the popup, not when a `container` is set. Event callbacks are passed as options too; see [Events](#events).

## [Events](#events)

Every callback receives the color picker instance as its first argument.

| Event | Triggered when |
| --- | --- |
| `onInit(instance)` | The picker is created. |
| `onOpen(instance)` | The picker opens. |
| `onClose(instance)` | The picker closes. |
| `onInput(instance)` | The color changes for any reason: dragging, typing, keyboard, `setColor()`, or the initial color. |
| `onChange(instance)` | The picker closes with a different color than it had when it opened. |
| `onCopy(instance)` | The color is copied with the copy button. |
| `onRepresentationChange(instance)` | The color format changes, from the format button or `updateOptions()`. |
| `onTargetChange(instance, previousTarget)` | The target changes through `updateOptions()`. |
| `onContainerChange(instance, previousParent)` | The picker moves between `<body>` and a container through `updateOptions()`. |

## Example

A popup picker with every option and event:

```html
<button id="color-picker-trigger">Open Color Picker</button>

<script type="module">
  import { YKColorPicker, YKColorPickerPosition, YKColorPickerMode } from "yk-color-picker";
  import "yk-color-picker/style.css";

  const colorPicker = new YKColorPicker({
    target: document.getElementById("color-picker-trigger"),
    position: YKColorPickerPosition.BOTTOM, // Use YKColorPickerPosition to set the position
    positionFallback: "btrl", // Fallback positions: 'b' for bottom, 't' for top, 'r' for right, 'l' for left
    representation: YKColorPickerMode.RGB, // Use YKColorPickerMode to set the representation
    color: "red",
    closeOnScroll: true,
    closeOnResize: false,
    theme: "light",
    onInit: (instance) => {
      console.log("Color picker initialized", instance);
    },
    onOpen: (instance) => {
      console.log("Color picker opened", instance);
    },
    onClose: (instance) => {
      console.log("Color picker closed", instance);
    },
    onInput: (instance) => {
      console.log("Color input changed", instance.getColor());
    },
    onChange: (instance) => {
      console.log("Color changed", instance.getColor());
    },
    onCopy: (instance) => {
      console.log("Color copied to clipboard", instance.getColor());
    },
    onRepresentationChange: (instance) => {
      console.log("Color representation changed", instance.getColor());
    },
    onTargetChange: (instance, previousTarget) => {
      console.log("Target changed", instance, previousTarget);
    },
    onContainerChange: (instance, previousParent) => {
      console.log("Container changed", instance, previousParent);
    },
  });
</script>
```

An inline picker rendered inside a container:

```html
<div id="picker-container"></div>

<script type="module">
  import { YKColorPicker } from "yk-color-picker";
  import "yk-color-picker/style.css";

  const colorPicker = new YKColorPicker({
    container: "#picker-container",
    color: "#3b82f6",
  });

  // An inline picker is only visible while open
  colorPicker.open();
</script>
```

## References

### YKColorPickerPosition:

An enumeration defining the possible positions for the color picker relative to the target element. Available values:

- `TOP` (`t`): Positions the picker above the target element.
- `BOTTOM` (`b`): Positions the picker below the target element.
- `LEFT` (`l`): Positions the picker to the left of the target element.
- `RIGHT` (`r`): Positions the picker to the right of the target element.

```javascript
import { YKColorPicker, YKColorPickerPosition } from "yk-color-picker";

const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  position: YKColorPickerPosition.BOTTOM, // Positioning the picker below the target
  color: "#ff0000",
});
```

### YKColorPickerMode:

Specifies the available color representation formats, such as RGB, HSV, HSL, and HEX.

```javascript
import { YKColorPicker, YKColorPickerMode } from "yk-color-picker";

const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  representation: YKColorPickerMode.RGB, // Using RGB color format
  color: "#00ff00",
});
```

### YKColorPickerOptions:

An interface defining configuration options for the color picker. See [Options](#options) and [Events](#events).

### YKColorPickerPositionFallback:

A type that defines fallback position strategies when the preferred position is unavailable. Examples include `"btrl"`, `"tblr"`, and `"lrtb"`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
