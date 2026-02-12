import React, { useState, useMemo } from 'react'
import UploadForm from '../Components/UploadForm'
import FileList from '../Components/FileList'
import SearchBar from '../Components/SearchBar'
import CategoryTabs from '../Components/CategoryTabs'
import '../styles/Dashboard.css'

const StaffDashboard = ({ files, addFile, deleteFile, updateFileName, currentRole }) => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const staffFiles = useMemo(() => {
    return files.filter(file => file.uploadedBy === 'staff')
  }, [files])

  return (
    <div className="dashboard staff-dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Staff Dashboard</h2>
          <p>Upload and manage your documents</p>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="dashboard-content">
        <div className="sidebar">
          <CategoryTabs 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
          <UploadForm addFile={addFile} />
        </div>

        <div className="main-content">
          <FileList
            files={staffFiles}
            category={activeCategory}
            searchTerm={searchTerm}
            onDelete={deleteFile}
            onRename={updateFileName}
            showActions={true}
            isAdmin={false}
          />
        </div>
      </div>
    </div>
  )
}

export default StaffDashboard