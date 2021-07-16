import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import SearchStateList from '../SearchStateList'
import './index.css'

class SearchElement extends Component {
  statesList2 = this.props

  state = {
    inputValue: '',
    isInputEntered: false,
  }

  updateStateInput = value => {
    this.setState({inputValue: value, isInputEntered: true})
  }

  handleInputValue = event => {
    const input = event.target.value
    this.updateStateInput(input.toLowerCase())
  }

  getSearchedStates = inputValue => {
    const statesList2 = this.props
    const matchedStateObject = statesList2.statesList2.filter(eachState =>
      eachState.state_name.toLowerCase().includes(inputValue),
    )
    if (inputValue !== '') {
      return (
        <ul className="search-items-container">
          {Object.entries(matchedStateObject).map(eachMatchedState => (
            <SearchStateList
              matchedStateList={eachMatchedState}
              key={eachMatchedState[0]}
            />
          ))}
        </ul>
      )
    }
    return ''
  }

  render() {
    const {inputValue, isInputEntered} = this.state
    return (
      <>
        <div className="input-container">
          <AiOutlineSearch className="search-img" />
          <input
            className="search-element"
            placeholder="Enter The State"
            type="search"
            onInputCapture={this.handleInputValue}
          />
        </div>
        {isInputEntered && this.getSearchedStates(inputValue)}
      </>
    )
  }
}
export default SearchElement
