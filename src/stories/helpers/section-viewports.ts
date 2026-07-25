export type SectionViewport = 'mobile' | 'ipad' | 'desktop';

export const sectionViewportSizes: Record<SectionViewport, { width: number; height: number }> = {
  mobile: { width: 390, height: 844 },
  ipad: { width: 820, height: 1180 },
  desktop: { width: 1920, height: 1080 },
};

export const sectionViewportGlobals = {
  mobile: {
    viewport: {
      value: 'mobile',
      isRotated: false,
    },
  },
  ipad: {
    viewport: {
      value: 'ipad',
      isRotated: false,
    },
  },
  desktop: {
    viewport: {
      value: 'desktop',
      isRotated: false,
    },
  },
} as const;

export const sectionViewportParameters = (viewport: SectionViewport) => {
  const size = sectionViewportSizes[viewport];

  return {
    docs: {
      canvas: {
        className: `section-docs-canvas section-docs-canvas--${viewport}`,
      },
      story: {
        inline: false,
        iframeHeight: `${String(size.height)}px`,
      },
    },
  };
};
