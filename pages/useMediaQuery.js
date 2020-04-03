import { useEffect, useState } from "react";

export default function useMediaQuery(queryString) {
  const [isMatch, setIsMatch] = useState(false);
  function mqChange(mq) {
    setIsMatch(mq.matches);
  }

  useEffect(() => {
    const mq = window.matchMedia(queryString);
    mq.addListener(mqChange);
    mqChange(mq);

    return () => {
      mq.removeListener(mqChange);
    };
  }, []);

  return isMatch;
}
