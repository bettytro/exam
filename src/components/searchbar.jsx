import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchProfiles, searchVenues } from '../helpers/apidata';
const SearchBar = (props) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    
    const search = async (e) => {
        e.preventDefault();
      
        const venues = await searchVenues(query);
        const profiles = await searchProfiles(query);
      
        const typedVenues = venues.data.map(venue => ({ ...venue, type: 'venue' }));
        const typedProfiles = profiles.data.map(profile => ({ ...profile, type: 'profile' }));
      
        setResults([...typedVenues, ...typedProfiles]);
      };

    return (
        <div>
            <form onSubmit={search}>
                <input
                    type="text"
                    value={query}
                    className='border border-gray-300 p-2 rounded mt-6 mb-2 w-full'
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                <button className='bg-title py-2 px-4 text-white' type="submit">Search</button>
            </form>
            {results.length > 0 ? (
      results.slice(0, 10).map((result, index) => {
        let url;
        if (result.type === 'profile') {
          url = `/profile/${result.name}`;
        } else if (result.type === 'venue') {
          url = `/venues/${result.id}`;
        }

        return (
          <Link key={index} to={url} className="block p-2 hover:bg-gray-100 border my-1 rounded" onClick={props.onClose}>
            {result.name}
          </Link>
        );
      })
    ) : (
      <p className="text-center text-gray-500">No results found</p>
    )}
        </div>
    );
};

export default SearchBar;

