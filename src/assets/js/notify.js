let inNotify = true;
// import * as $ from "./jquery.min.js";
let type = ["", "info", "success", "warning", "danger"];
export default function initNotify(message, color) {
  $.notify(
    {
      icon: "pe-7s-bell",
      message: message
    },
    {
      type: type[color],
      timer: 1000
    }
  );
}
