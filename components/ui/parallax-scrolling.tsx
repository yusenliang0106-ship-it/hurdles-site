'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import './parallax-scrolling.css';

export type ParallaxLayerImage = {
  src: string;
  alt?: string;
  className?: string;
};

export type ParallaxComponentProps = {
  title?: string;
  subtitle?: string;
  subtitleClassName?: string;
  // Layers 1, 2 and 4 from back to front. Layer 3 is the title.
  images?: [ParallaxLayerImage, ParallaxLayerImage, ParallaxLayerImage];
  // Shown in the section that follows the header.
  children?: React.ReactNode;
  // Smooth scrolling for the whole page. Turn off if the page already runs Lenis.
  smoothScroll?: boolean;
};

const defaultImages: [ParallaxLayerImage, ParallaxLayerImage, ParallaxLayerImage] = [
  { src: 'https://cdn.21st.dev/assets/mirror/a4/a43f4eae3459c461345ee676f12d6e1ddca65e8a5279a5af00d475b17ff83aea.webp' },
  { src: 'https://cdn.21st.dev/assets/mirror/50/50ca6a0d36d2780bfcb469d6db7eaec0be7e0d2961ba69a63d2a1473b040338d.webp' },
  { src: 'https://cdn.21st.dev/assets/mirror/e1/e1c8137b5f971c3b3ec1a0f9e79b9c17018767005f844a10082b890472afecfb.webp' },
];

const layers = [
  { layer: '1', yPercent: 70 },
  { layer: '2', yPercent: 55 },
  { layer: '3', yPercent: 40 },
  { layer: '4', yPercent: 10 },
];

// A layer that fails to load is hidden instead of showing a broken-image icon.
const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.visibility = 'hidden';
};

export function ParallaxComponent({
  title = 'Parallax',
  subtitle,
  subtitleClassName,
  images = defaultImages,
  children,
  smoothScroll = true,
}: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Everything created inside matchMedia is reverted together, so this
    // component only removes its own ScrollTriggers, not every one on the page.
    // Under prefers-reduced-motion nothing is created: no parallax, no smooth scroll.
    const mm = gsap.matchMedia(parallaxRef);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

      if (triggerElement) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: '0% 0%',
            end: '100% 0%',
            scrub: 0,
          },
        });

        layers.forEach((layerObj, idx) => {
          tl.to(
            triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
            { yPercent: layerObj.yPercent, ease: 'none' },
            idx === 0 ? undefined : '<'
          );
        });
      }

      if (!smoothScroll) return;

      const lenis = new Lenis();
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  }, [smoothScroll]);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <img src={images[0].src} loading="eager" width="800" data-parallax-layer="1" onError={hideOnError} alt={images[0].alt ?? ''} className={`parallax__layer-img ${images[0].className ?? ''}`} />
            <img src={images[1].src} loading="eager" width="800" data-parallax-layer="2" onError={hideOnError} alt={images[1].alt ?? ''} className={`parallax__layer-img ${images[1].className ?? ''}`} />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h1 className="parallax__title">{title}</h1>
              {subtitle && <p className={`parallax__subtitle ${subtitleClassName ?? ''}`}>{subtitle}</p>}
            </div>
            <img src={images[2].src} loading="eager" width="800" data-parallax-layer="4" onError={hideOnError} alt={images[2].alt ?? ''} className={`parallax__layer-img ${images[2].className ?? ''}`} />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>
      <section className="parallax__content">{children}</section>
    </div>
  );
}
