export const HISTORY_EXPORT_FILENAME = "password-history.txt";

export function buildHistoryExportContent(pwds: string[]): string {
  return pwds.join("\n");
}

export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
