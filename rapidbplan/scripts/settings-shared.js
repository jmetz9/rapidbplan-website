
function help(page) {
  var day = new Date();
  var id = day.getTime();
  var URL = 'http://wiki.editme.com/' + page;
  var height = 600;
  var width = 850;
  window.open(URL, id, 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width='+width+',height='+height+',left = 100,top = 100');
}

function helpLink(page) {
  $(document).ready(function(){
    $("a.helpLink").attr('href',"javascript:help('"+page+"');");
  });
}

function hideCol1() {
  $(document).ready(function(){
    $("#col1").html('');
    $("#col3").css('width','100%');
    $("#col3").css('margin','0');
    $("#col3").css('border-left','none');
  });
}

function passthroughNotification(data) {
  if ($(data).find('response error').length>0) {
    ajaxNotification($(data).find('response error').text());
  } else {
    ajaxNotification($(data).find('response passthrough').text());
  }
} 			

function hideSettingsLinks() {
  $("#settings_menu").html('');
}

function ackTrial() {
  document.cookie = 'trialAcked=1; max-age=86400; path=/';
  const trialDiv = document.getElementById('trialMessage');
  if (trialDiv) trialDiv.outerHTML = '';
}

function ajaxNotification(message, ms, type, callback) {

    notifyCallBack = callback;
    if (!ms) ms = 4000;

    var notification = $("#ajaxMessage");
    notification.removeClass("success notice error");
    if (!type) type = 'success';
    notification.addClass(type);

    //Make sure it's visible even when top of the page not visible
    notification.css("top", Math.min($("body").scrollTop(),$("html").scrollTop()));
    var w = notification.width();
    var dw = $(document).width();
    var left = parseInt(dw/2 - w/2);
    notification.css("left",left);
    $("#notification-text").html(message);

    //show the notification
    notification.slideDown("fast", function() {
        setTimeout(hideNotification, ms)
    });
}

function hideNotification(i) {
    $("#ajaxMessage").slideUp("fast", function() {
        if (null != notifyCallBack && (typeof notifyCallBack == "function")) {
            notifyCallBack();
        }
        //reset the callback variable
        notifyCallBack = null
    });
}

function accountManager() {
  document.accountMgrLoginForm.submit();
}

function getStylesheetBackground(stylesheet) {
  switch (stylesheet.toLowerCase()) {
    case 'yorktownbluecss': return '#9bc7de';
    case 'yorktowngreencss': return '#d3dccb';
    case 'yorktowngraycss': return '#818588';
    case 'yorktownredcss': return '#b64949';
    case 'yorktownbrowncss': return '#763e20';
    case 'yorktownburgundycss': return '#744741';
    case 'yorktownolivecss': return '#d9d9d9';
    case 'yorktowntundracss': return '#7a7871';
    case 'minimalistcss': return '#fff';
    case 'brightonbluecss': return '#656565';
    case 'brightonburntwoodcss': return '#e0e0c0';
    case 'brightondarkcss': return '#000';
    case 'brightonslatecss': return '#dbe7cf';
    case 'actonbluecss': return '#9bc7de';
    case 'actonredcss': return '#fbdedf';
    case 'actongreencss': return '#d3dccb';
    case 'actonbrowncss': return '#e2dad1';
    case 'actongraycss': return '#626262';
    case 'classicbluecss': return '#fff';
    case 'classicredcss': return '#fff';
    case 'classicblackcss': return '#000';
    case 'classichitechcss': return '#c0c0c0';
    case 'classicpasturecss': return '#f0fff0';
    case 'classictypewritercss': return '#fff';
  }
}
function getSidebarBackground(setting, stylesheet) {
  var bg = '#D6DDE6';
  if (setting=='stylesheet') {
    var tmp = getStylesheetBackground(stylesheet);
    if (typeof tmp != 'undefined') bg = tmp;
  }
  else if (setting.indexOf('#')==0) {
    bg = setting;
  }
  return bg;
}

var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

//Function to convert hex format to a rgb color
function rgb2hex(rgb) {
 if (rgb.indexOf('#')==0) return rgb;
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}


//Provide a variable to hold the callback function
var notifyCallBack;

$(document).ready(function() {
  // settings tabs
  $("a.settings_button[rel]").click(function() {
    var clicked = $(this);
    var menu = $("#"+clicked.attr('rel'));
    $("a.settings_button[rel]").each(function(){
      if ($(this).attr('rel')!=clicked.attr('rel')) {
        $("#"+$(this).attr('rel')).slideUp();
        var img = $(this).find('img');
        img.attr('src','/img/settings_button_closed.png');
      }
    });
    var img = clicked.find('img');
    if (menu.is(':visible')) {
      img.attr('src','/img/settings_button_closed.png');
    } else {
      img.attr('src','/img/settings_button_open.png');
    }
    menu.slideToggle();
    clicked.blur();
    return false;
  });
  $("a.settings_button, a.settings_link").each(function() {
    var w = $(this);
    if (w.attr('href')==location.pathname || w.attr('href')==location.pathname+location.search) {
      w.addClass('active');
      if (w.parent().attr('id')!=undefined) {
        var btn = $("a[rel="+w.parent().attr('id')+"]");
        if (btn.length>0) {
          $(btn[0]).addClass("active");
        }
        w.parent().show();
        w.parent().find('img').attr('src','/img/settings_button_open.png');
      }
    }
  });
});

