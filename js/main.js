var cart = {}; //Корзина
function init() {
  //отправляет запрос на core.php для загрузки товаров из базы

  $.post(
    'admin/core.php',
    {
      action: 'loadGoods',
    },
    goodsOutput,
  );
}

function goodsOutput(data) {
  //выводит товары на страницу из базы
  data = JSON.parse(data);
  console.log(data);
  var output = '';
  for (var key in data) {
    output += '<div class="card text-white bg-dark mb-3" style="width: 18rem">';
    output += '<img src="img/' + data[key].img + '" class="card-img-top" />';
    output += '<div class="card-body">';
    output += '<h5 class="card-title">' + data[key].name + '</h5>';
    output += '<p class="card-text descr">' + data[key].description + '</p>';
    output += '<p class="card-text price">' + data[key].price + '</p>';
    output += `<a href="#" class="btn btn-primary add-to-cart" data-id="${key}">Add to cart</a>`;
    output += `<a href="#" class="btn btn-outline-warning add-to-wishlist" data-id="${key}">&hearts;</a>`;
    output += '<a href="#" class="btn btn-outline-success">Details</a>';
    output += '</div>';
    output += '</div>';
  }
  $('.goodsList').html(output);
  $('.add-to-cart').on('click', addToCart);
  $('.add-to-wishlist').on('click', addToWishlist);
}

function addToWishlist() {
  // Добавляет товар в вишлист
  var wishlist = {};
  if (localStorage.getItem('wishlist')) {
    wishlist = JSON.parse(localStorage.getItem('wishlist'));
  }
  alert('Item was added to wishlist');
  var id = $(this).attr('data-id');
  wishlist[id] = 1;
  localStorage.setItem('wishlist', JSON.stringify(wishlist)); // сохраняет строчное значение корзины в локальном хранилище

}

function addToCart() {
  var id = $(this).attr('data-id');
  //console.log(id);
  if (cart[id] == undefined) {
    cart[id] = 1; // если корзина пустая - делает 1
  } else {
    cart[id]++; // если такой товар есть - увеличивает кол-во на 1
  }
  //console.log(cart);
  showminiCart();
  saveCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart)); // сохраняет строчное значение корзины в локальном хранилище
}

function showminiCart() {
  // показывает мини корзину
  var output = '';

  for (var key in cart) {
    output += key + '----' + cart[key] + '<br>';
  }

  $('.miniCart').html(output);
}

function loadCart() {
  var localCart = localStorage.getItem('cart');
  if (localCart) {
    cart = JSON.parse(localCart);
    showminiCart();
  }
}

$(document).ready(function () {
  init();
  loadCart();
});
