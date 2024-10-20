export function hexPad2(value: number) {
  return value.toString(16).padStart(2, "0");
}

export function createElement(
  tag: string,
  classList: string[],
  attributes?: any
) {
  const el = document.createElement(tag);
  if (classList != null) {
    el.classList.add(...classList);
  }
  if (attributes) {
    for (const key in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, key)) {
        el.setAttribute(key, attributes[key]);
      }
    }
  }
  return el;
}

export function attachEvent(
  element: HTMLElement | Window | Document,
  eventName: string,
  eventHandler: any
) {
  element.addEventListener(eventName, eventHandler);
}

export function roundToRange(value: number, min: number, max: number) {
  return Math.min(Math.max(Math.round(value), min), max);
}

export default {
  hexPad2,
  createElement,
  attachEvent,
};
