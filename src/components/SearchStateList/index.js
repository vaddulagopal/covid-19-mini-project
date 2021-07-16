import {Link} from 'react-router-dom'
import './index.css'

const SearchStateList = props => {
  const {matchedStateList} = props
  const id = matchedStateList[1].state_code
  const stateName = matchedStateList[1].state_name
  return (
    <Link className="link-style" to={`/state/${id}`}>
      <li className="search-state-item-list">
        <div className="search-state-item">
          <span className="search-state-name">{stateName}</span>
          <div className="state-code-container">
            <span className="search-state-code">{id}</span>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SearchStateList
