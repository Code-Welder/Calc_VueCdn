const app = {
  data() {
    return {
      currentNumber: '',
      previousNumber: '',
      currentOperation: '',
      numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'],
      operators: ['C', '<', '+', '-', '*', '/', '=']
    }
  },
  methods: {
    input(num) {
      this.currentNumber += num
    },
    delPrevDigit() {
      this.currentNumber = [] + this.currentNumber
      this.currentNumber = (this.currentNumber).toString().slice(0, this.currentNumber.length - 1)
    },
    clearDisplay() {
      this.previousNumber = ''
      this.currentNumber = ''
      this.currentOperation = ''
    },
    operation(operator) {
      if(operator == 'C') {
        this.clearDisplay()
      }

      if(operator == '<') {
        this.delPrevDigit()
      }

      if(['+', '-', '*', '/', '='].includes(operator)) {
        const calc = {
          '+': (a,b) => a + b,
          '-': (a,b) => a - b,
          '*': (a,b) => a * b,
          '/': (a,b) => a / b
        }

        if(!this.previousNumber & operator != '=') {
          this.previousNumber = this.currentNumber
          this.currentOperation = operator
          this.currentNumber = ''
          console.log('1');
          return
        }

        if(this.currentOperation == '/' & this.currentNumber == '0') {
          this.currentNumber = ''
          this.currentOperation = ''
          this.previousNumber = 'И чего ты этим добился ¯\\_(ツ)_/¯'
          return
        }
        if(operator == '=' & this.previousNumber) {
          this.currentNumber = calc[this.currentOperation](+this.previousNumber, +this.currentNumber)
          this.currentOperation = ''
          this.previousNumber = ''
          return
        }

        if(this.currentOperation) {
          if(operator == '=') {
            this.currentNumber = calc[this.currentOperation](+this.previousNumber, +this.currentNumber)
            this.currentOperation = ''
            this.previousNumber = ''
            return
          }

          this.previousNumber = calc[this.currentOperation](+this.previousNumber, +this.currentNumber)
          this.currentOperation = operator
          this.currentNumber = ''
        }
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      let key = e.key

      if((this.numbers).includes(key)) {
        this.input(e.key)
      }

      if(['+', '-', '*', '/'].includes(key)) {
        this.operation(key)
      }

      switch(key) {
        case 'Backspace':
          this.delPrevDigit()
          break;
        case 'Escape':
          this.clearDisplay()
          break;
        case 'Enter':
          e.preventDefault()
          this.operation('=')
          break;
      }
    })
  },
}

Vue.createApp(app).mount('#app')