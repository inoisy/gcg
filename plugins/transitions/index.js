import { createJavascriptTransition } from './createTransition';

import ExpandTransitionGenerator from './expand-transition';

export const VExpandTransition = createJavascriptTransition('expand-transition', ExpandTransitionGenerator());
export default {
  VExpandTransition,
};
