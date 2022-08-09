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
  var wishlist = {};
  if (localStorage.getItem('wishlist')) {
    wishlist = JSON.parse(localStorage.getItem('wishlist'));
    for (var key in wishlist) {
      output += '<div class="card text-white bg-dark mb-3" style="width: 18rem">';
      output += '<img src="img/' + data[key].img + '" class="card-img-top" />';
      output += '<div class="card-body">';
      output += '<h5 class="card-title">' + data[key].name + '</h5>';
      output += '<p class="card-text descr">' + data[key].description + '</p>';
      output += '<p class="card-text price">' + data[key].price + '</p>';
      output += `<a href="#" class="btn btn-primary add-to-cart" data-id="${key}">Add to cart</a>`;
      output += `<a href="goods.html#${key}" class="btn btn-outline-success">Details</a>`;
      output += '</div>';
      output += '</div>';
    }
    $('.goodsList').html(output); 
  } else {
    $('.goodsList').html('Your wish list is empty');
  }
}

$(document).ready(function () {
  init();
});
