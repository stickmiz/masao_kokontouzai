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
        for (let j = 0; j < list[i].kind_masao.length; j++) {
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
        for (let j = 0; j < list[i].feature.length; j++) {
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
  let tr = document.createElement('tr');
  let td_banner = document.createElement('td');

  if (state == STATE_EXIST) {
    td_banner.className = CLASS_NAME_EXIST;
  } else if (state == STATE_CLOSED) {
    td_banner.className = CLASS_NAME_CLOSED;
  } else if (state == STATE_VANISHED) {
    td_banner.className = CLASS_NAME_VANISHED;
  } else if (state == STATE_CANVAS) {
    td_banner.className = CLASS_NAME_CANVAS;
  } else if (state == STATE_ARCHIVED || state == STATE_ARCHIVED_WAYBACK || state == STATE_ARCHIVED_GEOLOG || state == STATE_REMAINED) {
    td_banner.className = CLASS_NAME_ARCHIVED;
  }

  let a_banner = document.createElement('a');
  if (state != STATE_VANISHED) {
    let clickname = "古今東西正男/" + name;
    a_banner.onclick = function(){
      ga('send', 'event', 'banner', 'click', clickname);
    };
    if (state == STATE_CLOSED || state == STATE_ARCHIVED || state == STATE_ARCHIVED_WAYBACK || state == STATE_REMAINED) {
      if (wayback_time === undefined) {
        a_banner.href = "https://web.archive.org/web/" + http;
      } else {
        a_banner.href = "https://web.archive.org/web/" + wayback_time + "/" + http;
      }
    } else if (state == STATE_ARCHIVED_GEOLOG) {
      a_banner.href = "https://geolog.mydns.jp/" + http.replace('https://', '');
    } else {
      a_banner.href = http;
    }
    a_banner.target = '_blank';
    if (banner === undefined) {
      a_banner.className = 'noimage';
    } else {
      if (banner.image === undefined) {
        a_banner.className = 'noimage';
      } else {
        a_banner.className = 'image';
      }
    }
  }
  
  if (banner === undefined) {
    let div_nobanner = document.createElement('div');
    div_nobanner.style.color = "#000000";
    div_nobanner.style.backgroundColor = "#808080";
    if (state == STATE_VANISHED) {
      div_nobanner.className = 'noimage';
      td_banner.appendChild(div_nobanner);
    } else {
      a_banner.appendChild(div_nobanner);
      td_banner.appendChild(a_banner);
    }
  } else {
    if (banner.image === undefined) {
      let div_nobanner = document.createElement('div');
      if (banner.color === undefined) {
        div_nobanner.style.color = "#000000";
      } else {
        div_nobanner.style.color = banner.color;
      }
      if (banner.background_color === undefined) {
        div_nobanner.style.backgroundColor = "#808080";
      } else {
        div_nobanner.style.backgroundColor = banner.background_color;
      }
      if (state == STATE_VANISHED) {
        div_nobanner.className = 'noimage';
        td_banner.appendChild(div_nobanner);
      } else {
        a_banner.appendChild(div_nobanner);
        td_banner.appendChild(a_banner);
      }
    } else {
      let img_banner = document.createElement('img');
      if (banner.size.x > 200) {
        let hi = banner.size.x / 200;
        let h = banner.size.y / hi;
        img_banner.setAttribute("width", 200);
        img_banner.setAttribute("height", h);
      } else {
        img_banner.setAttribute("width", banner.size.x);
        img_banner.setAttribute("height", banner.size.y);
      }
      img_banner.setAttribute("dataoriginal", "banner/" + banner.image);
      img_banner.setAttribute("src", "banner/unload.png");
      img_banner.alt = name;
      if (state == STATE_VANISHED) {
        td_banner.appendChild(img_banner);
      } else {
        a_banner.appendChild(img_banner);
        td_banner.appendChild(a_banner);
      }
    }
  }
  tr.appendChild(td_banner);
  
  let td_site_name = document.createElement('td');
  let em_site_name_main = document.createElement('em');
  let text_site_name_main = document.createTextNode(name);
  em_site_name_main.appendChild(text_site_name_main);
  td_site_name.appendChild(em_site_name_main);

  if (subname !== undefined) {
    if (subname instanceof Array) {
      for (let i = 0; i < subname.length; i++) {
        let br = document.createElement('br');
        td_site_name.appendChild(br);
        let span_site_name_sub = document.createElement('span');
        span_site_name_sub.className = 'old';
        let text_site_name_sub = document.createTextNode(subname[i]);
        span_site_name_sub.appendChild(text_site_name_sub);
        td_site_name.appendChild(span_site_name_sub);
      }
    } else {
      let br = document.createElement('br');
      td_site_name.appendChild(br);
      let span_site_name_sub = document.createElement('span');
      span_site_name_sub.className = 'old';
      let text_site_name_sub = document.createTextNode(subname);
      span_site_name_sub.appendChild(text_site_name_sub);
      td_site_name.appendChild(span_site_name_sub);
    }
  }
  tr.appendChild(td_site_name);
  
  let td_manager = document.createElement('td');
  let text_manager;
  if (man !== undefined) {
    text_manager = document.createTextNode(man);
  } else {
    text_manager = document.createTextNode("？");
  }
  td_manager.appendChild(text_manager);
  tr.appendChild(td_manager);
  
  let td_period = document.createElement('td');
  let tempFrom;
  let tempTo;
  let text_period;

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
    text_period = document.createTextNode(tempFrom + "～");
  } else if (tempFrom == tempTo) {
    text_period = document.createTextNode(tempFrom);
  } else {
    text_period = document.createTextNode(tempFrom + "～" + tempTo);
  }
  td_period.appendChild(text_period);
  tr.appendChild(td_period);
  
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
  let kokon_nakami = document.getElementById('kokon_nakami');
  creatTable(0, 0, 0, 0);   
});