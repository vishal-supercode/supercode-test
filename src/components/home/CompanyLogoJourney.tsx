"use client";
import "./company-logo-journey.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export function CompanyLogoJourney() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const heroLogo = document.querySelector<HTMLElement>(
      ".hero-company-logo-space",
    );
    const introLogo = document.querySelector<HTMLElement>(
      ".intro-company-logo-space",
    );
    const flyingLogo = document.querySelector<HTMLElement>(
      ".scrolling-company-logo",
    );
    const heroSection = document.querySelector<HTMLElement>(".hero-section");
    const introSection = document.querySelector<HTMLElement>(".intro-section");
    if (!heroLogo || !introLogo || !flyingLogo || !heroSection || !introSection)
      return;

    let heroStart = { left: 0, top: 0, width: 0, height: 0 };
    const measureHeroStart = () => {
      const rect = heroLogo.getBoundingClientRect();
      const sectionRect = heroSection.getBoundingClientRect();
      heroStart = {
        left: rect.left - sectionRect.left,
        top: rect.top - sectionRect.top,
        width: rect.width,
        height: rect.height,
      };
    };
    const placeAtHero = () => {
      const rect = heroLogo.getBoundingClientRect();
      measureHeroStart();
      gsap.set(flyingLogo, {
        position: "fixed",
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: "top left",
      });
    };

    const handOffToIntro = () => {
      const rect = introLogo.getBoundingClientRect();
      gsap.set(flyingLogo, {
        position: "absolute",
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
        x: 0,
        y: 0,
        scale: 1,
      });
    };

    const handOffToHero = () => {
      const rect = heroLogo.getBoundingClientRect();
      gsap.set(flyingLogo, {
        position: "absolute",
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
        x: 0,
        y: 0,
        scale: 1,
      });
    };

    const canvas = document.createElement("canvas");
    canvas.className = "scrolling-company-logo-canvas";
    flyingLogo.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 5);
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const keyLight = new THREE.DirectionalLight(0xffffff, 4);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x9dbdff, 2.2);
    fillLight.position.set(-4, 1, 2);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 3.5);
    rimLight.position.set(0, -3, -4);
    scene.add(rimLight);

    const modelRoot = new THREE.Group();
    // A slight fixed three-quarter angle reveals the model's depth; rotation remains drag-only.
    modelRoot.rotation.set(-0.04, -0.16, 0);
    scene.add(modelRoot);
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      event.preventDefault();
      isDragging = true;
      previousPointerX = event.clientX;
      previousPointerY = event.clientY;
      flyingLogo.setPointerCapture(event.pointerId);
      flyingLogo.classList.add("is-dragging");
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = event.clientX - previousPointerX;
      const deltaY = event.clientY - previousPointerY;
      previousPointerX = event.clientX;
      previousPointerY = event.clientY;
      modelRoot.rotation.y += deltaX * 0.008;
      modelRoot.rotation.x += deltaY * 0.008;
      modelRoot.rotation.x = THREE.MathUtils.clamp(
        modelRoot.rotation.x,
        -Math.PI * 0.48,
        Math.PI * 0.48,
      );
    };
    const onPointerUp = (event: PointerEvent) => {
      isDragging = false;
      flyingLogo.classList.remove("is-dragging");
      if (flyingLogo.hasPointerCapture(event.pointerId))
        flyingLogo.releasePointerCapture(event.pointerId);
    };
    flyingLogo.addEventListener("pointerdown", onPointerDown);
    flyingLogo.addEventListener("pointermove", onPointerMove);
    flyingLogo.addEventListener("pointerup", onPointerUp);
    flyingLogo.addEventListener("pointercancel", onPointerUp);
    flyingLogo.addEventListener("lostpointercapture", onPointerUp);

    let disposed = false;
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load(
      "/models/supercode-model.glb",
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const size = bounds.getSize(new THREE.Vector3());
        model.position.sub(bounds.getCenter(new THREE.Vector3()));
        model.scale.setScalar(3 / Math.max(size.x, size.y, size.z));
        model.traverse((node) => {
          if (!(node instanceof THREE.Mesh)) return;
          node.castShadow = false;
          node.receiveShadow = false;
          const makeSilver = (material: THREE.Material) => {
            const source = material as THREE.MeshStandardMaterial;
            return new THREE.MeshPhysicalMaterial({
              color: 0xd9dce2,
              metalness: 0.72,
              roughness: 0.24,
              clearcoat: 0.85,
              clearcoatRoughness: 0.2,
              map: source.map ?? null,
              side: THREE.DoubleSide,
            });
          };
          node.material = Array.isArray(node.material)
            ? node.material.map(makeSilver)
            : makeSilver(node.material);
        });
        modelRoot.add(model);
      },
      undefined,
      (error) => {
        console.error("Unable to load the Supercode 3D model:", error);
      },
    );

    const renderModel = () => {
      const rect = flyingLogo.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      renderer.render(scene, camera);
    };

    placeAtHero();
    gsap.ticker.add(renderModel);
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        endTrigger: introSection,
        end: "top 30%",
        scrub: 1.25,
        invalidateOnRefresh: true,
        onRefreshInit: measureHeroStart,
        onLeave: handOffToIntro,
        onLeaveBack: handOffToHero,
        onUpdate: (self) => {
          const to = introLogo.getBoundingClientRect();
          const progress = self.progress;
          gsap.set(flyingLogo, {
            position: "fixed",
            left: gsap.utils.interpolate(heroStart.left, to.left, progress),
            top: gsap.utils.interpolate(heroStart.top, to.top, progress),
            width: gsap.utils.interpolate(heroStart.width, to.width, progress),
            height: gsap.utils.interpolate(
              heroStart.height,
              to.height,
              progress,
            ),
          });
        },
      });
    });

    window.addEventListener("resize", measureHeroStart);
    return () => {
      window.removeEventListener("resize", measureHeroStart);
      disposed = true;
      flyingLogo.removeEventListener("pointerdown", onPointerDown);
      flyingLogo.removeEventListener("pointermove", onPointerMove);
      flyingLogo.removeEventListener("pointerup", onPointerUp);
      flyingLogo.removeEventListener("pointercancel", onPointerUp);
      flyingLogo.removeEventListener("lostpointercapture", onPointerUp);
      gsap.ticker.remove(renderModel);
      renderer.dispose();
      dracoLoader.dispose();
      canvas.remove();
      context.revert();
    };
  }, []);

  return (
    // One 3D model moves between placeholders; both placeholders preserve layout space.
    <div className="scrolling-company-logo" aria-hidden="true" />
  );
}
