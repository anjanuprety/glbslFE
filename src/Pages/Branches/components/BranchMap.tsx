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
      className={`bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden ${className}`}
      style={{ height, width }}
      role="img"
      aria-label={`Map showing location of ${location} at coordinates ${coordinates.latitude}, ${coordinates.longitude}`}
    >
      {/* Map placeholder content */}
      <div className="h-full w-full flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-full p-3 mb-3 shadow-md">
          <svg 
            className="w-6 h-6 text-green-600 dark:text-green-400" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </div>
        <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">
          {location}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          Map integration pending
        </p>
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
