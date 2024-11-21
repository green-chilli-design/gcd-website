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
    <div
      id="scoreapp-widget"
      data-sa-url="https://bfb127a2-e165-4df2-8b52-5070c9ecd196.scoreapp.com/?sa_target=_top"
      data-sa-view="chat"
      data-sa-icon="https://cdn.scoreapp.com/assets/icons/conversation.svg"
      data-sa-auto-open="0"
      data-sa-button-bg-color="#a8cf43"
      data-sa-button-color="#323A3F"
      data-sa-button-text="Ready for a Custom App? - Take the Quiz"
      data-sa-font-size="16"
    />
  );
}

const SCORE_SCRIPT_SRC =
  "https://static.scoreapp.com/js/integration/v1/embedding.js?v=hqAhYh";

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
