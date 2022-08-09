var cart = {};

function loadCart() {
  var localCart = localStorage.getItem('cart'); // получает данные по корзине из локального хранилища;
  if (localCart) {
    // проверяет, есть ли данные в корзине
    cart = JSON.parse(localCart);
    showCart();
  } else {
    $('.cart').html('Your cart is empty'); // если корзина пустая, выводит сообщение
    $('.orderField').html(''); // если корзина пустая, поле заказа не выводится
  }
}

function showCart() {
  //выводит крозину
  $.getJSON('goods.json', function (data) {
    var goods = data;
    var output = '';
    var sum = 0;
    for (var id in cart) {
      output += `<button class="btn btn-outline-danger cartDel" data-id="${id}">x</button>`;
      output += `<img src="img/${goods[id].img}" style="width:100px; height: 80px;">`; //изображение из базы
      output += `${goods[id].name}`; //название из базы
      output += `&nbsp <button class="btn btn-outline-info cartMinus" data-id="${id}">-</button>`;
      output += `&nbsp <strong style="font-size: 20px;">${cart[id]}</strong>`; // кол-во товара из корзины
      output += `&nbsp <button class="btn btn-outline-info cartAdd" data-id="${id}">+</button> &nbsp`;
      output += cart[id] * goods[id].price;
      output += `<br>`;
      sum = sum + cart[id] * goods[id].price;
    }
    output += `<strong>Total: &nbsp` + sum + `</strong>`;
    $('.cart').html(output);
    $('.cartDel').on('click', cartDelete);
    $('.cartAdd').on('click', cartAdd);
    $('.cartMinus').on('click', cartMinus);
  });
}

function cartDelete() {
  //удаляет из корзины товар
  var id = $(this).attr('data-id'); // получает id
  delete cart[id]; // удаляет из массива по id
  saveCart(); // сохраняет измененную корзину
  showCart(); // выводит измененную корзину
}

function cartAdd() {
  //добавляет товар
  var id = $(this).attr('data-id'); // получает id
  cart[id]++; // добавляет в массив по id
  saveCart(); // сохраняет измененную корзину
  showCart(); // выводит измененную корзину
}

function cartMinus() {
  //уменьшает количество на 1 товар
  var id = $(this).attr('data-id'); // получает id
  // если товар остался 1, то полностью удаляет из массива запись, чтобы счётчик не уходил в минус
  if (cart[id] == 1) {
    delete cart[id]; // удаляет из массива по id
  } else {
    cart[id]--; // отнимает из массива по id
  }
  saveCart(); // сохраняет измененную корзину
  showCart(); // выводит измененную корзину
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart)); // сохраняет строчное значение корзины в локальном хранилище
}

function sendEmail() {
  var ename = $('#ename').val();
  var email = $('#email').val();
  var ephone = $('#ephone').val();
  if (ename != '' && email != '' && ephone != '') {
    if (isEmpty(cart)) {
      $.post(
        'core/mail.php',
        {
          ename: ename,
          email: email,
          ephone: ephone,
          cart: cart,
        },
        function (data) {
          if(data==1) {
            alert('Order sent successfully');
          } else {
            alert('An error occured during sending your order, please try again later')
          }
        },
      );
    } else {
      alert('Cart is Empty');
    }
  } else {
    alert('Please fill requirted fields');
  }
}

function isEmpty(object) {
  for (var key in object) if (object.hasOwnProperty(key)) return true;
  return false;
}

$(document).ready(function () {
  loadCart();
  $('.sendOrder').on('click', sendEmail);
});
