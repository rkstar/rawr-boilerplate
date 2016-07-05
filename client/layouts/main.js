import React from 'react'

// here we're going to use React.cloneElement because we want
// to pass down any props that came into this layout to all of
// the children that it renders...
export default (props)=>(
  <main>
    {React.cloneElement(props.children, props)}
  </main>
)