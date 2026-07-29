/// <reference types="@sveltejs/enhanced-img" />
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare module '*.ttf?url' {
  const url: string;
  export default url;
}

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
