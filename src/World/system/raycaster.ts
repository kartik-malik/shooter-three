import {
  BoxGeometry,
  Color,
  Intersection,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Object3DEventMap,
  PerspectiveCamera,
  Plane,
  Ray,
  Raycaster,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

class RayCasterExtended extends Raycaster {
  raycaster: Raycaster;
  renderer: WebGLRenderer;
  constructor(props) {
    super(props);
    this.renderer = props.renderer;
    this.raycaster = new Raycaster();
  }
  createRayPointOnClick = (event: MouseEvent, container: HTMLElement) => {
    const pointer = new Vector2();

    // converting to ndc
    pointer.x = (event.clientX / container.clientWidth) * 2 - 1;
    pointer.y = -(event.clientY / container.clientHeight) * 2 + 1;
    return pointer;
  };

  checkIfIntersecting = ({
    container,
    event,
    object,
    camera,
    rerender,
  }: {
    event: MouseEvent;
    container: HTMLElement;
    object: Mesh<BoxGeometry, MeshStandardMaterial, Object3DEventMap>;
    camera: PerspectiveCamera;
    rerender: (v: Vector3) => void;
  }) => {
    // creating a ndc point
    const pointer = this.createRayPointOnClick(event, container);
    const intersect = this.raycaster.intersectObject(object);

    // putting that ray on the point from camera.
    this.raycaster.setFromCamera(pointer, camera);

    // creating vector from ray point

    const vect = new Vector3(pointer.x, pointer.y, 0.5);

    // from camera putting onto world space
    vect.unproject(camera);

    // first point camera. second point is normalized
    var ray = new Ray(camera.position, vect.sub(camera.position).normalize());

    // Find the intersection point of the ray with the world
    const v2 = new Vector3();
    ray.intersectPlane(new Plane(new Vector3(0, 0, 1)), v2);

    rerender(v2);
  };
}

export { RayCasterExtended };
