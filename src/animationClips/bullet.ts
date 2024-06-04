import { AnimationClip, NumberKeyframeTrack, VectorKeyframeTrack } from "three";

const positionKeyFrame = new NumberKeyframeTrack(".position[y]", [0,5], [0,2]);

const bulletClip = new AnimationClip("bulletFire", -1, [positionKeyFrame]);

export { bulletClip };
