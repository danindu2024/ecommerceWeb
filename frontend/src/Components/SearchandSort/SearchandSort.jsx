import React, { useContext, useState, useEffect, useRef } from 'react';
import './SearchandSort.css';
import { ShopContext } from '../../Context/ShopContext';
import { FiSearch, FiX, FiChevronDown } from 'react-icons/fi'; // react-icons for modern look

const SearchAndSort = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    sortOption, 
    setSortOption, 
    filteredProducts 
  } = useContext(ShopContext);
  
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length >= 2) {
        try {
          const response = await fetch(`http://localhost:4000/suggestions?q=${encodeURIComponent(searchTerm)}`);
          const data = await response.json();
          setSuggestions(data.suggestions || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setActiveSuggestion(-1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.text);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(suggestions[activeSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
      default:
        break;
    }
  };

  const getSortOptionLabel = (value) => {
    const options = {
      'default': 'Default',
      'price-low-high': 'Price: Low to High',
      'price-high-low': 'Price: High to Low',
      'name-a-z': 'Name: A to Z',
      'name-z-a': 'Name: Z to A',
      'newest': 'Newest First',
      'oldest': 'Oldest First'
    };
    return options[value] || 'Default';
  };

  return (
    <div className="search-sort-container">
      {/* Search Section */}
      <div className="search-section" ref={searchRef}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products or categories..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            className={`search-input ${!suggestions.length && searchTerm ? 'loading' : ''}`}
            autoComplete="off"
          />

          {searchTerm && (
            <button onClick={handleClearSearch} className="clear-search" aria-label="Clear search">
              <FiX />
            </button>
          )}
          <div className="search-icon">
            <FiSearch />
          </div>

          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown" ref={suggestionsRef}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`suggestion-item ${index === activeSuggestion ? 'active' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setActiveSuggestion(index)}>
                  <span className="suggestion-text">{suggestion.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Sort Section */}
      <div className="sort-section">
        <label htmlFor="sort-select">Sort by:</label>
        <div className="sort-select-wrapper">
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select">
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A to Z</option>
            <option value="name-z-a">Name: Z to A</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <div className="sort-icon">
            <FiChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndSort;
