export function prepareForSpeech(text: string): string {
  return text
    // Remove Markdown formatting
    .replace(/[*_`#~]/g, "")

    // Remove UUIDs (Order IDs, Session IDs, etc.)
    .replace(
      /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi,
      "",
    )

    // Remove "Order ID: ..."
    .replace(/order\s*id\s*:?.*/gi, "")

    // Remove "Session ID: ..."
    .replace(/session\s*id\s*:?.*/gi, "")

    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")

    // Remove inline code
    .replace(/`([^`]*)`/g, "$1")

    // Replace newlines with spaces
    .replace(/\n+/g, " ")

    // Collapse multiple spaces
    .replace(/\s{2,}/g, " ")

    .trim();
}