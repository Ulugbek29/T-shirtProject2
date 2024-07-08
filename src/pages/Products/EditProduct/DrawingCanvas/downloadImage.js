export function downloadImage() {
  let canvas = document.getElementById("canvas");

  var dataURL = canvas.toDataURL("image/png");

  var a = document.createElement("a");
  a.href = dataURL;
  a.download = "canvas-download.jpeg";
  a.click();
}
