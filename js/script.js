"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonStart = document.getElementsByClassName("handler_btn")[0];
const buttonReset = document.getElementsByClassName("handler_btn")[1];
const addButton = document.querySelector(".screen-btn");
const inputRange = document.querySelector('.rollback input[type="range"]');
const rangeValue = document.querySelector(".rollback span.range-value");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumbers = document.querySelectorAll(".other-items.number");
const toggleCmsBlock = document.querySelector("#cms-open");
const cmsVariants = document.querySelector(".hidden-cms-variants");
const cmsSelect = document.getElementById("cms-select");
const cmsInput = cmsVariants.querySelector("#cms-other-input");
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
  cmsPercent: 0,
  cmsPrice: 0,
  fullPrice: 0,
  servicePercentPrices: 0,
  servicesPercent: {},
  servicesNumber: {},
  checkAnswers: function () {
    if (this.addScreens()) {
      this.start();
      document
        .querySelectorAll(".main-controls__input input[type=text]")
        .forEach((item) => {
          item.setAttribute("disabled", "disabled");
        });
      document.querySelectorAll("select").forEach((item) => {
        item.setAttribute("disabled", "disabled");
      });
      buttonReset.style = "display: block";
      buttonStart.style = "display: none";
    } else {
      alert("Введите значение!");
    }
  },
  reset: function () {
    document
      .querySelectorAll(".total-input")
      .forEach((item) => (item.value = ""));
    screen.forEach((item, index) => {
      if (index === 0) {
        item.querySelector("select").value = "";
        item.querySelector("select").removeAttribute("disabled");
        item.querySelector("input[type=text]").value = "";
        item.querySelector("input[type=text]").removeAttribute("disabled");
      } else {
        item.remove();
      }
    });
    document
      .querySelectorAll(".custom-checkbox")
      .forEach((item) => (item.checked = false));
    inputRange.value = 0;
    rangeValue.textContent = 0 + "%";
    toggleCmsBlock.checked = false;
    cmsVariants.style = "display: none";
    cmsVariants.querySelector(".main-controls__input").style = "display: none";
    buttonReset.style = "display: none";
    buttonStart.style = "display: block";
    cmsVariants.querySelector("select").removeAttribute("disabled");
    cmsVariants.querySelector("select").value = "";
    cmsInput.removeAttribute("disabled");
    cmsInput.value = "";
    this.screenPrice = 0;
    this.screenSum = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrices = 0;
    this.screens = [];
    this.rollback = 0;
    this.cmsPercent = 0;
    this.cmsPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
  },
  init: function () {
    this.addTitle();
    buttonStart.addEventListener("click", () => this.checkAnswers());
    buttonReset.addEventListener("click", () => this.reset());
    addButton.addEventListener("click", () => this.addScreenBlock());
    this.addRollback = this.addRollback.bind(this);
    inputRange.addEventListener("input", this.addRollback);
    //  inputRange.addEventListener("change", () => this.addRollback);
    toggleCmsBlock.addEventListener("change", () => {
      if (toggleCmsBlock.checked === true) {
        cmsVariants.style = "display: flex";
      } else {
        cmsVariants.style = "display: none";
      }
    });
    cmsSelect.addEventListener("change", () => {
      if (isNaN(parseInt(cmsSelect[cmsSelect.options.selectedIndex].value))) {
        cmsVariants.querySelector(".main-controls__input").style =
          "display: flex";
      } else {
        cmsInput.value = "";
        cmsVariants.querySelector(".main-controls__input").style =
          "display: none";
        this.cmsPercent = parseInt(cmsSelect[cmsSelect.options.selectedIndex].value);
      }
    });
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  addRollback: function (event) {
    rangeValue.textContent = event.target.value + "%";
    this.rollback = event.target.value;
  },
  addScreenBlock: function () {
    const cloneScreen = screen[0].cloneNode(true);
    cloneScreen.querySelector("select").value = "";
    cloneScreen.querySelector("input[type=text]").value = "";
    screen[screen.length - 1].after(cloneScreen);
    screen = document.querySelectorAll(".screen");
  },
  addScreens: function () {
    let valid = true;
    screen.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
      if (+select.value * +input.value === 0) {
        valid = false;
      }
    });
    return valid;
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumbers.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
    this.cmsPercent = +cmsInput.value;
  },
  addPrices: function () {
    this.screens.forEach((element) => {
      this.screenPrice += element.price;
      this.screenSum += element.count;
    });

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.cmsPrice =
      (this.screenPrice +
        this.servicePricesNumber +
        this.servicePricesPercent) *
      (this.cmsPercent / 100);

    this.fullPrice =
      this.screenPrice +
      this.servicePricesNumber +
      this.servicePricesPercent +
      this.cmsPrice;

    this.servicePercentPrices = Math.round(
      this.fullPrice + this.fullPrice * (this.rollback / 100)
    );
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.screenSum;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    totalFullCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrices;
  },
  rollbackListener: function () {
    inputRange.removeEventListener("input", this.addRollback);
    inputRange.removeEventListener("change", this.addRollback);
    inputRange.addEventListener("input", (event) => {
      rangeValue.textContent = event.target.value + "%";
      this.rollback = event.target.value;
      this.servicePercentPrices = Math.round(
        this.fullPrice + this.fullPrice * (this.rollback / 100)
      );
      totalCountRollback.value = this.servicePercentPrices;
    });
  },
  start: function () {
    this.addServices();
    this.addPrices();
    this.showResult();
    this.rollbackListener();
  },
};

appData.init();
