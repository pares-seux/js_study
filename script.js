"use strict";

const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const rollback = 50;
let adaptive = false;
const adaptiveAnswer = prompt("Нужен ли адаптив на сайте?");
if (
  adaptiveAnswer === "да" ||
  adaptiveAnswer === "true" ||
  adaptiveAnswer === "нужен"
) {
  adaptive = true;
}
let services = [];
for (let i = 0; i < 2; i++) {
  let service = {};
  service["name"] = prompt("Какой дополнительный тип услуги нужен?");
  service["price"] = +prompt("Сколько это будет стоить?");
  services.push(service);
}
let fullPrice = screenPrice + services[0].price + services[1].price;
let servicePercentPrice = Math.round(fullPrice - rollback);

console.log("Итоговая стоимость: " + servicePercentPrice);
if (fullPrice >= 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice < 30000 && fullPrice >= 15000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice < 15000 && fullPrice >= 0) {
  console.log("Скидка не предусмотрена");
} else {
  console.log("Что то пошло не так");
}
