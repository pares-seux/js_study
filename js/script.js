"use strict";

const title = document.getElementsByTagName('h1')[0];
const buttonStart = document.getElementsByClassName('handler_btn')[0];
const buttonReset = document.getElementsByClassName('handler_btn')[1];
const addButton = document.querySelector('.screen-btn');
const inputRange = document.querySelector('.rollback input[type="range"]')
const rangeValue = document.querySelector('.rollback span.range-value');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumbers = document.querySelectorAll('.other-items.number');
const totalInput = [];
let screen = document.querySelectorAll('.screen');


for (let element of document.getElementsByClassName('total-input')) {
  totalInput.push(element);
}

const [total, totalCount, totalCountOther, totalFullCount, totalCountRollback] = totalInput;

const appData = { 
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 50,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrices: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function (){
    appData.addTitle();
    buttonStart.addEventListener("click", appData.start);
    addButton.addEventListener("click", appData.addScreenBlock);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
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
  addScreens: function() {
    screen = document.querySelectorAll('.screen');
    screen.forEach(function(screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index, 
        name: selectName, 
        price: +select.value * +input.value
      });
    });
    console.log(appData.screens);
  },
  addServices: function() {
    otherItemsPercent.forEach(function(item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumbers.forEach(function(item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function() {
    const cloneScreen = screen[0].cloneNode(true);
    screen[screen.length - 1].after(cloneScreen);
  },
  addPrices: function() {
    appData.screenPrice = appData.screens.reduce(
    (previousValue, currentValue) => previousValue.price + currentValue.price
    );

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

     for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice.price * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = appData.screenPrice.price + appData.servicePricesNumber + appData.servicePricesPercent;
   
  },
  getServicePercentPrices: function(price, roll) {
    appData.servicePercentPrices = Math.round(price - roll);
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
  showResult: function () {
    total.value = appData.screenPrice.price;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    totalFullCount.value = appData.fullPrice;
  },  
  start: function() {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
 /* 
    appData.getServicePercentPrices(appData.fullPrice, appData.fullPrice * (appData.rollback / 100));
    appData.logger();
    */
  },
  
}


appData.init();
