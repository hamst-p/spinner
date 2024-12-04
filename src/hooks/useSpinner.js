import { useEffect, useRef } from 'react';

export function useSpinner(spinnerRef, handleRef) {
  const angle = useRef(0); // 現在の回転角度
  const speed = useRef(0); // 回転速度
  const isDragging = useRef(false);
  const lastAngle = useRef(0); // ドラッグ開始時の角度
  const animationFrame = useRef(null);

  useEffect(() => {
    const spinner = spinnerRef.current;
    const handle = handleRef.current;

    if (!spinner || !handle) {
      console.error('Spinner or Handle reference is not available');
      return;
    }

    const getAngle = (e) => {
      const rect = spinner.getBoundingClientRect();
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      const mouse = {
        x: e.clientX,
        y: e.clientY,
      };
      return Math.atan2(mouse.y - center.y, mouse.x - center.x) * (180 / Math.PI);
    };

    const applyInertia = () => {
      if (!isDragging.current) {
        angle.current += speed.current;
        speed.current *= 0.95; // 慣性で減速
        spinner.style.transform = `rotate(${angle.current}deg)`;
        if (Math.abs(speed.current) > 0.1) {
          animationFrame.current = requestAnimationFrame(applyInertia);
        }
      }
    };

    const onDragStart = (e) => {
      isDragging.current = true;
      speed.current = 0;
      lastAngle.current = getAngle(e);
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', onDragStop);
    };

    const onDrag = (e) => {
      if (!isDragging.current) return;
      const currentAngle = getAngle(e);
      const deltaAngle = currentAngle - lastAngle.current;
      angle.current += deltaAngle;
      lastAngle.current = currentAngle;
      spinner.style.transform = `rotate(${angle.current}deg)`;
    };

    const onDragStop = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onDragStop);
      speed.current = angle.current - lastAngle.current; // ドラッグ速度を設定
      applyInertia(); // 慣性アニメーション開始
    };

    handle.addEventListener('mousedown', onDragStart);

    return () => {
      handle.removeEventListener('mousedown', onDragStart);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [spinnerRef, handleRef]);

  return {
    cleanup: () => {
      cancelAnimationFrame(animationFrame.current);
    },
  };
}
