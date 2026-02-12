import React, { useState, useMemo } from 'react'
import FileList from '../Components/FileList'
import SearchBar from '../Components/SearchBar'
import CategoryTabs from '../Components/CategoryTabs'
import StorageMetrics from '../Components/StorageMetrics'
import '../styles/Dashboard.css'

const AdminDashboard = ({ files, deleteFile, verifyFile }) => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="dashboard admin-dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h2>Admin Dashboard</h2>
          <p>Manage all documents in the vault</p>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="dashboard-content">
        <div className="sidebar">
          <CategoryTabs 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
          <StorageMetrics files={files} />
        </div>

        <div className="main-content">
          <div className="admin-stats">
            <div className="stat-card">
              <span className="stat-label">Total Documents</span>
              <span className="stat-value">{files.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Verified</span>
              <span className="stat-value">
                {files.filter(f => f.verified).length}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Pending Review</span>
              <span className="stat-value">
                {files.filter(f => !f.verified).length}
              </span>
            </div>
          </div>

          <FileList
            files={files}
            category={activeCategory}
            searchTerm={searchTerm}
            onDelete={deleteFile}
            onRename={(id, name) => {}}
            onVerify={verifyFile}
            showActions={true}
            isAdmin={true}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard