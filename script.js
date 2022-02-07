"use strict";

const appData = { 
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 50,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrices: 0,
  rollbackPrice: 0,
  updatedTitle: '',
  services: [],
  isNumber: function (num) {
    const regexp = /^\d+$/;
    return !isNaN(parseFloat(num)) && isFinite(num) && regexp.test(num);
  },
  checkPrice: function (str) {
    let result = prompt(str);
    while (!appData.isNumber(result)) {
      result = prompt(str);
    }
    return result;
  },
  asking: function() {
    appData.title = prompt("Как называется ваш проект?");
    appData.screens = prompt("Какие типы экранов нужно разработать?" + "");
    appData.screenPrice = +appData.checkPrice("Сколько будет стоить данная работа?");
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    appData.allServicePrices = appData.getAllServicePrices(appData.services);
    appData.fullPrice = appData.getFullPrice(appData.allServicePrices, appData.screenPrice);
    appData.rollbackPrice = appData.fullPrice * (appData.rollback / 100);
    appData.servicePercentPrices = appData.getServicePercentPrices(appData.fullPrice, appData.rollbackPrice);
    appData.updatedTitle = appData.getTitle(appData.title.trim());
  },
  getAllServicePrices: function (array) {
  let i = 0,
    sum = 0;
  do {
    i++;
    let service = {};
    service["name"] = prompt("Какой дополнительный тип услуги нужен?");
    service["price"] = +appData.checkPrice("Сколько это будет стоить?");
    array.push(service);
    sum += service["price"];
  } while (i < 2);
  return sum;
  },
  getFullPrice: function(firstPrice, secondPrice) {
    return firstPrice + secondPrice;
  },
  getServicePercentPrices: function(price, roll) {
    return Math.round(price - roll);
  },
  getTitle: function (str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  },
  getRollbackMessage: function (price) {
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
  },
  logger: function() {
    for (let element in appData) {
      console.log(element, typeof(appData[element]));
    }
  },
  start: function() {
    appData.asking();
    appData.logger();
  },
  
}



appData.start();



/*
console.log(appData.screens.toLowerCase().split(", ") + "");
console.log(getRollbackMessage(appData.fullPrice));
console.log("Итоговая стоимость: " + appData.servicePercentPrices);
*/
