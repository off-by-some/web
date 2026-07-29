import { getContext, setContext } from 'svelte';

interface ListContext {
  marker: () => string;
}

const LIST_CONTEXT = Symbol('pdf-list-context');

export function setListContext(context: ListContext) {
  setContext(LIST_CONTEXT, context);
}

export function listMarker() {
  return getContext<ListContext | undefined>(LIST_CONTEXT)?.marker();
}
