import React from 'react';
import './Filter.scss';
import { countryOptions } from 'constants/countryOptions';

const Filters = ({ onFilterChange }) => {
    return (
        <div className="leaderboard-filters">
            <select name="sortBy" onChange={onFilterChange}>
                <option value="rating-asc">Rating: Low to High</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="problems-asc">Problems Solved: Low to High</option>
                <option value="problems-desc">Problems Solved: High to Low</option>
                <option value="username-asc">Username: A-Z</option>
                <option value="username-desc">Username: Z-A</option>
            </select>

            <select name="filterCountry" onChange={onFilterChange}>
                <option value="">All Countries</option>
                {countryOptions.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                ))}
            </select>
        </div>
    );
};

export default Filters;
