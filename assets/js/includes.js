(() => {
  const INCLUDE_EVENT = 'includes:loaded';
  const loadInclude = async (node) => {
    const path = node.getAttribute('data-include');
    if (!path) {
      return;
    }
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load include: ${path}`);
      }
      const markup = await response.text();
      node.outerHTML = markup;
    } catch (error) {
      console.error(error);
    }
  };

  const loadIncludes = async () => {
    const includeNodes = document.querySelectorAll('[data-include]');
    if (!includeNodes.length) {
      window.__includesLoaded = true;
      document.dispatchEvent(new CustomEvent(INCLUDE_EVENT));
      return;
    }

    await Promise.all(Array.from(includeNodes).map(loadInclude));
    window.__includesLoaded = true;
    document.dispatchEvent(new CustomEvent(INCLUDE_EVENT));
  };

  const bootstrap = () => {
    if (window.__includesLoaded) {
      document.dispatchEvent(new CustomEvent(INCLUDE_EVENT));
      return;
    }
    loadIncludes();
  };

  window.__includesLoaded = false;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
