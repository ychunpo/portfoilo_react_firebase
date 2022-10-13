import React, { useState } from 'react'



const InputBox = (props) => {
  const { itemData } = props;
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="form-item">
      <label className="form-label">{itemData.label}</label>
      <input
        type={itemData.type}
        name={itemData.name}
        className="form-input"
        value={formData.use || ''}
        onChange={(e) => handleChange(e)}
      />
    </div>
  )
}

export default InputBox
