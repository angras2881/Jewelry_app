import React, { useState, useEffect } from 'react';

function Sets() {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jewelry?category=Sets');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSets(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSets();
  }, []);

  if (loading) {
    return <p>Loading sets...</p>;
  }

  if (error) {
    return <p>Error loading sets: {error.message}</p>;
  }

  return (
    <div>
      <h2>Sets</h2>
      <div className="product-list">
        {sets.map((set) => (
          <div key={set._id} className="product-item">
            <h3>{set.name}</h3>
            {set.images && set.images.length > 0 && (
              <img src={set.images[0]} alt={set.name} style={{ maxWidth: '200px' }} />
            )}
            <p>Price: ${set.price}</p>
            {/* Add more product details as needed */}
            <button>View Details</button> {/* Example: Button to view more details */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sets;