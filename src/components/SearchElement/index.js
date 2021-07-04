import {Component} from 'react'
import SearchStateList from '../SearchStateList'

class SearchElement extends Component {
  statesList = this.props

  state = {
    inputValue: '',
  }

  updateStateInput = value => {
    this.setState({inputValue: value})
  }

  handleInputValue = event => {
    const inputValue = this.state
    if (event.key === 'Enter') {
      console.log(event.key)
    } else {
      const stateValue = inputValue + event.key
      this.updateStateInput(stateValue)
    }
  }

  getSearchedStates = inputValue => {
    const statesList = this.props

    console.log(statesList.statesList.statesList)
    const matchedStateObject = statesList.statesList.statesList.filter(
      eachState => eachState.state_name.includes(inputValue),
    )
    return (
      <ul>
        {Object.entries(matchedStateObject).map(eachMatchedState => (
          <SearchStateList
            matchedStateList={eachMatchedState}
            key={eachMatchedState[0][0]}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {inputValue} = this.state
    return (
      <div className="search-home-container">
        <input
          type="search"
          onKeyDown={this.handleInputValue}
          value={inputValue}
        />
        {this.getSearchedStates(inputValue)}
      </div>
    )
  }
}
export default SearchElement
