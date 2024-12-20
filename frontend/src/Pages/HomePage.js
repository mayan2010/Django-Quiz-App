import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Ensure you have a CSS file named 'HomePage.css' in the same directory
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Fetch categories from Django app
    axios.get('http://127.0.0.1:8000/get_categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && selectedCategory) {
      history.push(`/quiz?name=${name}&category=${selectedCategory}`);
    } else {
      alert('Please enter your name and select a category.');
    }
  };

  return (
    <div>
      <h1>Welcome to the Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Category:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default HomePage;