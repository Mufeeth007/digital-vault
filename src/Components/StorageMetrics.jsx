import React, { useMemo } from 'react'
import { PieChart, Database, HardDrive } from 'lucide-react'

const StorageMetrics = ({ files }) => {
  const metrics = useMemo(() => {
    const categoryCount = {}
    let totalSize = 0
    
    files.forEach(file => {
      categoryCount[file.category] = (categoryCount[file.category] || 0) + 1
      const sizeNum = parseFloat(file.size) || 0
      totalSize += sizeNum
    })

    return { categoryCount, totalSize }
  }, [files])

  return (
    <div className="storage-metrics">
      <div className="metrics-header">
        <PieChart className="metrics-icon" />
        <h3>Storage Analytics</h3>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon total">
            <Database size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total Files</span>
            <span className="metric-value">{files.length}</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon storage">
            <HardDrive size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Storage Used</span>
            <span className="metric-value">{metrics.totalSize.toFixed(1)} MB</span>
          </div>
        </div>
      </div>

      <div className="category-breakdown">
        <h4>Files by Category</h4>
        <div className="breakdown-list">
          {Object.entries(metrics.categoryCount).map(([category, count]) => (
            <div key={category} className="breakdown-item">
              <span className="category-name">{category}</span>
              <div className="breakdown-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    width: `${(count / files.length) * 100}%`,
                    backgroundColor: getCategoryColor(category)
                  }}
                ></div>
              </div>
              <span className="category-count">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const getCategoryColor = (category) => {
  const colors = {
    'Invoices': '#4f46e5',
    'Legal': '#10b981',
    'Personal': '#f59e0b',
    'Identity': '#ef4444'
  }
  return colors[category] || '#6b7280'
}

export default StorageMetrics