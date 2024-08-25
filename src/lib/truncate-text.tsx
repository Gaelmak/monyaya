export function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
      if (maxLength) {
          let truncated = text.slice(0, maxLength);
          // Trouver l'index du dernier espace dans la sous-chaîne tronquée
          const lastSpaceIndex = truncated.lastIndexOf(' ');
          if (lastSpaceIndex !== -1) {
              // Tronquer à l'index du dernier espace
              truncated = truncated.slice(0, lastSpaceIndex);
          }
          text = truncated + (truncated.length > 0 ? '...' : '');
      }
  }
  return text;
}