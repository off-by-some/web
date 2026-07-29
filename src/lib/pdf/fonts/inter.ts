import interBoldUrl from 'inter-font/ttf/Inter-Bold.ttf?url';
import interMediumUrl from 'inter-font/ttf/Inter-Medium.ttf?url';
import interRegularUrl from 'inter-font/ttf/Inter-Regular.ttf?url';
import interSemiBoldUrl from 'inter-font/ttf/Inter-SemiBold.ttf?url';

export const interPdfFontFamily = 'Inter';

export const interPdfFonts = [
  {
    family: interPdfFontFamily,
    fileName: 'Inter-Regular.ttf',
    style: 'normal',
    url: interRegularUrl,
    weight: 400,
  },
  {
    family: interPdfFontFamily,
    fileName: 'Inter-Medium.ttf',
    style: 'normal',
    url: interMediumUrl,
    weight: 500,
  },
  {
    family: interPdfFontFamily,
    fileName: 'Inter-SemiBold.ttf',
    style: 'normal',
    url: interSemiBoldUrl,
    weight: 600,
  },
  {
    family: interPdfFontFamily,
    fileName: 'Inter-Bold.ttf',
    style: 'normal',
    url: interBoldUrl,
    weight: 700,
  },
] as const;
