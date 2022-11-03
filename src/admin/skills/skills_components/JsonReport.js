import React from 'react'

const JsonReport = (Data) => {
  return (
    <div>
      <textarea
        readOnly={true}
        rows={25}
        cols={80}
        value={JSON.stringify(Data, null, 2)}
      />
    </div>
  )
}

export default JsonReport;