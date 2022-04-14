const STATE_CANVAS = 'canvas'
const STATE_EXIST = 'exist'
const STATE_CLOSED = 'closed'
const STATE_ARCHIVED = 'archived'
const STATE_VANISHED = 'vanished'
const STATE_REMAINED = 'remained'
const STATE_ARCHIVED_WAYBACK = 'archived_wayback'
const STATE_ARCHIVED_GEOLOG = 'archived_geolog'

const CLASS_NAME_CANVAS = 'canvas'
const CLASS_NAME_EXIST = 'exist'
const CLASS_NAME_CLOSED = 'closed'
const CLASS_NAME_ARCHIVED = 'archived'
const CLASS_NAME_VANISHED = 'vanished'

let list = [];

$.ajax({
  type: "GET",
  url: "list.json",
  dataType: "json",
  async: false,
  cache: false,
  success: function(json) {
    list = json;
  }
});

function creatTable(mode, order, kind_masao, feature) {
  let count = 0;
  let isModeDisplay;
  let isOrderDisplay;
  let isKindMasaoDisplay;
  let isFeatureDisplay;
  
  for (let i = 0; i < list.length; i++) {
    switch (mode) {
      case "now":
        if (list[i].state == STATE_EXIST || list[i].state == STATE_CANVAS) {
          isModeDisplay = true;
        } else {
          isModeDisplay = false;
        }
        break;
      case "canvas":
        if (list[i].state == STATE_CANVAS) {
          isModeDisplay = true;
        } else {
          isModeDisplay = false;
        }
        break;
      case "archive":
        if (list[i].state == STATE_ARCHIVED || list[i].state == STATE_ARCHIVED_WAYBACK || list[i].state == STATE_ARCHIVED_GEOLOG) {
          isModeDisplay = true;
        } else {
          isModeDisplay = false;
        }
        break;
      default:
        isModeDisplay = true;
        break;
    }
    
    switch (order) {
      case "a":
        if (list[i].site.yomi.charAt(0) >= "あ" && list[i].site.yomi.charAt(0) <= "お") {
          isOrderDisplay = true;
        } else {
          isOrderDisplay = false;
        }
        break;
      case "k":
        if (list[i].site.yomi.charAt(0) >= "か" && list[i].site.yomi.charAt(0) <= "こ") {
          isOrderDisplay = true;
        } else {
          isOrderDisplay = false;
        }
        break;
      case "s":
        if (list[i].site.yomi.charAt(0) >= "さ" && list[i].site.yomi.charAt(0) <= "そ") {
          isOrderDisplay = true;
        } else {
          isOrderDisplay = false;
        }
        break;
      case "t":
        if (list[i].site.yomi.charAt(0) >= "た" && list[i].site.yomi.charAt(0) <= "と") {
          isOrderDisplay = true;
        } else {
          isOrderDisplay = false;
        }
        break;
      case "n":
        if (list[i].site.yomi.charAt(0) >= "な" && list[i].site.yomi.charAt(0) <= "の") {
          isOrderDisplay = true;
        } else {
          isOrderDisplay = false;
        }
        break;
      case "h":
        if (list[i].site.yomi.charAt(0) >= "は" && list[i].site.yomi.charAt(0) <= "ほ") {
          isOrderDisplay = true;
        } else {
          isOrderDisplay = false;
        }
        break;
      case "m":
        if (list[i].site.yomi.charAt(0) >= "ま" && list[i].site.yomi.charAt(0) <= "も") {
          isOrderDisplay = true;
        } else {
          isOrderDisplay = false;
        }
        break;
      case "y":
        if (list[i].site.yomi.charAt(0) >= "や" && list[i].site.yomi.charAt(0) <= "よ") {
          isOrderDisplay = true;
        } else {
          isOrderDisplay = false;
        }
        break;
      case "r":
        if (list[i].site.yomi.charAt(0) >= "ら" && list[i].site.yomi.charAt(0) <= "ろ") {
          isOrderDisplay = true;
        } else {
          isOrderDisplay = false;
        }
        break;
      case "w":
        if (list[i].site.yomi.charAt(0) >= "わ" && list[i].site.yomi.charAt(0) <= "ん") {
          isOrderDisplay = true;
        } else {
          isOrderDisplay = false;
        }
        break;
      default:
        isOrderDisplay = true;
        break;
    }

    if (kind_masao == "all" || kind_masao == 0) {
      isKindMasaoDisplay = true;
    } else {
      if (list[i].kind_masao instanceof Array) {
        for (var j = 0; j < list[i].kind_masao.length; j++) {
          if (kind_masao == list[i].kind_masao[j]) {
            isKindMasaoDisplay = true;
            break;
          } else {
            isKindMasaoDisplay = false;
          }
        }
      } else {
        if (kind_masao == list[i].kind_masao) {
          isKindMasaoDisplay = true;
        } else {
          isKindMasaoDisplay = false;
        }
      }
    }

    if (feature == "all" || feature == 0) {
      isFeatureDisplay = true;
    } else {
      if (list[i].feature instanceof Array) {
        for (var j = 0; j < list[i].feature.length; j++) {
          if (feature == list[i].feature[j]) {
            isFeatureDisplay = true;
            break;
          } else {
            isFeatureDisplay = false;
          }
        }
      } else {
        if (feature == list[i].feature) {
          isFeatureDisplay = true;
        } else {
          isFeatureDisplay = false;
        }
      }
    }

    if (isModeDisplay == true && isOrderDisplay == true && isKindMasaoDisplay == true && isFeatureDisplay == true) {
      count += 1;
      masao(list[i].site.name, list[i].oldname, list[i].webmaster, list[i].banner, list[i].url, list[i].year, list[i].work, list[i].state, list[i].wayback_time, list[i].nobanner);
    } 
  }
  
  $("#display_site_num").append("<p>現在、表示している正男サイトの数は<strong>" + count + "</strong>です。</p>");
  $("img").lazyload({
      effect : 'fadeIn',
      effectspeed : 500
  });
  
}

