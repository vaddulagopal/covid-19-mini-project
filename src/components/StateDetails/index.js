const StateDetails = props => {
  const {match} = props
  const {params} = match
  const {stateId} = params

  return <h1>{stateId}</h1>
}

export default StateDetails
