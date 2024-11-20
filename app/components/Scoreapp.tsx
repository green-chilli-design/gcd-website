"use client";

import Script from "next/script";

export default function Scoreapp() {
  return (
    <>
      <div
        data-sa-url="https://bfb127a2-e165-4df2-8b52-5070c9ecd196.scoreapp.com/?sa_target=_top"
        data-sa-view="chat"
        data-sa-icon="https://cdn.scoreapp.com/assets/icons/conversation.svg"
        data-sa-auto-open="0"
        data-sa-button-bg-color="#a8cf43"
        data-sa-button-color="#323A3F"
        data-sa-button-text="Ready for a Custom App? - Take the Quiz"
        data-sa-font-size="16"
      />
      <Script src="https://static.scoreapp.com/js/integration/v1/embedding.js?v=hqAhYh" />
    </>
  );
}