function masao(name, subname, man, banner, http, year, work, state, wayback_time, nobanner) {
  var tr = document.createElement('tr');
  var td = document.createElement('td');

  if (state == STATE_EXIST) {
    td.className = CLASS_NAME_EXIST;
  } else if (state == STATE_CLOSED) {
    td.className = CLASS_NAME_CLOSED;
  } else if (state == STATE_VANISHED) {
    td.className = CLASS_NAME_VANISHED;
  } else if (state == STATE_CANVAS) {
    td.className = CLASS_NAME_CANVAS;
  } else if (state == STATE_ARCHIVED || state == STATE_ARCHIVED_WAYBACK || state == STATE_REMAINED) {
    td.className = CLASS_NAME_ARCHIVED;
  }
  if (state != STATE_VANISHED) {
    var a = document.createElement('a');
    var clickname = "古今東西正男/" + name;
    a.onclick = function(){
      ga('send', 'event', 'banner', 'click', clickname);
    };
    if (state == STATE_CLOSED || state == STATE_ARCHIVED || state == STATE_ARCHIVED_WAYBACK || state == STATE_REMAINED) {
      if (wayback_time === undefined) {
        a.href = "https://web.archive.org/web/" + http;
      } else {
        a.href = "https://web.archive.org/web/" + wayback_time + "/" + http;
      }
    } else {
      a.href = http;
    }
    a.target = '_blank';
    if (banner === undefined) {
      a.className = 'noimage';
    } else {
      if (banner.image === undefined) {
        a.className = 'noimage';
      } else {
        a.className = 'image';
      }
    }
  }
  
  if (banner === undefined) {
    var div = document.createElement('div');
    div.style.color = "#000000";
    div.style.backgroundColor = "#808080";
    if (state == STATE_VANISHED) {
      div.className = 'noimage';
      td.appendChild(div);
    } else {
      a.appendChild(div);
      td.appendChild(a);
    }
  } else {
    if (banner.image === undefined) {
      var div = document.createElement('div');
      if (banner.color === undefined) {
        div.style.color = "#000000";
      } else {
        div.style.color = banner.color;
      }
      if (banner.background_color === undefined) {
        div.style.backgroundColor = "#808080";
      } else {
        div.style.backgroundColor = banner.background_color;
      }
      if (state == STATE_VANISHED) {
        div.className = 'noimage';
        td.appendChild(div);
      } else {
        a.appendChild(div);
        td.appendChild(a);
      }
    } else {
      var img = document.createElement('img');
      if (banner.size.x > 200) {
        var hi = banner.size.x / 200;
        var h = banner.size.y / hi;
        img.setAttribute("width", 200);
        img.setAttribute("height", h);
      } else {
        img.setAttribute("width", banner.size.x);
        img.setAttribute("height", banner.size.y);
      }
      img.setAttribute("dataoriginal", "banner/" + banner.image);
      img.setAttribute("src", "banner/unload.png");
      img.alt = name;
      if (state == STATE_VANISHED) {
        td.appendChild(img);
      } else {
        a.appendChild(img);
        td.appendChild(a);
      }
    }
  }
  tr.appendChild(td);
  
  var td = document.createElement('td');
  var div = document.createElement('div');
  var em = document.createElement('em');
  var text = document.createTextNode(name);
  em.appendChild(text);
  div.appendChild(em);

  if (subname !== undefined) {
    var span = document.createElement('span');
    span.className = 'old';
    if (subname instanceof Array) {
      for (var i = 0; i < subname.length; i++) {
        var br = document.createElement('br');
        span.appendChild(br);
        var text = document.createTextNode(subname[i]);
        span.appendChild(text);
      }
    } else {
      var br = document.createElement('br');
      span.appendChild(br);
      var text = document.createTextNode(subname);
      span.appendChild(text);
    }
    div.appendChild(span);
  }
  
  td.appendChild(div);
  tr.appendChild(td);
  
  var td = document.createElement('td');
  
  if (man !== undefined) {
    var text = document.createTextNode(man);
  } else {
    var text = document.createTextNode("？");
  }
  td.appendChild(text);
  tr.appendChild(td);
  
  var td = document.createElement('td');
  var tempFrom;
  var tempTo;
  
  if (year === undefined) {
    tempFrom = "？";
    tempTo = "？";
  } else {
    if (year.from === undefined) {
      tempFrom = "？";
    } else { 
      if (year.from == -1) {
        tempFrom = "？";
      } else if (year.from < 0) {
        tempFrom = -year.from + "？";
      } else {
        tempFrom = year.from;
      }
    }
    if (year.to === undefined) {
      tempTo = "？";
    } else { 
      if (year.to == -1) {
        tempTo = "？";
      } else if (year.to < 0) {
        tempTo = -year.to + "？";
      } else {
        tempTo = year.to;
      }
    }
  }
  
  if (tempTo === 0) {
    var text = document.createTextNode(tempFrom + "～");
    td.appendChild(text);
  } else if (tempFrom == tempTo) {
    var text = document.createTextNode(tempFrom);
    td.appendChild(text);
  } else {
    var text = document.createTextNode(tempFrom + "～" + tempTo);
    td.appendChild(text);
  }
  tr.appendChild(td);
  
  kokon_nakami.appendChild(tr);
}

function resetTable() {
  while (kokon_nakami.rows[0]) kokon_nakami.deleteRow(0);
  while (display_site_num.firstChild) display_site_num.removeChild(display_site_num.firstChild);
}

function reCreateTable(mode, order, kind_masao, feature) {
  resetTable();
  creatTable(mode, order, kind_masao, feature);
}

function clickRadio() {
  reCreateTable(form_mode.radio_mode.value, form_order.radio_order.value, form_kind_masao.radio_kind_masao.value, form_feature.radio_feature.value);
}
    
$(function () {
  $("#all_site_num").append("<p>現在の正男サイトの総数は<strong>" + list.length + "</strong>です。</p>");
  var kokon_nakami = document.getElementById('kokon_nakami');
  creatTable(0, 0, 0, 0);   
});