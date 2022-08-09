// посылает запрос на свитч в core.js на функцию вывода товаров
function init() {
  $.post(
    'core.php',
    {
      action: 'init',
    },
    showGoods,
  );
}

// обрабатывает вывод из базы и записывает данные в select
function showGoods(data) {
  data = JSON.parse(data);
  console.log(data);
  var out = '<select>';
  out += '<option data-id="0">New Good</option>';
  for (var id in data) {
    out += `<option data-id="${id}">${data[id].name}</option>`;
  }
  out += '</select>';
  $('.goodsList').html(out);
  $('.goodsList select').on('click', selectGoods);
}

// при выборе товара в админ панели, выводит информацию из БД
function selectGoods() {
  var id = $('.goodsList select option:selected').attr('data-id');
  $.post(
    'core.php',
    {
      action: 'selectOneGoods',
      gid: id,
    },
    function (data) {
      data = JSON.parse(data);
      $('#gname').val(data.name);
      $('#gprice').val(data.price);
      $('#gdescr').val(data.description);
      $('#gorder').val(data.ord);
      $('#gimg').val(data.img);
      $('#gid').val(data.id);
    },
  );
}

// Передаёт данные для сохранения в БД
function saveToDB() {
  var id = $('#gid').val();
// проверяет, присвоен ли id выбраному option
  if (id != "") { 
    $.post(
      'core.php',
      {
        action: 'updateDB',
        id: id,
        gname: $('#gname').val(),
        gprice: $('#gprice').val(),
        gdescr: $('#gdescr').val(),
        gorder: $('#gorder').val(),
        gimg: $('#gimg').val(),
      },
      function (data) {
        if (data == 1) {
          alert('Data updated successfully');
          init();
        } else {
          console.log(data);
        }
      },
    );
  } else { // если id у выбраного option нет, запускает добавление нового товара, передаёт данные из полей на сервер
    $.post(
      'core.php',
      {
        action: 'newGoods',
        id: 0,
        gname: $('#gname').val(),
        gprice: $('#gprice').val(),
        gdescr: $('#gdescr').val(),
        gorder: $('#gorder').val(),
        gimg: $('#gimg').val(),
      },
      function (data) {
        if (data == 1) {
          alert('Data updated successfully');
          init();
        } else {
          console.log(data);
        }
      },
    );
  }
}

$(document).ready(function () {
  init();
  $('.udateDb').on('click', saveToDB);
});
