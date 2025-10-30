import { v4 as uuidv4 } from "uuid";

export function generateTree(data, parentId = null, depth = 0, x = 0) {
  const nodes = [];
  const edges = [];

  const id = uuidv4();
  const label = Array.isArray(data)
    ? "Array"
    : typeof data === "object" && data !== null
    ? "Object"
    : String(data);

  nodes.push({
    id,
    data: { label },
    position: { x, y: depth * 150 },
    style: {
      background: "#3b82f6",
      color: "#fff",
      borderRadius: 8,
      padding: 10,
      fontSize: 13,
      minWidth: 100,
      textAlign: "center",
    },
  });

  if (parentId) {
    edges.push({
      id: uuidv4(),
      source: parentId,
      target: id,
      style: { stroke: "#555", strokeWidth: 2 },
    });
  }

  if (typeof data === "object" && data !== null) {
    const entries = Array.isArray(data)
      ? data.map((v, i) => [i, v])
      : Object.entries(data);

    const totalWidth = entries.length * 180;
    let startX = x - totalWidth / 2 + 90;

    entries.forEach(([key, value], i) => {
      const keyId = uuidv4();
      const childX = startX + i * 180;

      nodes.push({
        id: keyId,
        data: { label: String(key) },
        position: { x: childX, y: (depth + 1) * 150 },
        style: {
          background: "#10b981",
          color: "#fff",
          borderRadius: 8,
          padding: 10,
          fontSize: 13,
          minWidth: 90,
          textAlign: "center",
        },
      });

      edges.push({
        id: uuidv4(),
        source: id,
        target: keyId,
        style: { stroke: "#777", strokeWidth: 2 },
      });

      if (typeof value === "object" && value !== null) {
        const { nodes: subNodes, edges: subEdges } = generateTree(
          value,
          keyId,
          depth + 2,
          childX
        );
        nodes.push(...subNodes);
        edges.push(...subEdges);
      } else {
        const valId = uuidv4();
        nodes.push({
          id: valId,
          data: { label: String(value) },
          position: { x: childX, y: (depth + 2) * 150 },
          style: {
            background: "#f59e0b",
            color: "#fff",
            borderRadius: 8,
            padding: 8,
            fontSize: 12,
            minWidth: 80,
            textAlign: "center",
          },
        });
        edges.push({
          id: uuidv4(),
          source: keyId,
          target: valId,
          style: { stroke: "#aaa", strokeWidth: 2 },
        });
      }
    });
  }

  return { nodes, edges };
}
