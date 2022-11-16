import { getModifierDirections, shouldStart } from '~/utils/touch.js';
import {
  addEvt,
  cleanEvt,
  position,
  leftClick,
  prevent,
  stop,
  stopAndPrevent,
  noop,
  preventDraggable,
} from '~/utils/event.js';
import { clearSelection } from '~/utils/selection.js';
/* eslint-disable no-unused-expressions,no-void */

function getChanges(evt, ctx, isFinal) {
  const pos = position(evt);
  let dir;
  let distX = pos.left - ctx.event.x;
  let distY = pos.top - ctx.event.y;
  let absX = Math.abs(distX);
  let absY = Math.abs(distY);

  const direction = ctx.direction;

  if (direction.horizontal === true && direction.vertical !== true) {
    dir = distX < 0 ? 'left' : 'right';
  } else if (direction.horizontal !== true && direction.vertical === true) {
    dir = distY < 0 ? 'up' : 'down';
  } else if (direction.up === true && distY < 0) {
    dir = 'up';
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = 'left';
      } else if (direction.right === true && distX > 0) {
        dir = 'right';
      }
    }
  } else if (direction.down === true && distY > 0) {
    dir = 'down';
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = 'left';
      } else if (direction.right === true && distX > 0) {
        dir = 'right';
      }
    }
  } else if (direction.left === true && distX < 0) {
    dir = 'left';
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = 'up';
      } else if (direction.down === true && distY > 0) {
        dir = 'down';
      }
    }
  } else if (direction.right === true && distX > 0) {
    dir = 'right';
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = 'up';
      } else if (direction.down === true && distY > 0) {
        dir = 'down';
      }
    }
  }

  let synthetic = false;

  if (dir === undefined && isFinal === false) {
    if (ctx.event.isFirst === true || ctx.event.lastDir === undefined) {
      return {};
    }

    dir = ctx.event.lastDir;
    synthetic = true;

    if (dir === 'left' || dir === 'right') {
      pos.left -= distX;
      absX = 0;
      distX = 0;
    } else {
      pos.top -= distY;
      absY = 0;
      distY = 0;
    }
  }

  return {
    synthetic,
    payload: {
      evt,
      touch: ctx.event.mouse !== true,
      mouse: ctx.event.mouse === true,
      position: pos,
      direction: dir,
      isFirst: ctx.event.isFirst,
      isFinal: isFinal === true,
      duration: Date.now() - ctx.event.time,
      distance: {
        x: absX,
        y: absY,
      },
      offset: {
        x: distX,
        y: distY,
      },
      delta: {
        x: pos.left - ctx.event.lastX,
        y: pos.top - ctx.event.lastY,
      },
    },
  };
}

function destroy(el) {
  const ctx = el.__touchpan;
  if (ctx !== undefined) {
    // emit the end event when the directive is destroyed while active
    //     this is only needed in TouchPan because the rest of the touch directives do not emit an end event
    //     the condition is also checked in the start of function but we avoid the call
    ctx.event !== undefined && ctx.end();

    cleanEvt(ctx, 'main');
    cleanEvt(ctx, 'temp');

    // client.is.firefox === true && preventDraggable(el, false);
    ctx.isFirefox && preventDraggable(el, false);
    ctx.styleCleanup !== undefined && ctx.styleCleanup();

    delete el.__touchpan;
  }
}

let uid = 0;

