import React, { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
const Loader = ({ loading }) => {
  const loadingBarRef = useRef(null);
  useEffect(() => {
    if (loading) {
      loadingBarRef.current.continuousStart();
    } else {
      loadingBarRef.current.complete();
    }
  }, [loading]);

  return (
    <LoadingBar
      ref={loadingBarRef}
      color="#F5F5FF"
      onLoaderFinished={() => {}}
      height={4}
    />
  );
};

export default Loader;
