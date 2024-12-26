class CalcController {
  constructor() {
    this._operation = [];
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this._currentDate;
    this.initButtonsEvents();

    this.initialize();
  }

  initialize() {
    this.setDisplayDateTime();

    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }

  setDisplayDateTime() {
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  addEventListenerAll(element, events, fn) {
    events.split(" ").forEach((event) => {
      element.addEventListener(event, fn, false);
    });
  }

  setError() {
    this.displayCalc = "error";
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }
  isOperator(value) {
    return ["+", "-", "/", "*", "%"].indexOf(value) > -1;
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }
  pushOperation(value) {
    this._operation.push(value);
    if (this._operation.length > 3) {
      this.calc();
    }
  }
  calc() {
    let last = this._operation.pop();
    let result = eval(this._operation.join(""));
    this._operation = [result, last];
    this.setLastOperationDisplay();

  }

  setLastOperationDisplay() {
    for (let i = this._operation.length - 1; i >= 0; i--) {
      if (!this.isOperator(this._operation[i])) {
        this.displayCalc = this._operation[i];
        break;
      }
    }
  }

  addOperation(value) {
    if (isNaN(this.getLastOperation())) {
      if (this._operation.length == 0 && this.isOperator(value)) {
        console.log("aq");
      } else if (this.isOperator(value)) {
        this.setLastOperation(value);
      } else if (isNaN(value)) {
        console.log(value);
      } else {
        this.pushOperation(value);
        this.setLastOperationDisplay();
        console.log("adicionou 1 valor");
      }
    } else {
      if (this.isOperator(value)) {
        this.pushOperation(value);
      } else {
        console.log("adicionou um dois numeros juntos");
        let newValue = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(parseInt(newValue));

        //att
      }
    }

    this.setLastOperationDisplay();


    console.log(this._operation);
  }

  clearAll() {
    this._operation = [];
  }

  clearEntry() {
    this._operation.pop();
  }

  exectBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;
      case "ce":
        this.clearEntry();
        break;

      case "soma":
        this.addOperation("+");
        break;

      case "subtracao":
        this.addOperation("-");
        break;

      case "multiplicacao":
        this.addOperation("*");
        break;

      case "divisao":
        this.addOperation("/");
        break;

      case "porcento":
        this.addOperation(value);
        break;

      case "igual":
        this.funcao;
        break;
      case "ponto":
        break;

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperation(parseInt(value));
        break;

      default:
        this.setError();
        break;
    }
  }

  initButtonsEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");
    console.log(typeof buttons);

    buttons.forEach((btn) => {
      this.addEventListenerAll(btn, "click drag", (e) => {
        let textbtn = btn.className.baseVal.replace("btn-", "");
        this.exectBtn(textbtn);
      });
      this.addEventListenerAll(btn, "mouseover mousedown mouseup", (e) => {
        btn.style.cursor = "pointer";
      });
    });
  }
  get displayTime() {
    return this._timeEl.innerHTML;
  }

  set displayTime(value) {
    this._timeEl.innerHTML = value;
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }

  set displayDate(value) {
    this._dateEl.innerHTML = value;
  }

  get displayCalc() {
    return this._displayCalcEl;
  }

  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }

  get currentDate() {
    return new Date();
  }

  set currentDate(value) {
    this._currentDate = value;
  }
}
