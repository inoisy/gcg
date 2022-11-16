import { css } from './dom.js';
/* used by prevent scroll */
export function getScrollPosition(scrollTarget) {
  if (scrollTarget === window) {
    return window.pageYOffset || window.scrollY || document.body.scrollTop || 0;
  }
  return scrollTarget.scrollTop;
}
/* used by prevent scroll */
export function getHorizontalScrollPosition(scrollTarget) {
  if (scrollTarget === window) {
    return window.pageXOffset || window.scrollX || document.body.scrollLeft || 0;
  }
  return scrollTarget.scrollLeft;
}

let size;
export function getScrollbarWidth() {
  if (size !== undefined) {
    return size;
  }

  const inner = document.createElement('p');
  const outer = document.createElement('div');

  css(inner, {
    width: '100%',
    height: '200px',
  });
  css(outer, {
    position: 'absolute',
    top: '0',
    left: '0',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden',
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  const w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  let w2 = inner.offsetWidth;

  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  outer.remove();
  size = w1 - w2;

  return size;
}

/* used by prevent scroll */
export function hasScrollbar(el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return onY
    ? el.scrollHeight > el.clientHeight &&
        (el.classList.contains('scroll') ||
          el.classList.contains('overflow-auto') ||
          ['auto', 'scroll'].includes(window.getComputedStyle(el)['overflow-y']))
    : el.scrollWidth > el.clientWidth &&
        (el.classList.contains('scroll') ||
          el.classList.contains('overflow-auto') ||
          ['auto', 'scroll'].includes(window.getComputedStyle(el)['overflow-x']));
}

export default {
  getScrollPosition,
  getHorizontalScrollPosition,

  getScrollbarWidth,
  hasScrollbar,
};
