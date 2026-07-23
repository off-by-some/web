export interface ContactMethod {
  type: 'email' | 'linkedin' | 'github' | 'calendar';
  label: string;
  value: string;
  href: string;
  imagePath: string;
  description: string;
}
