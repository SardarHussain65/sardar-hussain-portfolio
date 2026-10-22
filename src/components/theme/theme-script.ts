/** localStorage key for the visitor's light or dark choice. */
export const THEME_STORAGE_KEY = "portfolio-theme";

/**
 * Sets `data-theme` on `<html>` before paint so the first frame matches the
 * saved choice. Default is dark — that is the designed field. No `"use client"`:
 * the root layout inlines this string.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;
