const butInstall = document.getElementById("buttonInstall");
let deferredPrompt;
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the browser's default behavior
  // event.preventDefault();
  deferredPrompt = event;
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  // Check if the deferredPrompt is available
  if (deferredPrompt) {
    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    deferredPrompt = null;
  }
});

// Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("App installed");
});
