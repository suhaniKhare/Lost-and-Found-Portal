// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { fetchItems, searchItemsByKeyword } from "../api/ItemApi";
// import DashNavbar from "../components/DashbrdNavbar";
// import Filterbar from "../components/Filterbar";
// import ItemList from "../components/ItemLists";
// import "../pages/Dashboard.css";

// function Dashboard() {
//   const [filters, setFilters] = useState({ type: "" });
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const getItems = async () => {
//     try {
//       setIsLoading(true);
//       const data = await fetchItems(filters);
//       setItems(data);
//       setFilteredItems(data);
//     } catch (error) {
//       console.log(error, "error in fetching items");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getItems();
//   }, [filters]);

//   const handleSearch = async (keyword) => {
//     try {
//       setIsLoading(true);

//       if (!keyword.trim()) {
//         getItems(); // reload all items with current filters
//         return;
//       }

//       const results = await searchItemsByKeyword(keyword, filters);
//       setFilteredItems(results);
//     } catch (error) {
//       console.error("Search failed", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFilterChange = (newFilters) => {
//     setFilters((prev) => ({
//       ...prev,
//       ...newFilters,
//     }));
//   };

//   return (
//     <div className="dashboard-container">
//       <DashNavbar onSearch={handleSearch} />
//       <Filterbar filters={filters} onFilterChange={handleFilterChange} />

//       <motion.main
//         className="dashboard-content"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {isLoading ? (
//           <div className="loading-container">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//               className="spinner"
//             >
//               <i className="bi bi-arrow-repeat"></i>
//             </motion.div>
//             <p>Loading items...</p>
//           </div>
//         ) : filteredItems.length > 0 ? (
//           <ItemList items={filteredItems} />
//         ) : (
//           <motion.div
//             className="no-items-container"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//           >
//             <div className="no-items-content">
//               <i className="bi bi-binoculars"></i>
//               <h3>No Items Found</h3>
//               <p>Try adjusting your search filters or check back later</p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="refresh-btn"
//                 onClick={getItems}
//               >
//                 <i className="bi bi-arrow-clockwise"></i> Refresh
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </motion.main>
//     </div>
//   );
// }

// export default Dashboard;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchItems, searchItemsByKeyword } from "../api/ItemApi";
import DashNavbar from "../components/DashbrdNavbar";
import Filterbar from "../components/Filterbar";
import ItemList from "../components/ItemLists";
import "../pages/Dashboard.css";

function Dashboard() {
  const [filters, setFilters] = useState({ type: "" });
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");

  const getItems = async () => {
    try {
      setIsLoading(true);
      const data = await fetchItems(filters);
      setItems(data);
      // Apply search filter if there's a keyword
      if (searchKeyword) {
        const results = await searchItemsByKeyword(searchKeyword, filters);
        setFilteredItems(results);
      } else {
        setFilteredItems(data);
      }
    } catch (error) {
      console.log(error, "error in fetching items");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, [filters]); // Re-fetch when filters change

  const handleSearch = async (keyword) => {
    try {
      setIsLoading(true);
      setSearchKeyword(keyword);

      if (!keyword.trim()) {
        // If search is empty, show all items with current filters
        setFilteredItems(items);
        return;
      }

      const results = await searchItemsByKeyword(keyword, filters);
      setFilteredItems(results);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className="dashboard-container">
      <DashNavbar onSearch={handleSearch} />
      <Filterbar filters={filters} onFilterChange={handleFilterChange} />

      <motion.main
        className="dashboard-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <div className="loading-container">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="spinner"
            >
              <i className="bi bi-arrow-repeat"></i>
            </motion.div>
            <p>Loading items...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <ItemList items={filteredItems} />
        ) : (
          <motion.div
            className="no-items-container"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <div className="no-items-content">
              <i className="bi bi-binoculars"></i>
              <h3>No Items Found</h3>
              <p>Try adjusting your search filters or check back later</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="refresh-btn"
                onClick={getItems}
              >
                <i className="bi bi-arrow-clockwise"></i> Refresh
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}

export default Dashboard;
