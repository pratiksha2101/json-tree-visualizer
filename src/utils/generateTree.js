import { v4 as uuidv4 } from "uuid";

export function generateTree(data, parentId = null, depth = 0, x = 0) {
  const nodes = [];
  const edges = [];

  const id = uuidv4();
  nodes.push({
    id,
    data: { label: typeof data === "object" ? "Object" : String(data) },
    position: { x: x * 200, y: depth * 120 },
    style: {
      background: "#3b82f6",
      color: "#fff",
      borderRadius: 8,
      padding: 10,
      fontSize: 12,
    },
  });

  if (parentId) {
    edges.push({ id: uuidv4(), source: parentId, target: id });
  }

  if (typeof data === "object" && data !== null) {
    Object.entries(data).forEach(([key, value], index) => {
      const childId = uuidv4();
      nodes.push({
        id: childId,
        data: { label: key },
        position: { x: (x + index) * 200, y: (depth + 1) * 120 },
        style: {
          background: "#10b981",
          color: "#fff",
          borderRadius: 8,
          padding: 10,
          fontSize: 12,
        },
      });
      edges.push({ id: uuidv4(), source: id, target: childId });

      if (typeof value === "object") {
        const { nodes: childNodes, edges: childEdges } = generateTree(
          value,
          childId,
          depth + 2,
          x + index
        );
        nodes.push(...childNodes);
        edges.push(...childEdges);
      }
    });
  }

  return { nodes, edges };
}
