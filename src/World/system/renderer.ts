import { WebGLRenderer } from "three";

const createRenderer = (container: HTMLElement) => {
  const renderer = new WebGLRenderer();
  renderer.setSize(container.clientWidth, container.clientHeight);
  return renderer;
};

export { createRenderer };
