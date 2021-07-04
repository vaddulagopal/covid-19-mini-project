import {Link} from 'react-router-dom'
import './index.css'

const SearchStateList = props => {
  const {matchedStateList} = props
  console.log(matchedStateList)
  const id = matchedStateList[0][0]
  return (
    <Link to={`/state/${id}`}>
      <li className="search-state-item">state name</li>
    </Link>
  )
}

export default SearchStateList
