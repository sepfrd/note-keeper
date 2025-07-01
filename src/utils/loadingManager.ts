let _showFunction: (() => void) | null = null;
let _hideFunction: (() => void) | null = null;

export const loadingManager = {
  set(show: () => void, hide: () => void) {
    _showFunction = show;
    _hideFunction = hide;
  },
  show() {
    _showFunction?.();
  },
  hide() {
    _hideFunction?.();
  },
};
