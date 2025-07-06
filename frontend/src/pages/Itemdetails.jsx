
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleItem } from '../api/ItemApi';
import DeleteBtn from '../components/DeleteBtn';
import EditBtn from '../components/EditBtn';
import './Itemdetails.css';

function Itemdetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchSingleItem(id);
        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setLoading(false);
      }
    };
    loadItem();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!item) {
    return <div className="not-found">Item not found</div>;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user && item.createdBy === user.id;

  return (
    <div className="item-details-container">
      <div className="item-details-card">
        <div className="item-image-container">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="item-image"
          />
        </div>
        
        <div className="item-content">
          <h2 className="item-title">{item.title}</h2>
          <p className="item-description">{item.description}</p>
          
          <div className="item-meta">
            <span className={`item-type ${item.type}`}>
              {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
            </span>
            <span className="item-date">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          {isOwner && (
            <div className="item-actions">
              <EditBtn itemId={item._id} />
              <DeleteBtn itemId={item._id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Itemdetails;