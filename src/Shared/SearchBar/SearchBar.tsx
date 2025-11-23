import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../contexts/SearchContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { BiSearch } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface SearchBarProps {
  isMobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isMobile = false }) => {
  const { searchQuery, setSearchQuery, searchResults, isSearching, clearSearch } = useSearch();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Minimize searchbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isExpanded) {
        setIsExpanded(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  // Open dropdown when there are results
  useEffect(() => {
    if (searchResults.length > 0) {
      setIsOpen(true);
    } else if (!searchQuery.trim()) {
      setIsOpen(false);
    }
  }, [searchResults, searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      setIsOpen(true);
    }
  };

  const handleResultClick = (path: string) => {
    navigate(path);
    clearSearch();
    setIsOpen(false);
  };

  const handleClearSearch = () => {
    clearSearch();
    setIsOpen(false);
    setIsExpanded(false); // Minimize searchbar on clear
  };

  const handleInputFocus = () => {
    if (searchQuery.trim() && searchResults.length > 0) {
      setIsOpen(true);
    }
  };

  const handleSearchIconClick = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div 
      ref={searchContainerRef} 
      className={`relative ${isMobile ? 'w-full px-3 py-2' : ''}`}
    >
      {/* Desktop: Collapsible Search */}
      {!isMobile && (
        <div className="flex items-center">
          {/* Search Icon Button */}
          {!isExpanded && (
            <button
              onClick={handleSearchIconClick}
              className="p-2 text-white hover:text-khaki transition-colors"
              aria-label="Open search"
            >
              <BiSearch className="w-5 h-5" />
            </button>
          )}
          
          {/* Expanded Search Input */}
          {isExpanded && (
            <div className={`relative flex items-center bg-white/10 dark:bg-white/5 rounded-lg border border-white/20 focus-within:border-khaki transition-all duration-300 w-64 lg:w-72`}>
              <BiSearch className="absolute left-3 text-white/70 w-5 h-5" />
              
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder={language === 'en' ? 'Search...' : 'खोज्नुहोस्...'}
                className="w-full pl-10 pr-10 py-2 bg-transparent text-white placeholder-white/60 outline-none text-sm font-Lora"
              />
              
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 text-white/70 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <IoMdClose className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Mobile: Always Expanded */}
      {isMobile && (
        <div className="relative flex items-center bg-white dark:bg-normalBlack rounded-lg border border-gray-300 dark:border-gray-600 focus-within:border-khaki transition-all duration-300">
          <BiSearch className="absolute left-3 text-gray-500 dark:text-gray-400 w-5 h-5" />
          
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={language === 'en' ? 'Search...' : 'खोज्नुहोस्...'}
            className="w-full pl-10 pr-10 py-2 bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none text-sm font-Lora"
          />
          
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="Clear search"
            >
              <IoMdClose className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* Search Results Dropdown */}
      {isOpen && (searchResults.length > 0 || searchQuery.trim()) && (
        <div className={`absolute ${isMobile ? 'top-full mt-2 left-3 right-3' : 'top-full mt-2 left-0 right-0'} bg-white dark:bg-normalBlack rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-[400px] overflow-y-auto`}>
          {isSearching ? (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-khaki mx-auto"></div>
              <p className="mt-2 text-sm font-Lora">
                {language === 'en' ? 'Searching...' : 'खोजिदै...'}
              </p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="px-4 py-2 bg-gray-50 dark:bg-lightBlack border-b border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 font-Lora">
                  {language === 'en' 
                    ? `${searchResults.length} result${searchResults.length > 1 ? 's' : ''} found` 
                    : `${searchResults.length} परिणाम फेला पर्यो`}
                </p>
              </div>
              
              <ul>
                {searchResults.map((result) => (
                  <li key={result.id}>
                    <button
                      onClick={() => handleResultClick(result.path)}
                      className="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-lightBlack transition-colors duration-200 text-left border-b border-gray-100 dark:border-gray-800 last:border-b-0 group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-khaki transition-colors font-Lora mb-1 truncate">
                            {language === 'ne' ? result.titleNe : result.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-Lora">
                            {language === 'ne' ? result.categoryNe : result.category}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <MdKeyboardArrowRight className="w-5 h-5 text-gray-400 group-hover:text-khaki group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : searchQuery.trim() && !isSearching ? (
            <div className="px-4 py-8 text-center">
              <BiSearch className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400 font-Lora mb-1">
                {language === 'en' ? 'No results found' : 'कुनै परिणाम फेला परेन'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 font-Lora">
                {language === 'en' 
                  ? 'Try searching with different keywords' 
                  : 'फरक कुञ्जी शब्दहरूसँग खोज्ने प्रयास गर्नुहोस्'}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
