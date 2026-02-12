import React, { useState, useMemo } from 'react'
import { 
  FileText, 
  Image, 
  File, 
  Trash2, 
  Edit2, 
  CheckCircle, 
  XCircle,
  Eye,
  Download,
  Check
} from 'lucide-react'
import '../styles/FileList.css'

const FileList = ({ 
  files, 
  category, 
  searchTerm, 
  onDelete, 
  onRename, 
  onVerify,
  showActions = true,
  isAdmin = false 
}) => {
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')

  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesCategory = !category || file.category === category
      const matchesSearch = !searchTerm || 
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.category.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [files, category, searchTerm])

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      return <Image className="file-icon image" />
    } else if (ext === 'pdf') {
      return <FileText className="file-icon pdf" />
    } else if (['doc', 'docx'].includes(ext)) {
      return <File className="file-icon doc" />
    }
    return <File className="file-icon" />
  }

  const handleRenameStart = (id, currentName) => {
    setEditingId(id)
    setEditValue(currentName)
  }

  const handleRenameSave = (id) => {
    if (editValue.trim()) {
      onRename(id, editValue)
    }
    setEditingId(null)
    setEditValue('')
  }

  const handleRenameCancel = () => {
    setEditingId(null)
    setEditValue('')
  }

  if (filteredFiles.length === 0) {
    return (
      <div className="empty-state">
        <FileText size={64} className="empty-icon" />
        <h3>Your Vault is Empty</h3>
        <p>Upload your first document to get started</p>
      </div>
    )
  }

  return (
    <div className="file-list">
      <div className="file-list-header">
        <div className="file-col name">Name</div>
        <div className="file-col category">Category</div>
        <div className="file-col size">Size</div>
        <div className="file-col date">Upload Date</div>
        {isAdmin && <div className="file-col uploaded-by">Uploaded By</div>}
        {isAdmin && <div className="file-col status">Status</div>}
        {showActions && <div className="file-col actions">Actions</div>}
      </div>

      <div className="file-list-items">
        {filteredFiles.map(file => (
          <div key={file.id} className="file-item">
            <div className="file-col name">
              {getFileIcon(file.name)}
              {editingId === file.id ? (
                <div className="rename-input-container">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="rename-input"
                    autoFocus
                  />
                  <button 
                    onClick={() => handleRenameSave(file.id)}
                    className="rename-btn save"
                  >
                    <Check size={14} />
                  </button>
                  <button 
                    onClick={handleRenameCancel}
                    className="rename-btn cancel"
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              ) : (
                <span className="file-name">{file.name}</span>
              )}
            </div>
            
            <div className="file-col category">
              <span className={`category-tag ${file.category.toLowerCase()}`}>
                {file.category}
              </span>
            </div>
            
            <div className="file-col size">{file.size}</div>
            <div className="file-col date">{file.uploadDate}</div>
            
            {isAdmin && (
              <div className="file-col uploaded-by">
                <span className={`role-tag ${file.uploadedBy}`}>
                  {file.uploadedBy}
                </span>
              </div>
            )}
            
            {isAdmin && (
              <div className="file-col status">
                {file.verified ? (
                  <span className="status-verified">
                    <CheckCircle size={16} />
                    Verified
                  </span>
                ) : (
                  <span className="status-pending">
                    <XCircle size={16} />
                    Pending
                  </span>
                )}
              </div>
            )}
            
            {showActions && (
              <div className="file-col actions">
                {!isAdmin && (
                  <button
                    onClick={() => handleRenameStart(file.id, file.name)}
                    className="action-btn rename"
                    title="Rename"
                  >
                    <Edit2 size={16} />
                  </button>
                )}
                
                {isAdmin && (
                  <button
                    onClick={() => onVerify(file.id)}
                    className={`action-btn verify ${file.verified ? 'verified' : ''}`}
                    title={file.verified ? 'Unverify' : 'Verify'}
                  >
                    {file.verified ? <CheckCircle size={16} /> : <Eye size={16} />}
                  </button>
                )}
                
                <button
                  onClick={() => onDelete(file.id)}
                  className="action-btn delete"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
                
                <button
                  className="action-btn download"
                  title="Download"
                  onClick={() => alert(`Downloading ${file.name}`)}
                >
                  <Download size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileList