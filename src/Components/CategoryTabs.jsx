import React from 'react'
import { 
  FileText, 
  Scale, 
  User, 
  Briefcase,
  Folder
} from 'lucide-react'

const CategoryTabs = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: null, name: 'All Files', icon: <Folder size={18} /> },
    { id: 'Invoices', name: 'Invoices', icon: <FileText size={18} /> },
    { id: 'Legal', name: 'Legal', icon: <Scale size={18} /> },
    { id: 'Personal', name: 'Personal', icon: <User size={18} /> },
    { id: 'Identity', name: 'Identity', icon: <Briefcase size={18} /> }
  ]

  return (
    <div className="category-tabs">
      {categories.map(cat => (
        <button
          key={cat.id || 'all'}
          className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
          onClick={() => setActiveCategory(cat.id)}
        >
          {cat.icon}
          {cat.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs