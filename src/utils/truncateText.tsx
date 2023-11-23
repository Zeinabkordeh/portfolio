export function truncateText(text: string, maxWords: number): string {
    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text;
    } else {
      const truncatedText = words.slice(0, maxWords).join(" ");
      return truncatedText + " ...";
    }
  }
  