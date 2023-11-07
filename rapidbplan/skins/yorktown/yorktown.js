$(document).ready(function() {
  // hide the Pages in this Section box if there's nothing to list
  if ($("#section_treenav .tree_nav").children().length==0) {
    $("#section_treenav").hide();
  }
});