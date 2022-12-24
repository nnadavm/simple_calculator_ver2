const screen = document.getElementById('screen');
const container = document.getElementById('container');
screen.innerText = '0'

container.addEventListener('click', (event) => {
    let input = event.target.innerText;
    if (calc.isNumber(input)) {
        calc.numberInputHandler(input)
    } else {
        calc.operatorInputHandler(input)
    }

    calc.lastClicked = calc.convertDataType(input);

    console.log({
        inputFromButton: input,
        currentValue: calc.currentValue,
        previousValue: calc.previousValue,
        operator: calc.operator,
        previousOperator: calc.previousOperator,
        repeat: calc.repeatOperationValue,
        lastClicked: calc.lastClicked
    });
})

class Calculator {
    constructor() {
        this.currentValue = '';
        this.previousValue = undefined;
        this.operator = '';
        this.previousOperator = '';
        this.repeatOperationValue = undefined;
        this.counter = 0;
        this.lastClicked = undefined;
    }

    numberInputHandler = (digit) => {
        this.counter = 0;
        if (this.operator !== '' && this.previousValue === undefined || isNaN(this.lastClicked) === true) {
            this.previousValue = this.currentValue;
            this.currentValue = '';
        }

        this.currentValue = Number(String(this.currentValue) + String(digit));
        this.display();
    }

    operatorInputHandler = (operator) => {

        if (operator === '=') {
            this.equalsHandler();
            return;
        }

        this.counter = 0;

        if (operator === 'C') {
            this.currentValue = 0;
            this.previousValue = undefined;
            this.operator = '';
            this.previousOperator = '';

            this.display();
            return;
        }

        this.previousOperator = this.operator;
        this.operator = operator;
        if (this.previousOperator !== '' && this.operator !== '' && this.lastClicked !== '=') {
            this.doMath(this.previousOperator);
        }

    }

    equalsHandler = () => {
        this.counter++
        this.doMath(this.operator);
        return;

    }

    doMath = (operator) => {
        if (operator === '+') {
            if (this.lastClicked === '=') {
                this.currentValue += Number(this.repeatOperationValue);
                this.display();
            } else {
                this.repeatOperationValue = this.currentValue;
                this.currentValue = Number(this.previousValue) + Number(this.currentValue);
                this.display();
            }
        }

        if (operator === '-') {
            if (this.lastClicked === '=') {
                this.currentValue -= Number(this.repeatOperationValue);
                this.display();
            } else {
                this.repeatOperationValue = this.currentValue;
                this.currentValue = Number(this.previousValue) - Number(this.currentValue);
                this.display();
            }
        }

        if (operator === 'X') {
            if (this.lastClicked === '=') {
                this.currentValue *= Number(this.repeatOperationValue);
                this.display();
            } else {
                this.repeatOperationValue = this.currentValue;
                this.currentValue = Number(this.previousValue) * Number(this.currentValue);
                this.display();
            }
        }

        if (operator === '/') {
            if (this.lastClicked === '=') {
                this.currentValue /= Number(this.repeatOperationValue);
                this.display();
            } else {
                this.repeatOperationValue = this.currentValue;
                this.currentValue = Number(this.previousValue) / Number(this.currentValue);
                this.display();
            }
        }
    }

    display = () => {
        screen.innerText = '';
        screen.innerText = this.currentValue;
    }

    isNumber = (input) => {
        if (isNaN(parseFloat(input))) {
            return false
        } else { }
        return true;
    }

    convertDataType = (input) => {
        if (isNaN(parseFloat(input))) {
            return input
        } else { }
        return Number(input);
    }

}

const calc = new Calculator;


