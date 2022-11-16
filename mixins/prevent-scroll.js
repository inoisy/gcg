import { getEventPath, listenOpts, stopAndPrevent } from '~/utils/event.js';
import { hasScrollbar, getScrollPosition, getHorizontalScrollPosition } from '~/utils/scroll.js';

let scrollPositionX;
let scrollPositionY;
let maxScrollTop;
let vpPendingUpdate = false;
let bodyLeft;
let bodyTop;
let closeTimer;

function onWheel(e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}

function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains('q-layout__backdrop')) {
    return true;
  }

  const path = getEventPath(e);
  const shift = e.shiftKey && !e.deltaX;
  const scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY);
  const delta = shift || scrollY ? e.deltaY : e.deltaX;

  for (let index = 0; index < path.length; index++) {
    const el = path[index];

    if (hasScrollbar(el, scrollY)) {
      return scrollY
        ? delta < 0 && el.scrollTop === 0
          ? true
          : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight
        : delta < 0 && el.scrollLeft === 0
          ? true
          : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth;
    }
  }

  return true;
}

function onAppleScroll(e) {
  if (e.target === document) {
    // required, otherwise iOS blocks further scrolling
    // until the mobile scrollbar dissappears
        document.scrollingElement.scrollTop = document.scrollingElement.scrollTop; // eslint-disable-line
  }
}

function onAppleResize(evt) {
  if (vpPendingUpdate === true) {
    return;
  }

  vpPendingUpdate = true;

  requestAnimationFrame(() => {
    vpPendingUpdate = false;

    const { height } = evt.target;
    const { clientHeight, scrollTop } = document.scrollingElement;

    if (maxScrollTop === undefined || height !== window.innerHeight) {
      maxScrollTop = clientHeight - height;
      document.scrollingElement.scrollTop = scrollTop;
    }

    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}

function apply(action) {
  const body = document.body;
  const hasViewport = window.visualViewport !== undefined;

  if (action === 'add') {
    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;

    body.style.left = `-${scrollPositionX}px`;
    body.style.top = `-${scrollPositionY}px`;
    if (
      // overflowY !== 'hidden' && overflowY === 'scroll' ||
      body.scrollHeight > window.innerHeight
    ) {
      body.classList.add('body--force-scrollbar');
      // document.documentElement.classList.add('body--force-scrollbar');
    }

    body.classList.add('body--prevent-scroll');
    document.qScrollPrevented = true;

    if (window.$nuxt.$device.isIos === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener('resize', onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener('scroll', onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      } else {
        window.addEventListener('scroll', onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }

  if (window.$nuxt.$device.isDesktop === true && window.$nuxt.$device.isMacOS === true) {
    // ref. https://developers.google.com/web/updates/2017/01/scrolling-intervention
    window[`${action}EventListener`]('wheel', onWheel, listenOpts.notPassive);
  }

  if (action === 'remove') {
    if (window.$nuxt.$device.isIos === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener('resize', onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener('scroll', onAppleResize, listenOpts.passiveCapture);
      } else {
        window.removeEventListener('scroll', onAppleScroll, listenOpts.passiveCapture);
      }
    }

    body.classList.remove('body--prevent-scroll');
    body.classList.remove('body--force-scrollbar');
    // document.documentElement.classList.remove('body--force-scrollbar');

    document.qScrollPrevented = false;

    body.style.left = bodyLeft;
    body.style.top = bodyTop;

    window.scrollTo(scrollPositionX, scrollPositionY);
    maxScrollTop = undefined;
  }
}

export function preventScroll(state) {
  let action = 'add';

  if (state === true) {
    //     registered++;

    if (closeTimer !== undefined) {
      clearTimeout(closeTimer);
      closeTimer = undefined;
      return;
    }

    //     if (registered > 1) {
    //         return;
    //     }
  } else {
    //     if (registered === 0) {
    //         return;
    //     }

    //     registered--;

    //     if (registered > 0) {
    //         return;
    //     }

    action = 'remove';

    if (window.$nuxt.$device.isIos === true) {
      // && client.is.nativeMobile === true
      clearTimeout(closeTimer);

      closeTimer = setTimeout(() => {
        apply(action);
        closeTimer = undefined;
      }, 100);
      return;
    }
  }

  apply(action);
}

export default {
  data() {
    return {
      preventedScroll: null,
    };
  },
  methods: {
    __preventScroll(state) {
      if (state !== this.preventedScroll && (this.preventedScroll !== undefined || state === true)) {
        this.preventedScroll = state;
        preventScroll(state);
      }
    },
  },
};
