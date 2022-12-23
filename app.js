const screen = document.getElementById('screen');
const container = document.getElementById('container');
screen.innerText = '0'

container.addEventListener('click', (event) => {
    let input = event.target.innerText;
    input = calc.isNumber(input);
    if (isNaN(input)) {
        calc.operatorInputHandler(input)
    } else {
        calc.numberInputHandler(input)
    }

    console.log({
        inputFromButton: input,
        currentValue: calc.currentValue,
        previousValue: calc.previousValue,
        operator: calc.operator,
        repeat: calc.repeatOperationValue
    });
    console.log(calc.counter);
})

class Calculator {
    constructor() {
        this.currentValue = '';
        this.previousValue = undefined;
        this.operator = '';
        this.repeatOperationValue = undefined;
        this.counter = 0;
    }

    numberInputHandler = (digit) => {
        this.counter = 0;
        if (this.operator !== '' && this.previousValue === undefined) {
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

            this.display();
            return;
        }

        this.operator = operator;
        if (this.previousValue !== undefined) {
            this.doMath();
        }

    }

    equalsHandler = () => {
        this.counter++
        this.doMath();
        return;

    }

    doMath = () => {
        if (this.operator === '+') {
            if (this.counter > 1) {
                this.currentValue += Number(this.repeatOperationValue);
                this.display();
            } else {
                this.repeatOperationValue = this.currentValue;
                console.log(this.repeatOperationValue);
                this.currentValue = Number(this.previousValue) + Number(this.currentValue);
                this.display();
            }
        }

        if (this.operator === '-') {
            if (this.counter > 1) {
                this.currentValue -= Number(this.repeatOperationValue);
                this.display();
            } else {
                this.repeatOperationValue = this.currentValue;
                console.log(this.repeatOperationValue);
                this.currentValue = Number(this.previousValue) - Number(this.currentValue);
                this.display();
            }
        }

        if (this.operator === 'X') {
            this.currentValue = Number(this.previousValue) * Number(this.currentValue);
            this.display();
        }

        if (this.operator === '/') {
            if (this.counter > 1) {
                this.currentValue /= Number(this.repeatOperationValue);
                this.display();
            } else {
                this.repeatOperationValue = this.currentValue;
                console.log(this.repeatOperationValue);
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

    // isNumber = (input) => {
    //     if (isNaN(parseFloat(input))) {
    //         return input
    //     } else { }
    //     return Number(input);
    // }

}

const calc = new Calculator;


