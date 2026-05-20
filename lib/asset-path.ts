export function assetPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  if (!path.startsWith("/")) return path
  return `${basePath}${path}`
}
