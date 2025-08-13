# 📊 Interface Monitoring Dashboard

A responsive web-based dashboard to monitor interface execution between HR systems (e.g., SAP SuccessFactors, SAP ECP, or third-party apps).  
Includes **summary metrics, trends visualization, and live logs table** with filtering & pagination.

---

## 🚀 Features
### **1. Dashboard Page**
- Summary cards showing **Success** and **Failure** counts.
- Time range filter (Last Hour, Last 24 Hours, Last Week, Last Month, Custom Date).
- Execution trend chart (Success vs Failure).

### **2. Logs Page**
- Live logs table with:
  - Interface Name
  - Integration Key
  - Status (color-coded tags)
  - Message
  - Timestamp
- Column filters and pagination.
- Mobile-friendly **card view** for logs.
- Advanced filter button placeholder.

### **3. Responsive Design**
- Fully responsive for **desktop, tablet, and mobile**.
- Table view on desktop, card view on mobile.

---

## 🛠️ Tech Stack
**Frontend:**
- React.js (Vite or CRA)
- Context API for state management
- Chart.js + react-chartjs-2 (for charts)
- Normal CSS (no frameworks)

**Backend (Optional for Live Data):**
- Node.js + Express
- MongoDB (for storing logs)
- API endpoints for summary & logs

---

## 📂 Folder Structure
