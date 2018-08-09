import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import Button from '../../components/Buttons'
import Display from '../../components/Display'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      prevFig: '',
      currFig: '',
      memory: 0,
      display: 0,
      operator: '',
      buttons: [
        {
          name: '√',
          type: 'specOperator',
          action: curr => Math.sqrt(curr),
          width: 12
        },
        { name: 'Off', type: 'switch', action: () => '', width: 3 },
        { name: 'MC', type: 'memory', action: () => 0, width: 3 },
        { name: 'MR', type: 'memory', width: 3 },
        {
          name: 'M-',
          type: 'memory',
          action: (curr, mem) => mem - curr,
          width: 3
        },
        {
          name: 'M+',
          type: 'memory',
          action: (curr, mem) => mem + curr,
          width: 3
        },
        //{ name: 'MS', type: 'memory', action: curr => curr, width: 3 },
        {
          name: '÷',
          type: 'operator',
          action: (prev, curr) => prev / curr,
          width: 3
        },
        {
          name: '%',
          type: 'operator',
          action: (prev, curr) => prev % curr,
          width: 3
        },
        { name: '7', type: 'digit', action: () => 7, width: 3 },
        { name: '8', type: 'digit', action: () => 8, width: 3 },
        { name: '9', type: 'digit', action: () => 9, width: 3 },
        {
          name: '×',
          type: 'operator',
          action: (prev, curr) => prev * curr,
          width: 3
        },
        {
          name: '+/-',
          type: 'specOperator',
          action: curr =>
            Math.sign(curr) === -1 ? Math.abs(curr) : -Math.abs(curr),
          width: 3
        },
        { name: '4', type: 'digit', action: () => 4, width: 3 },
        { name: '5', type: 'digit', action: () => 5, width: 3 },
        { name: '6', type: 'digit', action: () => 6, width: 3 },
        {
          name: '-',
          type: 'operator',
          action: (prev, curr) => prev - curr,
          width: 3
        },
        {
          name: 'C',
          type: 'switch',
          action: () => 0,
          width: 3,
          className: 'inverse'
        },
        { name: '1', type: 'digit', action: () => 1, width: 3 },
        { name: '2', type: 'digit', action: () => 2, width: 3 },
        { name: '3', type: 'digit', action: () => 3, width: 3 },
        {
          name: '+',
          type: 'operator',
          action: (prev, curr) => prev + curr,
          width: 3,
          className: 'long-btn'
        },
        {
          name: 'AC',
          type: 'switch',
          action: () => 0,
          width: 3,
          className: 'inverse'
        },
        { name: '0', type: 'digit', action: () => 0, width: 3 },
        { name: '.', type: 'digit', action: () => '.', width: 3 },
        { name: '=', type: 'submit', width: 3 }
      ]
    }
  }

  processDigit(action) {
    let { currFig } = this.state
    let newValue =
      currFig === '' || currFig === 0 ? action() : currFig + '' + action()
    this.setState({ currFig: newValue, display: newValue })
  }

  processOperator(newAction) {
    let { prevFig, currFig, display, operator } = this.state
    if (currFig !== '') {
      if (prevFig !== '') {
        let operatedValue = operator(parseFloat(prevFig), parseFloat(currFig))
        this.setState({
          operator: newAction,
          prevFig: operatedValue,
          currFig: '',
          display: operatedValue
        })
      } else {
        this.setState({
          operator: newAction,
          prevFig: currFig,
          currFig: ''
        })
      }
    } else {
      if (display !== '' && display !== 0) {
        this.setState({ operator: newAction, prevFig: display, currFig: '' })
      }
    }
  }

  processMemory(action, name) {
    let { display, memory } = this.state
    if (name === 'MR') {
      this.setState({ display: memory, currFig: '' })
    } else {
      this.setState({
        memory: action(parseFloat(display), parseFloat(memory)),
        currFig: ''
      })
    }
  }

  processEquals() {
    let { prevFig, currFig, operator } = this.state
    if (prevFig !== '' && currFig !== '') {
      let operatedValue = operator(parseFloat(prevFig), parseFloat(currFig))
      this.setState({
        currFig: '',
        operator: '',
        prevFig: '',
        display: operatedValue
      })
    }
  }

  processSwitch(action, name) {
    let { display } = this.state
    if (display !== '') {
      this.setState({
        display: action(),
        prevFig: '',
        currFig: '',
        operator: ''
      })
    } else if (name === 'AC') {
      this.setState({
        display: action(),
        prevFig: '',
        currFig: '',
        operator: ''
      })
    }
  }

  handleClick({ action, name, type }) {
    if (this.state.display !== '') {
      switch (type) {
        case 'digit':
          this.processDigit(action)
          break
        case 'operator':
          this.processOperator(action)
          break
        case 'memory':
          this.processMemory(action, name)
          break
        case 'submit':
          this.processEquals()
          break
        default:
          let newValue = action(this.state.display)
          this.setState({ display: newValue, currFig: '' })
      }
    }
    if (type === 'switch') {
      this.processSwitch(action, name)
    }
  }

  render() {
    let { prevFig, currFig, operator, display, memory } = this.state
    console.log(
      'prevFig:',
      prevFig,
      'currFig:',
      currFig,
      'operand:',
      operator,
      'display:',
      display,
      'memory:',
      memory
    )
    return (
      <div>
        <div className="flex flex-column calContainer">
          <div className="topCont">
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <h2>CASIO</h2>
                </Grid.Column>
                <Grid.Column>
                  <span className="panel" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          <div className="displayCont">
            <Display value={this.state.display} />
          </div>
          <div className="keypad">
            <Grid columns={5}>
              <Grid.Row>
                {this.state.buttons.map((item, index) => (
                  <Grid.Column key={index} width={item.width}>
                    <Button
                      {...item}
                      onClickAction={this.handleClick.bind(this)}
                    />
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