export default {
  name: 'touch-pan',

  bind(el, { value, modifiers }, node) {
    if (el.__touchpan !== undefined) {
      destroy(el);
      el.__touchpan_destroyed = true;
    }

    const hasTouch = node.context.$device.hasTouch;
    const isFirefox = node.context.$device.isFirefox;

    // early return, we don't need to do anything
    if (modifiers.mouse !== true && hasTouch !== true) {
      return;
    }

    function handleEvent(evt, mouseEvent) {
      if (modifiers.mouse === true && mouseEvent === true) {
        stopAndPrevent(evt);
      } else {
        modifiers.stop === true && stop(evt);
        modifiers.prevent === true && prevent(evt);
      }
    }

    const ctx = {
      uid: 'qvtp_' + uid++,
      handler: value,
      modifiers,
      direction: getModifierDirections(modifiers),
      hasTouch,
      isFirefox,
      noop,

      mouseStart(evt) {
        if (shouldStart(evt, ctx) && leftClick(evt)) {
          addEvt(ctx, 'temp', [
            [document, 'mousemove', 'move', 'notPassiveCapture'],
            [document, 'mouseup', 'end', 'passiveCapture'],
          ]);

          ctx.start(evt, true);
        }
      },

      touchStart(evt) {
        if (shouldStart(evt, ctx)) {
          const target = evt.target;

          addEvt(ctx, 'temp', [
            [target, 'touchmove', 'move', 'notPassiveCapture'],
            [target, 'touchcancel', 'end', 'passiveCapture'],
            [target, 'touchend', 'end', 'passiveCapture'],
          ]);

          ctx.start(evt);
        }
      },

      start(evt, mouseEvent) {
        isFirefox && preventDraggable(el, true);
        ctx.lastEvt = evt;

        const pos = position(evt);

        // Stop propagation so possible upper v-touch-pan don't catch this as well;
        //         If we're not the target (based on modifiers), we'll re-emit the event later
        if (mouseEvent === true || modifiers.stop === true) {
          // are we directly switching to detected state?
          //           clone event only otherwise
          if (
            ctx.direction.all !== true &&
                        (mouseEvent !== true || ctx.direction.mouseAllDir !== true)
          ) {
            const clone = evt.type.includes('mouse') ? new MouseEvent(evt.type, evt) : new TouchEvent(evt.type, evt);

            evt.defaultPrevented === true && prevent(clone);
            evt.cancelBubble === true && stop(clone);

            clone.qClonedBy =
                            evt.qClonedBy === undefined ? [ctx.uid] : evt.qClonedBy.concat(ctx.uid);
            clone.qKeyEvent = evt.qKeyEvent;
            clone.qClickOutside = evt.qClickOutside;

            ctx.initialEvent = {
              target: evt.target,
              event: clone,
            };
          }

          stop(evt);
        }

        ctx.event = {
          x: pos.left,
          y: pos.top,
          time: Date.now(),
          mouse: mouseEvent === true,
          detected: false,
          isFirst: true,
          isFinal: false,
          lastX: pos.left,
          lastY: pos.top,
        };
      },

      move(evt) {
        if (ctx.event === undefined) {
          return;
        }

        ctx.lastEvt = evt;

        const isMouseEvt = ctx.event.mouse === true;
        const start = () => {
          handleEvent(evt, isMouseEvt);

          if (modifiers.preserveCursor !== true) {
            document.documentElement.style.cursor = 'grabbing';
          }
          isMouseEvt === true &&
                        document.body.classList.add('no-pointer-events--children');
          document.body.classList.add('non-selectable');
          clearSelection();

          ctx.styleCleanup = (withDelayedFn) => {
            ctx.styleCleanup = undefined;

            if (modifiers.preserveCursor !== true) {
              document.documentElement.style.cursor = '';
            }
            document.body.classList.remove('non-selectable');

            if (isMouseEvt === true) {
              const remove = () => {
                document.body.classList.remove('no-pointer-events--children');
              };

              if (withDelayedFn !== undefined) {
                setTimeout(() => {
                  remove();
                  withDelayedFn();
                }, 50);
              } else {
                remove();
              }
            } else if (withDelayedFn !== undefined) {
              withDelayedFn();
            }
          };
        };

        if (ctx.event.detected === true) {
          ctx.event.isFirst !== true && handleEvent(evt, ctx.event.mouse);

          const { payload, synthetic } = getChanges(evt, ctx, false);

          if (payload !== undefined) {
            if (ctx.handler(payload) === false) {
              ctx.end(evt);
            } else {
              if (ctx.styleCleanup === undefined && ctx.event.isFirst === true) {
                start();
              }

              ctx.event.lastX = payload.position.left;
              ctx.event.lastY = payload.position.top;
              ctx.event.lastDir = synthetic === true ? undefined : payload.direction;
              ctx.event.isFirst = false;
            }
          }

          return;
        }

        if (
          ctx.direction.all === true ||
                    (isMouseEvt === true && ctx.modifiers.mouseAllDir === true)
        ) {
          start();
          ctx.event.detected = true;
          ctx.move(evt);
          return;
        }

        const pos = position(evt);
        const distX = pos.left - ctx.event.x;
        const distY = pos.top - ctx.event.y;
        const absX = Math.abs(distX);
        const absY = Math.abs(distY);

        if (absX !== absY) {
          if (
            (ctx.direction.horizontal === true && absX > absY) ||
                        (ctx.direction.vertical === true && absX < absY) ||
                        (ctx.direction.up === true && absX < absY && distY < 0) ||
                        (ctx.direction.down === true && absX < absY && distY > 0) ||
                        (ctx.direction.left === true && absX > absY && distX < 0) ||
                        (ctx.direction.right === true && absX > absY && distX > 0)
          ) {
            ctx.event.detected = true;
            ctx.move(evt);
          } else {
            ctx.end(evt, true);
          }
        }
      },

      end(evt, abort) {
        if (ctx.event === undefined) {
          return;
        }

        cleanEvt(ctx, 'temp');
        ctx.isFirefox && preventDraggable(el, false);

        if (abort === true) {
          ctx.styleCleanup !== undefined && ctx.styleCleanup();

          if (ctx.event.detected !== true && ctx.initialEvent !== undefined) {
            ctx.initialEvent.target.dispatchEvent(ctx.initialEvent.event);
          }
        } else if (ctx.event.detected === true) {
          ctx.event.isFirst === true &&
                        ctx.handler(getChanges(evt === undefined ? ctx.lastEvt : evt, ctx).payload);

          const { payload } = getChanges(evt === undefined ? ctx.lastEvt : evt, ctx, true);
          const fn = () => {
            ctx.handler(payload);
          };

          if (ctx.styleCleanup !== undefined) {
            ctx.styleCleanup(fn);
          } else {
            fn();
          }
        }

        ctx.event = undefined;
        ctx.initialEvent = undefined;
        ctx.lastEvt = undefined;
      },
    };

    el.__touchpan = ctx;

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
              [el, 'touchmove', 'noop', 'notPassiveCapture'],
            ]);
  },

  update(el, { oldValue, value }) {
    const ctx = el.__touchpan;
    if (ctx !== undefined && oldValue !== value) {
      typeof value !== 'function' && ctx.end();
      ctx.handler = value;
    }
  },

  unbind(el) {
    if (el.__touchpan_destroyed === undefined) {
      destroy(el);
    } else {
      delete el.__touchpan_destroyed;
    }
  },
};
