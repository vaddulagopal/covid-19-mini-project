import {Component} from 'react'
import Select from 'react-select'

class MySelect extends Component {
  render() {
    const {selected, onChange, options} = this.props
    return (
      <Select
        className="select-option "
        value={selected}
        onChange={onChange}
        options={options}
      />
    )
  }
}

export default MySelect
