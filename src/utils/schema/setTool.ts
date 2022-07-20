export function setTool(tool?: string[]) {
  if (tool) {
    return tool.map(toolItem => ({
      '@type': 'HowToTool',
      name: toolItem,
    }));
  }

  return undefined;
}
