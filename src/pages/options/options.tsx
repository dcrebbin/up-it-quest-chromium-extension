//chrome options page

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";

export default function Options(): JSX.Element {
  const saveOptions = () => {
    const url = urlRef.current!.value;
    chrome.storage.sync.set({ url: url }, () => {
      const status = statusRef.current!;
      status.textContent = "Options saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 750);
    });
  };

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get({ url: "https://upit.quest" }, (items) => {
      urlRef.current!.value = items.url;
    });
  };

  const urlRef = React.createRef<HTMLInputElement>();
  const statusRef = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    restoreOptions();
  }, []);

  return (
    <div className="container">
      <h1>Up It Quest Options</h1>
      <div>
        <label htmlFor="color">URL</label>
        <input ref={urlRef} type="text" id="color" />
        <button onClick={saveOptions}>Save</button>
      </div>
      <div ref={statusRef} id="status"></div>
    </div>
  );
}
