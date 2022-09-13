const REGEX = /(?<id>\w{5,6})-(?<port>\d{1,5})\.(?<hostname>.*)/;

/**
 * Returns the host of the CodeSandbox preview for the given port based
 * on the current project.
 */
export function getCodeSandboxHost(port: number): string | undefined {
  if (typeof window === "undefined") {
    // We're in a Node environment
    if (!process.env.CSB) {
      return undefined;
    }

    const hostname = require("os").hostname();

    return `${hostname}-${port}.${process.env.CSB_BASE_PREVIEW_HOST}`;
  }

  if (typeof location === "undefined") {
    return undefined;
  }

  // We're in a browser environment, let's try to infer it from the current
  // hostname.
  const currentUrl = location.host;
  const currentMatch = currentUrl.match(REGEX);

  if (!currentMatch?.groups) {
    return undefined;
  }
  const { id, hostname } = currentMatch.groups;

  if (!id || !port || !hostname) {
    return undefined;
  }

  return `${id}-${port}.${hostname}`;
}
