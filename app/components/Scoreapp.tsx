"use client";

import { useState, useEffect } from "react";

/**
 * This component renders the Scoreapp widget.
 * It loads the Scoreapp script and initializes the widget.
 * It also cleans up the widget and script when the component is unmounted.
 *
 * @returns The Scoreapp component
 */
export default function Scoreapp() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // When the component is mounted, mark as initialized
    setInitialized(true);

    // Load the ScoreApp script
    loadScript();

    // Clean up when the component is unmounted
    return () => {
      // Only clean up if it was initialized
      if (initialized) {
        removeWidgetAndScript();
        setInitialized(false); // Reset the state
      }
    };
  }, [initialized]);

  return (
    <button
      id="scoreapp-widget"
      data-sa-url="https://9e841e57-0fa1-4d18-9592-adae748bba24.scoreapp.com/?sa_target=_top"
      data-sa-view="popup"
      data-sa-size="full"
      className="btn green mt-8  flex h-fit w-fit flex-col flex-nowrap whitespace-nowrap px-5 py-1 dark:text-black"
    >
      <span>Start The Quiz</span>
    </button>
  );
}

const SCORE_SCRIPT_SRC =
  "https://static.scoreapp.com/js/integration/v1/embedding.js?v=TyvlMR";

const loadScript = () => {
  const script = document.createElement("script");
  script.src = SCORE_SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
};

const removeWidgetAndScript = () => {
  document.querySelector(".sa--chat-button")?.remove();
  document.querySelector(`script[src*="${SCORE_SCRIPT_SRC}"]`)?.remove();
};
