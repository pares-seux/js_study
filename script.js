"use strict";

const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?" + "");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const rollback = 50;
const adaptive = confirm("Нужен ли адаптив на сайте?");
const services = writeServices();
//const rollbackPrice = fullPrice * (rollback / 100);
let allServicePrices,
  fullPrice,
  servicePercentPrices,
  rollbackPrice,
  updatedTitle;

function writeServices() {
  const array = [];
  for (let i = 0; i < 2; i++) {
    let service = {};
    service["name"] = prompt("Какой дополнительный тип услуги нужен?");
    service["price"] = +prompt("Сколько это будет стоить?");
    array.push(service);
  }
  return array;
}

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
  return array.reduce(
    (previousValue, currentValue) => previousValue.price + currentValue.price
  );
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

allServicePrices = getAllServicePrices(services);
fullPrice = getFullPrice(allServicePrices, screenPrice);
rollbackPrice = fullPrice * (rollback / 100);
servicePercentPrices = getServicePercentPrices(fullPrice, rollbackPrice);
updatedTitle = getTitle(title.trim());

console.log(
  "Типы данных: \n title - " +
    showTypeOf(updatedTitle) +
    ",\n fullPrice - " +
    showTypeOf(fullPrice) +
    ",\n adaptive - " +
    showTypeOf(adaptive) +
    "."
);
console.log(screens.toLowerCase().split(", ") + "");
console.log(getRollbackMessage(fullPrice));
console.log("Итоговая стоимость: " + servicePercentPrices);
