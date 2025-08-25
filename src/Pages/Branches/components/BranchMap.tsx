import React from 'react';
import { MapCoordinates } from '../../../utils/maps';

// Props interface for BranchMap component
interface BranchMapProps {
  coordinates: MapCoordinates;
  location: string;
  className?: string;
  height?: string;
  width?: string;
  showMarker?: boolean;
  zoom?: number;
}

// BranchMap component for displaying branch location on a map
// Currently renders a placeholder that will be replaced with actual map integration
// This component is ready for Leaflet or Mapbox GL JS integration
const BranchMap: React.FC<BranchMapProps> = ({
  coordinates,
  location,
  className = '',
  height = '200px',
  width = '100%',
  showMarker = true,
  zoom = 15
}) => {
  
  // Validate coordinates before rendering
  const isValidCoords = coordinates && 
    coordinates.latitude >= -90 && coordinates.latitude <= 90 &&
    coordinates.longitude >= -180 && coordinates.longitude <= 180;

  if (!isValidCoords) {
    console.warn(`Invalid coordinates for location: ${location}`, coordinates);
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={{ height, width }}
        role="img"
        aria-label={`Map placeholder for ${location}`}
      >
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          Map unavailable
        </span>
      </div>
    );
  }

  // TODO: Replace this placeholder with actual map implementation
  // Implementation steps for Leaflet integration:
  // 1. Install leaflet: npm install leaflet @types/leaflet
  // 2. Import leaflet CSS in index.css or component
  // 3. Use useEffect to initialize map with L.map()
  // 4. Add tile layer using L.tileLayer() with config from utils/maps.ts
  // 5. Add marker using L.marker() if showMarker is true
  // 6. Set view using L.setView() with coordinates and zoom
  
  // Example Leaflet implementation (commented out - to be implemented):
  /*
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      const map = L.map(mapRef.current).setView(
        [coordinates.latitude, coordinates.longitude], 
        zoom
      );

      // Add tile layer
      L.tileLayer(getCurrentMapConfig().tileLayer, {
        attribution: getCurrentMapConfig().attribution,
        maxZoom: getCurrentMapConfig().maxZoom,
      }).addTo(map);

      // Add marker if requested
      if (showMarker) {
        L.marker([coordinates.latitude, coordinates.longitude])
          .addTo(map)
          .bindPopup(location);
      }

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates, location, showMarker, zoom]);
  */

  // Placeholder implementation - shows coordinates and location info
  // This will be replaced with actual map rendering
  return (
    <div 
      className={`bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border border-white/20 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ${className}`}
      style={{ height, width }}
      role="img"
      aria-label={`Interactive map showing location of ${location} at coordinates ${coordinates.latitude}, ${coordinates.longitude}`}
      onClick={() => {
        // Open Google Maps with the branch location
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`;
        window.open(googleMapsUrl, '_blank');
      }}
    >
      {/* Map placeholder content with enhanced design */}
      <div className="h-full w-full flex flex-col items-center justify-center p-2 text-center relative overflow-hidden">
        
        {/* Animated background grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className="border border-green-300 dark:border-green-700"></div>
            ))}
          </div>
        </div>
        
        {/* Map pin icon */}
        <div className="bg-white dark:bg-gray-800 rounded-full p-2 mb-2 shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300">
          <svg 
            className="w-5 h-5 text-red-500 animate-pulse" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Location info */}
        <div className="relative z-10">
          <h4 className="font-semibold text-xs text-gray-800 dark:text-gray-200 mb-1 truncate max-w-full">
            {location}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
            {coordinates.latitude.toFixed(3)}, {coordinates.longitude.toFixed(3)}
          </p>
        </div>
        
        {/* Click hint */}
        <div className="absolute bottom-1 right-1 bg-black/20 dark:bg-white/20 rounded-full p-1 opacity-70 hover:opacity-100 transition-opacity duration-300">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </div>
        
        {/* Loading animation overlay for when real maps load */}
        <div className="hidden absolute inset-0 bg-white/80 dark:bg-gray-900/80 items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
        </div>
      </div>
    </div>
  );
};

export default BranchMap;

// Usage example:
// <BranchMap 
//   coordinates={{ latitude: 27.7172, longitude: 85.3240 }} 
//   location="Kathmandu Main Branch"
//   height="300px"
//   zoom={16}
//   showMarker={true}
// />
