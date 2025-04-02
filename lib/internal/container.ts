import type { Container } from "../package/container";

export function containerJSON(container: Container) {
  return {
    image: container.image,
    ...(container.credentials && { credentials: container.credentials }),
    ...(container.env && { env: container.env }),
    ...(container.ports && { ports: container.ports }),
    ...(container.volumes && { volumes: container.volumes }),
    ...(container.options && { options: container.options }),
  };
}
