let useNewCopy = false;
if (window.navigator.clipboard) {
  navigator.permissions.query({name: "clipboard-write"}).then(result => {
    if (result.state === "granted") {
      useNewCopy = true;
    }
  });
}

export function copyText(text, cb) {
  if (useNewCopy) {
    window.navigator.clipboard.writeText(text).then(() => cb(true)).catch(() => cb(false));
  } else {
    // https://stackoverflow.com/a/30810322
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const result = document.execCommand("copy");
      document.body.removeChild(textArea);
      return cb(result);
    } catch (e) {
      document.body.removeChild(textArea);
      return cb(false);
    }
  }
}
