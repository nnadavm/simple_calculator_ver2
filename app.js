const screen = document.getElementById('screen');
const container = document.getElementById('container');
screen.innerText = '0'

container.addEventListener('click', (event) => {
    if(event.target.id === 'screen') {
        return;
    }
    let input = event.target.innerText;
    calc.clickInputHandler(input);
})


class Calculator {
    constructor() {
        this.currentValue = '';
        this.previousValue = undefined;
        this.operator = '';
        this.previousOperator = '';
        this.repeatOperationValue = undefined;
        this.lastClicked = undefined;
    }

    clickInputHandler = (input) => {
        if (input === '÷') {
            input = '/';
        }
        if (input === '×') {
            input = '*';
        }

        if (calc.isNumber(input)) {
            calc.numberInputHandler(input)
        } else {
            calc.operatorInputHandler(input)
        }

        calc.lastClicked = calc.convertDataType(input);

        console.log({
            inputFromButton: input,
            currentValue: this.currentValue,
            previousValue: this.previousValue,
            operator: this.operator,
            previousOperator: this.previousOperator,
            repeatOperationValue: this.repeatOperationValue,
            lastClicked: this.lastClicked
        });

    }

    numberInputHandler = (digit) => {
        if (this.operator !== '' && this.previousValue === undefined || isNaN(this.lastClicked) === true) {
            this.previousValue = this.currentValue;
            this.currentValue = '';
        }

        this.currentValue = Number(String(this.currentValue) + String(digit));
        this.display();
    }

    operatorInputHandler = (operator) => {
        switch (operator) {
            default:
                this.previousOperator = this.operator;
                this.operator = operator;
                if (this.previousOperator !== '' && this.lastClicked !== '=') {
                    this.doMath(this.previousOperator);
                }
                break;

            case '=':
                this.doMath(this.operator);
                break;

            case 'C':
                this.currentValue = 0;
                this.previousValue = undefined;
                this.operator = '';
                this.previousOperator = '';
                this.display();
                break;
        }
    }

    doMath = (operator) => {
        if (this.lastClicked === '=') {
            this.currentValue = eval(this.currentValue + operator + this.repeatOperationValue);
            this.display();
        } else {
            this.repeatOperationValue = this.currentValue;
            this.currentValue = eval(this.previousValue + operator + this.currentValue);
            this.display();
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


