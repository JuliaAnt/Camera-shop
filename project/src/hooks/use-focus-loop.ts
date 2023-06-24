import { useEffect } from 'react';

export const useFocusLoop = (elements: Array<React.RefObject<HTMLElement>>) => {
  useEffect(() => {
    if (elements.length === 0) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {

        const focusableElements = elements?.map((ref) => ref);
        if (focusableElements.length === 0) {
          return;
        }

        const firstElement = focusableElements[0].current;
        const lastElement = focusableElements[focusableElements.length - 1].current;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [elements]);
};
