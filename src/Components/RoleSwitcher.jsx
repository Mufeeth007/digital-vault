import React from 'react'
import { User, Shield } from 'lucide-react'
import '../styles/RoleSwitcher.css'

const RoleSwitcher = ({ role, setRole }) => {
  return (
    <div className="role-switcher">
      <button
        className={`role-btn ${role === 'staff' ? 'active' : ''}`}
        onClick={() => setRole('staff')}
      >
        <User size={18} />
        Staff View
      </button>
      <button
        className={`role-btn ${role === 'admin' ? 'active' : ''}`}
        onClick={() => setRole('admin')}
      >
        <Shield size={18} />
        Admin View
      </button>
    </div>
  )
}

export default RoleSwitcher