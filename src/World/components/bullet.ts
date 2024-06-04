import {
  AnimationMixer,
  BoxGeometry,
  LoopRepeat,
  Mesh,
  MeshBasicMaterial,
} from "three";
import { bulletClip } from "../../animationClips/bullet";

const createBullet = () => {
  const geometry = new BoxGeometry(1, 2, 1);
  const material = new MeshBasicMaterial({ color: "red" });
  material.needsUpdate = true;

  const mesh = new Mesh(geometry, material);
  mesh.scale.set(0.1, 0.1, 0.1);
  //   mesh.material.color.set = true;
  return mesh;
};

const animateBullet = (mesh: Mesh) => {
  const mixer = new AnimationMixer(mesh);

  const bulletMovementAction = mixer.clipAction(bulletClip);

  bulletMovementAction.play();

  bulletMovementAction.loop = 2200;

  mixer.addEventListener("finished", () => {
    alert("Over");

    mesh.removeFromParent();
  });

  return (delta: number) => {
    mixer.update(delta);
  };
};

export { createBullet as createBall, animateBullet };
