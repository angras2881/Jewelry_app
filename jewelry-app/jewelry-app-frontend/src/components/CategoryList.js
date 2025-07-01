import React, { useState, useEffect } from 'react';

function CategoryList({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jewelry/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error loading categories: {error.message}</p>;
  }

  return (
    <div>
      <h2>Shop by Category</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <button onClick={() => onCategorySelect(category)}>{category}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;