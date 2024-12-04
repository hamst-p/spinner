import React, { useRef, useEffect } from 'react';
import { useSpinner } from '../../hooks/useSpinner'; // カスタムフックのインポート

const Spinner = () => {
  const spinnerRef = useRef(null);
  const handleRef = useRef(null);

  useEffect(() => {
    const spinner = useSpinner(spinnerRef, handleRef); // フックにRefsを渡す
    return () => spinner.cleanup(); // クリーンアップロジックを実行
  }, []);

  return (
    <div className="holder">
      <div className="spinner" ref={spinnerRef}>
        <img src="/fidget.png" alt="Fidget Spinner" />
      </div>
      <div className="handle" ref={handleRef}></div>
    </div>
  );
};

export default Spinner;
