"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonStart = document.getElementsByClassName("handler_btn")[0];
const buttonReset = document.getElementsByClassName("handler_btn")[1];
const addButton = document.querySelector(".screen-btn");
const inputRange = document.querySelector('.rollback input[type="range"]');
const rangeValue = document.querySelector(".rollback span.range-value");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumbers = document.querySelectorAll(".other-items.number");
const totalInput = [];
let screen = document.querySelectorAll(".screen");

for (let element of document.getElementsByClassName("total-input")) {
  totalInput.push(element);
}
const [total, totalCount, totalCountOther, totalFullCount, totalCountRollback] =
  totalInput;

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  screenSum: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrices: 0,
  servicesPercent: {},
  servicesNumber: {},
  checkAnswers() {
    if (appData.addScreens()) {
      appData.start();
    } else {
      alert("Введите значение!");
    }
  },
  init: function () {
    appData.addTitle();
    buttonStart.addEventListener("click", appData.checkAnswers);
    addButton.addEventListener("click", appData.addScreenBlock);
    inputRange.addEventListener("input", appData.addRollback);
    inputRange.addEventListener("change", appData.addRollback);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  addRollback: function (event) {
    rangeValue.textContent = event.target.value + "%";
    if (event.type === "change") {
      appData.rollback = event.target.value;
    }
  },
  addScreenBlock: function () {
    screen = document.querySelectorAll(".screen");
    const cloneScreen = screen[0].cloneNode(true);
    cloneScreen.querySelector("select").value = "";
    cloneScreen.querySelector("input[type=text]").value = "";
    screen[screen.length - 1].after(cloneScreen);
  },
  addScreens: function () {
    let valid = true;
    screen = document.querySelectorAll(".screen");
    screen.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
      console.log(+select.value, +input.value);
      if (+select.value * +input.value === 0) {
        valid = false;
      }
      console.log(appData.screens);
    });
    return valid;
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumbers.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addPrices: function () {
    appData.screens.forEach(function (element) {
      appData.screenPrice += element.price;
      appData.screenSum += element.count;
    });

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;

    appData.servicePercentPrices = Math.round(
      appData.fullPrice + appData.fullPrice * (appData.rollback / 100)
    );
  },
  // logger: function() {
  //   for (let element in appData) {
  //     if (typeof(appData[element]) !== 'function') {
  //       console.log(element, typeof(appData[element]), appData[element]);
  //     } else {
  //       console.log(element, typeof(appData[element]));
  //     }
  //   }
  // },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.screenSum;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    totalFullCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrices;
  },
  rollbackListener: function () {
    inputRange.removeEventListener("input", appData.addRollback);
    inputRange.removeEventListener("change", appData.addRollback);
    inputRange.addEventListener("input", function (event) {
      rangeValue.textContent = event.target.value + "%";
      appData.rollback = event.target.value;
      appData.servicePercentPrices = Math.round(
        appData.fullPrice + appData.fullPrice * (appData.rollback / 100)
      );
      totalCountRollback.value = appData.servicePercentPrices;
    });
  },
  start: function () {
    console.log("start");
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    appData.rollbackListener();
    //appData.logger();
  },
};

appData.init();
