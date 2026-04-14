"use client";

import { useEffect } from "react";

// Protocol to prevent all links from opening in new tabs

export function LinkBehavior() {
  useEffect(() => {
    // Prevent all links from opening in new tabs
    // This intercepts all clicks and forces target="_self"
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a, [role="link"]') as HTMLAnchorElement | null;
      
      if (link) {
        // Force target to be self (same tab)
        link.setAttribute('target', '_self');
        // Remove any rel that might enable new tab behavior
        link.removeAttribute('rel');
      }
    };

    // Intercept all clicks on the document (capture phase)
    document.addEventListener('click', handleLinkClick, true);
    
    // Also process all existing links on mount
    const allLinks = document.querySelectorAll('a, [role="link"]');
    allLinks.forEach(link => {
      link.setAttribute('target', '_self');
      link.removeAttribute('rel');
    });

    // Also process dynamically added links with MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const element = node as HTMLElement;
            const links = element.querySelectorAll('a, [role="link"]');
            links.forEach(link => {
              link.setAttribute('target', '_self');
              link.removeAttribute('rel');
            });
            // If the node itself is a link
            if (element.matches('a, [role="link"]')) {
              element.setAttribute('target', '_self');
              element.removeAttribute('rel');
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener('click', handleLinkClick, true);
      observer.disconnect();
    };
  }, []);

  return null;
}
