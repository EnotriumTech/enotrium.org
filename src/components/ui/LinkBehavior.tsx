"use client";

import { useEffect } from "react";

// Protocol: Only social media links open in new tabs, all other links open in same tab
// Social media: X, LinkedIn, BlueSky, Medium, GitHub, EnotriumAI

const SOCIAL_MEDIA_DOMAINS = [
  'x.com',
  'linkedin.com',
  'bsky.app',
  'medium.com',
  'github.com',
  'enotriumai.org'
];

export function LinkBehavior() {
  useEffect(() => {
    // Handle clicks - only override non-social media links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a, [role="link"]') as HTMLAnchorElement | null;
      
      if (link && link.href) {
        const isSocialMedia = SOCIAL_MEDIA_DOMAINS.some(domain => link.href.includes(domain));
        
        if (!isSocialMedia) {
          // Force non-social media links to open in same tab
          link.setAttribute('target', '_self');
          link.removeAttribute('rel');
        }
      }
    };

    // Intercept all clicks on the document (capture phase)
    document.addEventListener('click', handleLinkClick, true);
    
    // Process all existing links on mount
    const allLinks = document.querySelectorAll('a, [role="link"]');
    allLinks.forEach(link => {
      const href = (link as HTMLAnchorElement).href;
      if (href) {
        const isSocialMedia = SOCIAL_MEDIA_DOMAINS.some(domain => href.includes(domain));
        if (!isSocialMedia) {
          link.setAttribute('target', '_self');
          link.removeAttribute('rel');
        }
      }
    });

    // Process dynamically added links with MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const element = node as HTMLElement;
            const links = element.querySelectorAll('a, [role="link"]');
            links.forEach(link => {
              const href = (link as HTMLAnchorElement).href;
              if (href) {
                const isSocialMedia = SOCIAL_MEDIA_DOMAINS.some(domain => href.includes(domain));
                if (!isSocialMedia) {
                  link.setAttribute('target', '_self');
                  link.removeAttribute('rel');
                }
              }
            });
            // If the node itself is a link
            if (element.matches('a, [role="link"]')) {
              const href = (element as HTMLAnchorElement).href;
              if (href) {
                const isSocialMedia = SOCIAL_MEDIA_DOMAINS.some(domain => href.includes(domain));
                if (!isSocialMedia) {
                  element.setAttribute('target', '_self');
                  element.removeAttribute('rel');
                }
              }
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
