import React, { useState, useEffect } from 'react'
import { Shield, Lock, Upload } from 'lucide-react'
import RoleSwitcher from './Components/RoleSwitcher'
import StaffDashboard from './pages/StaffDashboard'
import AdminDashboard from './pages/AdminDashboard'
import './styles/App.css'

function App() {
  const [role, setRole] = useState('staff')
  const [files, setFiles] = useState([])

  useEffect(() => {
    const savedFiles = localStorage.getItem('documentVault')
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles))
    } else {
      // Load dummy data if no data exists
      const dummyFiles = [
        { id: 1, name: 'invoice_q1_2024.pdf', category: 'Invoices', size: '2.4 MB', uploadDate: '2024-01-15', uploadedBy: 'staff', verified: true },
        { id: 2, name: 'contract_agreement.docx', category: 'Legal', size: '1.8 MB', uploadDate: '2024-01-10', uploadedBy: 'admin', verified: true },
        { id: 3, name: 'passport_scan.jpg', category: 'Identity', size: '4.2 MB', uploadDate: '2024-01-05', uploadedBy: 'staff', verified: false },
        { id: 4, name: 'tax_returns_2023.pdf', category: 'Invoices', size: '3.1 MB', uploadDate: '2024-01-20', uploadedBy: 'staff', verified: true },
        { id: 5, name: 'company_policy.pdf', category: 'Legal', size: '5.6 MB', uploadDate: '2024-01-12', uploadedBy: 'admin', verified: true },
        { id: 6, name: 'vacation_photos.png', category: 'Personal', size: '8.7 MB', uploadDate: '2024-01-18', uploadedBy: 'staff', verified: false },
      ]
      setFiles(dummyFiles)
      localStorage.setItem('documentVault', JSON.stringify(dummyFiles))
    }
  }, [])

  const addFile = (file) => {
    const newFile = {
      id: Date.now(),
      ...file,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: role,
      verified: false
    }
    const updatedFiles = [...files, newFile]
    setFiles(updatedFiles)
    localStorage.setItem('documentVault', JSON.stringify(updatedFiles))
  }

  const deleteFile = (id) => {
    const updatedFiles = files.filter(file => file.id !== id)
    setFiles(updatedFiles)
    localStorage.setItem('documentVault', JSON.stringify(updatedFiles))
  }

  const updateFileName = (id, newName) => {
    const updatedFiles = files.map(file => 
      file.id === id ? { ...file, name: newName } : file
    )
    setFiles(updatedFiles)
    localStorage.setItem('documentVault', JSON.stringify(updatedFiles))
  }

  const verifyFile = (id) => {
    const updatedFiles = files.map(file => 
      file.id === id ? { ...file, verified: !file.verified } : file
    )
    setFiles(updatedFiles)
    localStorage.setItem('documentVault', JSON.stringify(updatedFiles))
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <Shield className="logo-icon" />
          <h1>Digital Document Vault</h1>
        </div>
        <div className="header-right">
          <RoleSwitcher role={role} setRole={setRole} />
        </div>
      </header>

      <main className="app-main">
        <div className="vault-status">
          <Lock size={20} />
          <span>Vault Status: <strong>Secure</strong></span>
          <span className="file-count">{files.length} documents stored</span>
        </div>

        {role === 'staff' ? (
          <StaffDashboard 
            files={files}
            addFile={addFile}
            deleteFile={deleteFile}
            updateFileName={updateFileName}
            currentRole={role}
          />
        ) : (
          <AdminDashboard 
            files={files}
            deleteFile={deleteFile}
            verifyFile={verifyFile}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2024 Digital Document Vault. All rights reserved. <Upload size={16} /></p>
      </footer>
    </div>
  )
}

export default App