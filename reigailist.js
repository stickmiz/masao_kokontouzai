const STATE_CANVAS = 'canvas'
const STATE_EXIST = 'exist'
const STATE_REMAINED = 'remained'

let list = [];
let anotherlist = [];
let url = [];
let k = 0;
let text = "";

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

$.ajax({
  type: "GET",
  url: "anotherlist.json",
  dataType: "json",
  async: false,
  cache: false,
  success: function(json) {
    anotherlist = json;
  }
});

for (let i = 0; i < list.length; i++) {
  if (list[i].state == STATE_EXIST || list[i].state == STATE_CANVAS || list[i].state == STATE_REMAINED) {
    url[k] = list[i].url;
    k++;
  }
  if (list[i].suburl !== undefined) {
    if (list[i].suburl instanceof Array) {
      for (let j = 0; j < list[i].suburl.length; j++) {
        url[k] = list[i].suburl[j];
        k++;
      }
    } else {
      url[k] = list[i].suburl;
      k++;
    }
  }
}

for (let i = 0; i < anotherlist.length; i++) {
  url[k] = anotherlist[i].url;
  k++;
}

url.sort();

for (i = 0; i < url.length && url[i] != undefined; i++) {
  url [i] = url[i].substring(0, url[i].lastIndexOf("/") + 1);
  text += url[i];
  text += "\n";
}

$(function () {
  $("#tarea").append('<textarea rows="30" cols="80" readonly>' + text + '</textarea>');
});