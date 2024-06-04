import { Clock, WebGLRenderer } from "three";

type TickFunction = (delta: number) => void;

class Loop {
  tickItems = new Set<TickFunction>();
  clock = new Clock();

  constructor() {}

  addItemsToLoop = (fun: TickFunction) => {
    this.tickItems.add(fun);
  };

  start(renderer: WebGLRenderer,scene,camera) {
    renderer.setAnimationLoop(() => {
      for (let tickFn of this.tickItems) {
        tickFn(this.clock.getDelta());
      }

    renderer.render(scene, camera);

    });

  }

  stop = (renderer: WebGLRenderer) => {
    renderer.setAnimationLoop(null);
  };
}

export { Loop };
