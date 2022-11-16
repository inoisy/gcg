import { addEvt, cleanEvt, position, leftClick, stopAndPrevent, noop } from '~/utils/event.js';
import { clearSelection } from '~/utils/selection.js';
import { isKeyCode } from '~/utils/key-composition.js';
import { keyCodes } from '~/utils/helpers.js';
/* eslint-disable no-unused-expressions,no-void,sonarjs/no-duplicate-string */

const keyRegex = new RegExp(`^([\\d+]+|${Object.keys(keyCodes).join('|')})$`, 'i');

function shouldEnd(evt, origin) {
  const { top, left } = position(evt);

  return Math.abs(left - origin.left) >= 7 || Math.abs(top - origin.top) >= 7;
}

function destroy(el) {
  const ctx = el.__touchrepeat;
  if (ctx !== undefined) {
    clearTimeout(ctx.timer);

    cleanEvt(ctx, 'main');
    cleanEvt(ctx, 'temp');

    ctx.styleCleanup !== undefined && ctx.styleCleanup();

    delete el.__touchrepeat;
  }
}

export default {
  name: 'touch-repeat',

  bind(el, { modifiers, value, arg }, node) {
    if (el.__touchrepeat !== undefined) {
      destroy(el);
      el.__touchrepeat_destroyed = true;
    }

    const keyboard = Object.keys(modifiers).reduce((acc, key) => {
      if (keyRegex.test(key) === true) {
        const keyCode = isNaN(parseInt(key, 10)) ? keyCodes[key.toLowerCase()] : parseInt(key, 10);
        keyCode >= 0 && acc.push(keyCode);
      }
      return acc;
    }, []);
    const hasTouch = node.context.$device.hasTouch;
    const isMobile = node.context.$device.isMobile;
    // early return, we don't need to do anything
    if (modifiers.mouse !== true && hasTouch !== true && keyboard.length === 0) {
      return;
    }

    const durations =
            typeof arg === 'string' && arg.length > 0 ? arg.split(':').map(val => parseInt(val, 10)) : [0, 600, 300];

    const durationsLast = durations.length - 1;

    const ctx = {
      keyboard,
      handler: value,

      noop,

      mouseStart(evt) {
        if (
          ctx.event === undefined &&
                    typeof ctx.handler === 'function' &&
                    leftClick(evt) === true
        ) {
          addEvt(ctx, 'temp', [
            [document, 'mousemove', 'move', 'passiveCapture'],
            [document, 'click', 'end', 'notPassiveCapture'],
          ]);
          ctx.start(evt, true);
        }
      },

      keyboardStart(evt) {
        if (typeof ctx.handler === 'function' && isKeyCode(evt, keyboard) === true) {
          if (durations[0] === 0 || ctx.event !== undefined) {
            stopAndPrevent(evt);
            el.focus();
            if (ctx.event !== undefined) {
              return;
            }
          }

          addEvt(ctx, 'temp', [
            [document, 'keyup', 'end', 'notPassiveCapture'],
            [document, 'click', 'end', 'notPassiveCapture'],
          ]);
          ctx.start(evt, false, true);
        }
      },

      touchStart(evt) {
        if (evt.target !== undefined && typeof ctx.handler === 'function') {
          const target = evt.target;
          addEvt(ctx, 'temp', [
            [target, 'touchmove', 'move', 'passiveCapture'],
            [target, 'touchcancel', 'end', 'notPassiveCapture'],
            [target, 'touchend', 'end', 'notPassiveCapture'],
          ]);
          ctx.start(evt);
        }
      },

      start(evt, mouseEvent, keyboardEvent) {
        if (keyboardEvent !== true) {
          ctx.origin = position(evt);
        }

        function styleCleanup(withDelay) {
          ctx.styleCleanup = undefined;

          document.documentElement.style.cursor = '';

          const remove = () => {
            document.body.classList.remove('non-selectable');
          };

          if (withDelay === true) {
            clearSelection();
            setTimeout(remove, 10);
          } else {
            remove();
          }
        }

        if (isMobile === true) {
          document.body.classList.add('non-selectable');
          clearSelection();
          ctx.styleCleanup = styleCleanup;
        }

        ctx.event = {
          touch: mouseEvent !== true && keyboardEvent !== true,
          mouse: mouseEvent === true,
          keyboard: keyboardEvent === true,
          startTime: Date.now(),
          repeatCount: 0,
        };

        const fn = () => {
          if (ctx.event === undefined) {
            return;
          }

          if (ctx.event.repeatCount === 0) {
            ctx.event.evt = evt;

            if (keyboardEvent === true) {
              ctx.event.keyCode = evt.keyCode;
            } else {
              ctx.event.position = position(evt);
            }

            if (isMobile !== true) {
              document.documentElement.style.cursor = 'pointer';
              document.body.classList.add('non-selectable');
              clearSelection();
              ctx.styleCleanup = styleCleanup;
            }
          }

          ctx.event.duration = Date.now() - ctx.event.startTime;
          ctx.event.repeatCount += 1;

          ctx.handler(ctx.event);

          const index =
                        durationsLast < ctx.event.repeatCount ? durationsLast : ctx.event.repeatCount;

          ctx.timer = setTimeout(fn, durations[index]);
        };

        if (durations[0] === 0) {
          fn();
        } else {
          ctx.timer = setTimeout(fn, durations[0]);
        }
      },

      move(evt) {
        if (ctx.event !== undefined && shouldEnd(evt, ctx.origin) === true) {
          clearTimeout(ctx.timer);
        }
      },

      end(evt) {
        if (ctx.event === undefined) {
          return;
        }

        ctx.styleCleanup !== undefined && ctx.styleCleanup(true);
        evt !== undefined && ctx.event.repeatCount > 0 && stopAndPrevent(evt);

        cleanEvt(ctx, 'temp');
        clearTimeout(ctx.timer);

        ctx.event = undefined;
      },
    };

    el.__touchrepeat = ctx;

    modifiers.mouse === true &&
            addEvt(ctx, 'main', [
              [
                el,
                'mousedown',
                'mouseStart',
                `passive${modifiers.mouseCapture === true ? 'Capture' : ''}`,
              ],
            ]);

    hasTouch === true &&
            addEvt(ctx, 'main', [
              [
                el,
                'touchstart',
                'touchStart',
                `passive${modifiers.capture === true ? 'Capture' : ''}`,
              ],
              [el, 'touchend', 'noop', 'notPassiveCapture'],
            ]);

    keyboard.length > 0 &&
            addEvt(ctx, 'main', [
              [
                el,
                'keydown',
                'keyboardStart',
                `notPassive${modifiers.keyCapture === true ? 'Capture' : ''}`,
              ],
            ]);
  },

  update(el, { oldValue, value }) {
    const ctx = el.__touchrepeat;
    if (ctx !== undefined && oldValue !== value) {
      typeof value !== 'function' && ctx.end();
      ctx.handler = value;
    }
  },

  unbind(el) {
    if (el.__touchrepeat_destroyed === undefined) {
      destroy(el);
    } else {
      delete el.__touchrepeat_destroyed;
    }
  },
};
