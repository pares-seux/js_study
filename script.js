"use strict";

const appData = { 
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 50,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrices: 0,
  services: {},
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && /^\d+$/.test(num);
  },
  isString: function (str) {
    return str === str.trim() && !/^\d+$/.test(str.replace(" ","")) ;
  },
  checkPrice: function (str) {
    let result = prompt(str);
    while (!appData.isNumber(result)) {
      result = prompt(str);
    }
    return result;
  },
  checkName: function (str) {
    let result = prompt(str);
    while (!appData.isString(result)) {
      result = prompt(str);
    }
    return result;
  },
  asking: function() {
    let i = 0;
    appData.title = appData.checkName("Как называется ваш проект?");
    for (let i=0; i<2; i++) {
          let name = appData.checkName("Какие типы экранов нужно разработать?" + "");
          let price = +appData.checkPrice("Сколько будет стоить данная работа?");
          appData.screens.push({id: i, name: name, price: price});
    }
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    do {
      i++;
      let name = appData.checkName("Какой дополнительный тип услуги нужен?") + '_' + i;
      appData.services[name] = +appData.checkPrice("Сколько это будет стоить?");
      
    } while (i < 2);
  },
  addPrices: function() {
    appData.screenPrice = appData.screens.reduce(
    (previousValue, currentValue) => previousValue.price + currentValue.price
    );
  },
  getAllServicePrices: function () {
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  getFullPrice: function(firstPrice, secondPrice) {
    appData.fullPrice = firstPrice + secondPrice;
  },
  getServicePercentPrices: function(price, roll) {
    appData.servicePercentPrices = Math.round(price - roll);
  },
  getTitle: function (str) {
    appData.title = str[0].toUpperCase() + str.slice(1).toLowerCase();
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
      if (typeof(appData[element]) !== 'function') {
        console.log(element, typeof(appData[element]), appData[element]);
      } else {
        console.log(element, typeof(appData[element]));
      }
        
    }
  },
  start: function() {
    appData.asking();
    appData.getAllServicePrices();
    appData.addPrices();
    appData.getFullPrice(appData.allServicePrices, appData.screenPrice);
    appData.getServicePercentPrices(appData.fullPrice, appData.fullPrice * (appData.rollback / 100));
    appData.getTitle(appData.title.trim());
    appData.logger();
  },
  
}

appData.start();


