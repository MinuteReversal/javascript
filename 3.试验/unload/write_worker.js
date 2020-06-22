addEventListener("message", (evt) => {
  console.log("in worker");
  setTimeout(() => {
    localStorage.setItem("unload-time", Date.now().toString());
  }, 1000);
});
