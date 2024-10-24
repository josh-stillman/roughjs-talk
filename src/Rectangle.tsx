import React, { useEffect, useRef } from 'react';
import roughAnimated from 'rough-animated';

interface Props {
  width: number;
  height: number;
  fill?: string;
  fillStyle?: string;
  roughness?: number;
  animationDelay?: number;
  hachureGap?: number;
  animationDuration?: number;
  animationDurationFillPercentage?: number;
  className?: string;
}

export const AnimatedRectangle = ({
  width,
  height,
  fill = 'black',
  fillStyle = 'hachure',
  roughness = 1,
  hachureGap = 7,
  animationDelay = 0,
  animationDuration = 1500,
  animationDurationFillPercentage = 0.7,
  className,
}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const PADDING = 4;

  useEffect(() => {
    resetShape();
  }, [fillStyle]);

  const resetShape = () => {
    if (!svgRef.current) {
      return;
    }

    const rc = roughAnimated.svg(svgRef.current);

    svgRef.current.replaceChildren(
      rc.rectangle(PADDING, PADDING, width, height, {
        animate: true,
        roughness,
        animationDelay,
        animationDuration,
        animationDurationFillPercentage,
        fillStyle,
        hachureGap,
        fill,
        fillWeight: fillStyle === 'dots' ? 3 : 1,
      })
    );
  };

  return (
    <svg
      className={className || ''}
      ref={svgRef}
      width={width + PADDING * 2} // TODO: make padding internal to width?
      height={height + PADDING * 2}
    />
  );
};
