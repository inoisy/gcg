/* eslint-disable no-param-reassign,no-shadow */
/**
 * Returns:
 *  - 'null' if the node is not attached to the DOM
 *  - the root node (HTMLDocument | ShadowRoot) otherwise
 */
export function attachedRoot(node) {
  /* istanbul ignore next */
  if (typeof node.getRootNode !== 'function') {
    // Shadow DOM not supported (IE11), lets find the root of this node
    while (node.parentNode) {
      node = node.parentNode;
    }

    // The root parent is the document if the node is attached to the DOM
    if (node !== document) {
      return null;
    }

    return document;
  }

  const root = node.getRootNode();

  // The composed root node is the document if the node is attached to the DOM
  if (root !== document && root.getRootNode({ composed: true }) !== document) {
    return null;
  }

  return root;
}
export function offset(el) {
  if (el === window) {
    return { top: 0, left: 0 };
  }
  const { top, left } = el.getBoundingClientRect();
  return { top, left };
}

export function style(el, property) {
  return window.getComputedStyle(el).getPropertyValue(property);
}

export function height(el) {
  return el === window ? window.innerHeight : el.getBoundingClientRect().height;
}

export function width(el) {
  return el === window ? window.innerWidth : el.getBoundingClientRect().width;
}

export function css(element, css) {
  const style = element.style;

  Object.keys(css).forEach((prop) => {
    style[prop] = css[prop];
  });
}

export function cssBatch(elements, style) {
  elements.forEach(el => css(el, style));
}

export function ready(fn) {
  if (typeof fn !== 'function') {
    return;
  }

  if (document.readyState !== 'loading') {
    return fn();
  }

  document.addEventListener('DOMContentLoaded', fn, false);
}

// internal
export function childHasFocus(el, focusedEl) {
  if (el === undefined || el.contains(focusedEl) === true) {
    return true;
  }

  for (let next = el.nextElementSibling; next !== null; next = next.nextElementSibling) {
    if (next.contains(focusedEl)) {
      return true;
    }
  }

  return false;
}

// internal
export function getBodyFullscreenElement(isFullscreen, activeEl) {
  return isFullscreen === true
    ? activeEl === document.documentElement || activeEl === null
      ? document.body
      : activeEl
    : document.body;
  // when a video tag enters fullscreen activeEl is null
}
