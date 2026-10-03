import type Lenis from "lenis";

let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { instance = l; };
export const lockScroll = (locked: boolean) => { if (locked) instance?.stop(); else instance?.start(); };
export const syncAfterNavigation = () => {
  if (!instance) return;
  const el = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  if (el) instance.scrollTo(el, { offset: -100, immediate: true, force: true });
  else instance.scrollTo(0, { immediate: true, force: true });
};
