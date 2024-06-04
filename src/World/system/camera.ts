import { PerspectiveCamera } from "three";

const createCamera = (container:HTMLElement) => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const camera = new PerspectiveCamera(50, width / height, 1,100);


  camera.position.set(0,0,5);

  return camera;
};

export { createCamera };
