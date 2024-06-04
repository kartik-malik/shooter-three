import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { createCamera } from "./system/camera";
import { createRenderer } from "./system/renderer";
import { animateBullet, createBall } from "./components/bullet";
import { Loop } from "./system/loop";
import { RayCasterExtended } from "./system/raycaster";

class World {
  renderer: WebGLRenderer;
  raycaster: RayCasterExtended;
  camera: PerspectiveCamera;
  ball: Mesh;
  container: HTMLElement;
  scene: Scene;

  loop: Loop;

  constructor(container: HTMLElement) {
    this.renderer = createRenderer(container);
    container.append(this.renderer.domElement);

    // this.renderer.setPixelRatio(2)

    this.loop = new Loop();

    this.container = container;

    this.raycaster = new RayCasterExtended(this.renderer);

    this.camera = createCamera(container);

    this.ball = createBall();

    this.scene = new Scene();

    // this.scene.add(this.ball);

    this.renderer.render(this.scene, this.camera);

  }

  // start = ()=>{}

  checkIfPointerIntersectingObject = (event) => {
    this.raycaster.checkIfIntersecting({
      camera: this.camera,
      container: this.container,
      event,
      object: this.ball,
      rerender: (v: Vector3) => {
        this.ball.position.x = v.x;
        this.ball.position.y = v.y;

        this.scene.add(this.ball);
        const bulletTick = animateBullet(this.ball);

        this.loop.addItemsToLoop(bulletTick);

        this.renderer.render(this.scene, this.camera);
      },
    });
  };
  start = () => {
    this.loop.start(this.renderer,this.scene,this.camera);
  };

  stop = () => {
    this.loop.stop(this.renderer);
  };
}

export { World };
