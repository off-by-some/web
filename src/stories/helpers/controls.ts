const hiddenControl = {
  control: false,
  table: {
    disable: true,
  },
} as const;

export const hideControls = (names: readonly string[]) =>
  Object.fromEntries(names.map((name) => [name, hiddenControl]));
