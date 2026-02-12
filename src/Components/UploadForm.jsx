import React, { useState } from 'react'
import { Upload as UploadIcon, FileText, X } from 'lucide-react'
import '../styles/UploadForm.css'

const UploadForm = ({ addFile }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Invoices',
    size: ''
  })
  const [errors, setErrors] = useState({})

  const categories = ['Invoices', 'Legal', 'Personal', 'Identity']

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'File name is required'
    }
    if (!formData.size || parseFloat(formData.size) <= 0) {
      newErrors.size = 'Valid file size is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    addFile(formData)
    setFormData({ name: '', category: 'Invoices', size: '' })
    setErrors({})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="upload-form-container">
      <div className="upload-header">
        <UploadIcon className="upload-icon" />
        <h3>Upload New Document</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="name">
            <FileText size={16} />
            File Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., invoice_january_2024.pdf"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="size">File Size (MB) *</label>
          <input
            type="number"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="e.g., 2.5"
            step="0.1"
            min="0.1"
            className={errors.size ? 'error' : ''}
          />
          {errors.size && <span className="error-message">{errors.size}</span>}
        </div>

        <button type="submit" className="upload-btn">
          <UploadIcon size={18} />
          Upload Document
        </button>
      </form>
    </div>
  )
}

export default UploadForm