import * as THREE from "three";
import gsap from "gsap";

// Shared between the canvas that rasterises the label and the uniform that
// tells the shader how big it is.
export const TAG_W = 104;
export const TAG_H = 40;

/**
 * The "View" tag that rides the cursor over a card. Drawn in the ring's own
 * shader pass rather than as an element over the canvas — that is what lets
 * its label invert against whatever pixels it lands on, and lets its glass
 * refract the ring the same way the lip does.
 *
 * Only the alpha of this texture is used; the shader decides the ink colour
 * per pixel, so nothing about it is baked in here.
 *
 * `box` is the live scale the layout loop feeds the shader. Scale 0 is how the
 * tag is absent, so there is no separate visibility flag to keep in step.
 */
export function createTag(params, uniforms) {
  const box = { sx: 0.5, sy: 0 };
  const arrow = new Image();
  let arrowReady = false;
  let tex = null;

  const build = () => {
    const dpr = Math.min(window.devicePixelRatio, 2) * 2;
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(TAG_W * dpr);
    canvas.height = Math.ceil(TAG_H * dpr);

    tex?.dispose();
    tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.NoColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    uniforms.uTagTex.value = tex;
  };

  const show = (on) => {
    gsap.killTweensOf(box);
    box.sx = 0;
    box.sy = 0;
  };

  const load = (onReady) => {
    arrow.onload = () => {
      arrowReady = true;
      onReady?.();
    };
    arrow.src = "/arrow-top-right-svgrepo-com.svg";
  };

  const dispose = () => {
    gsap.killTweensOf(box);
    tex?.dispose();
  };

  return { box, build, show, load, dispose };
}
