export interface OnVisibleOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  disabled?: boolean;
  onVisible?: (entry: IntersectionObserverEntry) => void;
}

export function onVisible(node: HTMLElement, options: OnVisibleOptions = {}) {
  let observer: IntersectionObserver | undefined;
  let currentOptions = options;

  const setup = () => {
    observer?.disconnect();

    if (currentOptions.disabled) return;

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          currentOptions.onVisible?.(entry);
          node.dispatchEvent(new CustomEvent('visible', { detail: entry }));

          if (currentOptions.once ?? true) {
            observer?.unobserve(node);
          }
        }
      },
      {
        rootMargin: currentOptions.rootMargin,
        threshold: currentOptions.threshold ?? 0,
      },
    );

    observer.observe(node);
  };

  setup();

  return {
    update(nextOptions: OnVisibleOptions = {}) {
      currentOptions = nextOptions;
      setup();
    },
    destroy() {
      observer?.disconnect();
    },
  };
}
