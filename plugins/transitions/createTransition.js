import mergeData from '~/utils/mergeData';

export function createJavascriptTransition(name, functions, mode = 'in-out') {
  return {
    name,

    functional: true,

    props: {
      mode: {
        type: String,
        default: mode,
      },
    },

    render(h, context) {
      return h('transition', mergeData(context.data, {
        props: { name },
        on: functions,
      }), context.children);
    },
  };
}
