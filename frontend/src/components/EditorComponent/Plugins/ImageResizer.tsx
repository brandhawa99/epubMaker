import { useRef, useCallback, type JSX } from "react";

export default function ImageResizer({
  onResizeStart,
  onResizeEnd,
  imageRef,
}: {
  onResizeStart: () => void;
  onResizeEnd: (width: number, height: number) => void;
  imageRef: { current: null | HTMLElement };
}): JSX.Element {
  const resizerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault();
    isResizing.current = true;
    onResizeStart();

    const startX = event.clientX;
    const startWidth = imageRef.current?.offsetWidth || 0;
    const startHeight = imageRef.current?.offsetHeight || 0;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing.current || !imageRef.current) return;

      const deltaX = moveEvent.clientX - startX;
      // We want to maintain aspect ratio, so we'll just use X delta for now
      // or calculate both if desired. Usually corner resize maintains AR.
      const newWidth = Math.max(50, startWidth + deltaX);
      const aspectRatio = startHeight / startWidth;
      const newHeight = newWidth * aspectRatio;

      imageRef.current.style.width = `${newWidth}px`;
      imageRef.current.style.height = `${newHeight}px`;
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      if (imageRef.current) {
        onResizeEnd(imageRef.current.offsetWidth, imageRef.current.offsetHeight);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, [imageRef, onResizeStart, onResizeEnd]);

  return (
    <div
      ref={resizerRef}
      className="image-resizer"
      onMouseDown={(e) => handleMouseDown(e.nativeEvent)}
    />
  );
}
