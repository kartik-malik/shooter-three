import { World } from './World/world';
import './style.css'

const container = document.getElementById("container")!;

const world = new World(container);

world.start();

container.addEventListener("click",(event)=>{
  world.checkIfPointerIntersectingObject(event)
})