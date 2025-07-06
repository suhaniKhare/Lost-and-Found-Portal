
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserItems } from "../api/ItemApi";
import DashNavbar from "../components/DashbrdNavbar";
import ItemList from "../components/ItemLists";
import "./MyListings.css"; // Create this CSS file

function MyListings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserItems = async () => {
      try {
        const data = await fetchUserItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching user items:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserItems();
  }, []);


  return (
    <div className="my-listings-container">
      <DashNavbar />
      <main className="my-listings-content">
        <div className="my-listings-header">
          <h2>My Listings</h2>
          <Link to="/postItem" className="new-listing-btn">
            <i className="bi bi-plus-circle"></i> New Listing
          </Link>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading your listings...</p>
          </div>
        ) : items.length > 0 ? (
          <ItemList items={items} />
        ) : (
          <div className="empty-listings">
            <div className="empty-icon">
              <i className="bi bi-inbox"></i>
            </div>
            <h3>No Listings Yet</h3>
            <p>
              You haven't posted any items yet. Start by posting an item to help
              others find their lost belongings or to find your own lost items.
            </p>
            <Link to="/postItem" className="cta-button">
              Create Your First Listing
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyListings;
