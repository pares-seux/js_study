"use strict";

const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const rollback = 50;
const adaptive = confirm("Нужен ли адаптив на сайте?");
const services = createArray();
const fullPrice = screenPrice + services[0].price + services[1].price;
const servicePercentPrice = Math.round(fullPrice - rollback);

function createArray() {
  const array = [];
  for (let i = 0; i < 2; i++) {
    let service = {};
    service["name"] = prompt("Какой дополнительный тип услуги нужен?");
    service["price"] = +prompt("Сколько это будет стоить?");
    array.push(service);
  }
  return array;
}

console.log("Итоговая стоимость: " + servicePercentPrice);
switch (true) {
  case fullPrice >= 30000:
    console.log("Даем скидку в 10%");
    break;
  case fullPrice < 30000 && fullPrice >= 15000:
    console.log("Даем скидку в 5%");
    break;
  case fullPrice < 15000 && fullPrice >= 0:
    console.log("Скидка не предусмотрена");
    break;
  default:
    console.log("Что то пошло не так");
}
