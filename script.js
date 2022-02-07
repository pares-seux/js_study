"use strict";

const rollback = 50;
const services = [];
let title,
  screens,
  screenPrice,
  adaptive,
  allServicePrices,
  fullPrice,
  servicePercentPrices,
  rollbackPrice,
  updatedTitle;

const isNumber = function (num) {
  const regexp = /^\d+$/;
  return !isNaN(parseFloat(num)) && isFinite(num) && regexp.test(num);
};

function checkPrice(str) {
  let result = prompt(str);
  while (!isNumber(result)) {
    result = prompt(str);
  }
  return result;
}

function asking() {
  title = prompt("Как называется ваш проект?");
  screens = prompt("Какие типы экранов нужно разработать?" + "");
  screenPrice = +checkPrice("Сколько будет стоить данная работа?");
  adaptive = confirm("Нужен ли адаптив на сайте?");
}

function writeServices() {}

function getFullPrice(firstPrice, secondPrice) {
  return firstPrice + secondPrice;
}

function getServicePercentPrices(price, roll) {
  return Math.round(price - roll);
}

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function (array) {
  let i = 0,
    sum = 0;
  do {
    i++;
    let service = {};
    service["name"] = prompt("Какой дополнительный тип услуги нужен?");
    service["price"] = +checkPrice("Сколько это будет стоить?");
    array.push(service);
    sum += service["price"];
  } while (i < 2);
  return sum;
};

const getTitle = function (str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

const getRollbackMessage = function (price) {
  switch (true) {
    case price >= 30000:
      return "Даем скидку в 10%";
      break;
    case price >= 15000:
      return "Даем скидку в 5%";
      break;
    case price >= 0:
      return "Скидка не предусмотрена";
      break;
    default:
      return "Что то пошло не так";
  }
};

asking();
allServicePrices = getAllServicePrices(services);
fullPrice = getFullPrice(allServicePrices, screenPrice);
rollbackPrice = fullPrice * (rollback / 100);
servicePercentPrices = getServicePercentPrices(fullPrice, rollbackPrice);
updatedTitle = getTitle(title.trim());

console.log("Типы данных: "); 
    showTypeOf(updatedTitle); 
    showTypeOf(fullPrice) ;
    showTypeOf(adaptive);
console.log(screens.toLowerCase().split(", ") + "");
console.log(getRollbackMessage(fullPrice));
console.log("Итоговая стоимость: " + servicePercentPrices);
