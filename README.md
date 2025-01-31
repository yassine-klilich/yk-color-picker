# YKColorPicker

YKColorPicker is a lightweight and flexible color picker library designed with a strong focus on user experience (UX), including full keyboard interaction support. It provides a seamless way to integrate a customizable color picker into your project, offering various color models such as RGB, HSV, HSL, and HEX.

## Features

- **Multiple Color Formats**: Supports RGB, HSV, HSL, and HEX color formats.
- **Customizable Position**: The color picker can be positioned relative to a target element (top, bottom, left, right) with fallback positions.
- **Theme Support**: Light and dark themes are available.
- **Event Handlers**: Provides various event handlers for initialization, opening, closing, input changes, and more.
- **Copy to Clipboard**: Allows users to copy the selected color to the clipboard.
- **Default Container**: If no container is specified, the color picker will be appended to the `<body>` by default.

## Features

- **Multiple Color Formats**: Supports RGB, HSV, HSL, and HEX color formats.
- **Customizable Position**: The color picker can be positioned relative to a target element (top, bottom, left, right) with fallback positions.
- **Theme Support**: Light and dark themes are available.
- **Event Handlers**: Provides various event handlers for initialization, opening, closing, input changes, and more.
- **Copy to Clipboard**: Allows users to copy the selected color to the clipboard.
- **Default Container**: If no container is specified, the color picker will be appended to the `<body>` by default.

## Installation

To install YKColorPicker, you can use npm:

```sh
npm install yk-color-picker
```

## Usage

### Basic Usage

```javascript
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
  onContainerChange: (instance, previousParent) => {
    console.log("Container changed", instance, previousParent);
  },
});
```

### Methods

- **open()**: Opens the color picker.
- **close()**: Closes the color picker.
- **getRGB()**: Returns the current color in RGB format.
- **getHSV()**: Returns the current color in HSV format.
- **getHSL()**: Returns the current color in HSL format.
- **getHEX()**: Returns the current color in HEX format.
- **getColor()**: Returns the current color in the selected representation format.
- **setColor(value: string)**: Sets the color picker to the specified color.
- **updateOptions(options: YKColorPickerOptions)**: Updates the color picker options.

### Options

- **target**: The element that triggers the color picker.
- **container**: The container element where the color picker will be appended. If not defined, the color picker will be appended to the `<body>` by default.
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
- **onContainerChange**: Callback function triggered when the container changes.

### Events

- **onInit**: Triggered when the color picker is initialized.
- **onOpen**: Triggered when the color picker is opened.
- **onClose**: Triggered when the color picker is closed.
- **onInput**: Triggered when the color input changes.
- **onChange**: Triggered when the color changes.
- **onCopy**: Triggered when the color is copied to the clipboard.
- **onRepresentationChange**: Triggered when the color representation changes.
- **onContainerChange**: Triggered when the container changes.

## Example

```html
<button id="color-picker-trigger">Open Color Picker</button>

<script>
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
    onContainerChange: (instance, previousParent) => {
      console.log("Container changed", instance, previousParent);
    },
  });
</script>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
