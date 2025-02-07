# YKColorPicker

[![Generic badge](https://img.shields.io/badge/npm%20package-v1.0.0%2D%2Dalpha-3FB911.svg)](https://www.npmjs.com/package/ngx-interpolation)

YKColorPicker is a flexible color picker library designed with a strong focus on user experience (UX), including full keyboard interaction support. It provides a seamless way to integrate a customizable color picker into your project, offering various color models such as RGB, HSV, HSL, and HEX.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Methods](#methods)
   - [open()](#open)
   - [close()](#close)
   - [getRGB()](#getrgb)
   - [getHSV()](#gethsv)
   - [getHSL()](#gethsl)
   - [getHEX()](#gethex)
   - [getColor()](#getcolor)
   - [setColor(value: string)](#setcolorvalue-string)
   - [updateOptions(options: YKColorPickerOptions)](#updateoptionsoptions-ykcolorpickeroptions)
5. [Options](#options)
6. [Events](#events)
7. [Example](#example)
8. [References](#references)
   - [YKColorPickerPosition](#ykcolorpickerposition)
   - [YKColorPickerMode](#ykcolorpickermode)
   - [YKColorPickerOptions](#ykcolorpickeroptions)
   - [YKColorPickerPositionFallback](#ykcolorpickerpositionfallback)
9. [License](#license)

## [Features](#features)

- **Multiple Color Formats**: Supports RGB, HSV, HSL, and HEX color formats.
- **Customizable Position**: The color picker can be positioned relative to a target element (top, bottom, left, right) with fallback positions.
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

In your CSS file, import the YKColorPicker styles:

```css
@import url("../node_modules/yk-color-picker/dist/esm2020/style.css");
```

Then import `YKColorPicker` class and initialize the color picker:

```javascript
import { YKColorPicker } from "yk-color-picker";

const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  color: "red",
});
```

## [Methods](#methods)

### open()

Opens the color picker.

Example:

```javascript
const colorPicker = new YKColorPicker({
  target: document.getElementById("color-picker-trigger"),
  color: "red",
});

// Open the color picker
colorPicker.open();
```

### close()

Closes the color picker.

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

Returns the current color in HEX format.

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

Returns the current color in the selected representation format.

Example:

```javascript
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

Sets the color picker to the specified color.

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

Updates the color picker options dynamically.

Example:

```javascript
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

### Options

- **target**: The element or selector that triggers the color picker.
- **container**: The container element or selector where the color picker will be appended. If not defined, the color picker will be appended to the `<body>` by default.
- **position**: The preferred position of the color picker relative to the target. Use `YKColorPickerPosition` to set the position (e.g., `YKColorPickerPosition.TOP`, `YKColorPickerPosition.BOTTOM`, `YKColorPickerPosition.LEFT`, `YKColorPickerPosition.RIGHT`).
- **positionFallback**: The fallback positions if the preferred position is not available. Use a combination of `b` (bottom), `t` (top), `r` (right), and `l` (left) to define the fallback order (e.g., `'btrl'` means try bottom first, then top, then right, then left).
- **representation**: The initial color representation format. Use `YKColorPickerMode` to set the representation (e.g., `YKColorPickerMode.RGB`, `YKColorPickerMode.HSV`, `YKColorPickerMode.HSL`, `YKColorPickerMode.HEX`).
- **color**: The initial color.
- **closeOnScroll**: Whether to close the color picker on scroll.
- **closeOnResize**: Whether to close the color picker on window resize.
- **theme**: The theme of the color picker (light or dark).
- **onInit**: Callback function triggered when the color picker is initialized.
- **onOpen**: Callback function triggered when the color picker is opened.
- **onClose**: Callback function triggered when the color picker is closed.
- **onInput**: Callback function triggered when the color input changes.
- **onChange**: Callback function triggered when the color changes.
- **onCopy**: Callback function triggered when the color is copied to the clipboard.
- **onRepresentationChange**: Callback function triggered when the color representation changes.
- **onTargetChange**: Callback function triggered when the target element changes.
- **onContainerChange**: Callback function triggered when the container changes.

### Events

- **onInit**: Triggered when the color picker is initialized.
- **onOpen**: Triggered when the color picker is opened.
- **onClose**: Triggered when the color picker is closed.
- **onInput**: Triggered when the color input changes.
- **onChange**: Triggered when the color changes.
- **onCopy**: Triggered when the color is copied to the clipboard.
- **onRepresentationChange**: Triggered when the color representation changes.
- **onTargetChange**: Triggered when the target element changes.
- **onContainerChange**: Triggered when the container changes.

## Example

```html
<button id="color-picker-trigger">Open Color Picker</button>

<script>
  const colorPicker = new YKColorPicker({
    target: document.getElementById("color-picker-trigger"),
    container: "#container",
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

An interface defining configuration options for the color picker.

### YKColorPickerPositionFallback:

A type that defines fallback position strategies when the preferred position is unavailable. Examples include `"btrl"`, `"tblr"`, and `"lrtb"`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
