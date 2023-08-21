import React, { useEffect, useState } from "react";

const Search = () => {
  const [filter, setFilter] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(
        `http://localhost:1337/api/categories?filter=name`
      );
      const resData = await res.json();
      const categoriesNames = resData.data.map((item) => item);
      setCategories(categoriesNames);
    };

    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/restaurants?fields=name"
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const resData = await res.json();
        const restaurantNames = resData.data.map(
          (item) => item.attributes.name
        );
        setRestaurants(restaurantNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const filterRestaurants = async (filter) => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/categories/${filter}?populate=restaurants`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const resData = await res.json();
        const restaurants = resData.data.attributes.restaurants.data;
        let filteredData = [];
        for (let i = 0; i < restaurants.length; i++) {
          filteredData.push(restaurants[i].attributes.name);
        }
        setRestaurants(filteredData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (filter == 0) {
      fetchData();
    } else {
      filterRestaurants(filter);
    }
    getCategories();
  }, [filter]);

  const filterHandler = (event) => {
    // console.log(event.currentTarget.id);
    setFilter(event.currentTarget.id);
  };

  return (
    <div className="main-search">
      <form className="filters">
        <div className="filter">
          <input
            type="radio"
            id="0"
            datacategory="0"
            onChange={filterHandler}
            name="category"
          />
          <label htmlFor="vegan">All</label>
        </div>
        {categories.map((category, index) => {
          return (
            <div className="filter">
              <input
                type="radio"
                id={category.id}
                datacategory="0"
                onChange={filterHandler}
                name="category"
              />
              <label htmlFor="vegan">{category.attributes.name}</label>
            </div>
          );
        })}
      </form>
      <div className="search-results">
        {restaurants.map((restaurant, index) => (
          <div key={index}>{restaurant}</div>
        ))}
      </div>
    </div>
  );
};

export default Search;
