// Maps utility abstraction for Global IME Bank branches
// This file abstracts map initialization and tile-provider configuration
// Currently set up for Leaflet with OpenStreetMap tiles, but can be easily
// switched to Mapbox, Google Maps, or other providers by changing configuration here

export interface MapCoordinates {
  latitude: number;
  longitude: number;
}

export interface MapConfig {
  center: MapCoordinates;
  zoom: number;
  maxZoom: number;
  tileLayer: string;
  attribution: string;
}

// Default map configuration using OpenStreetMap tiles (free and open-source)
// For production, consider switching to Mapbox or Google Maps for better styling
export const defaultMapConfig: MapConfig = {
  center: {
    latitude: 28.3949, // Center of Nepal
    longitude: 84.1240
  },
  zoom: 7,
  maxZoom: 18,
  // Using OpenStreetMap tiles - no API key required
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '© OpenStreetMap contributors'
};

// Alternative tile providers - uncomment and modify as needed
// For production, you might want to use one of these with your API keys:

// Mapbox configuration (requires API key)
export const mapboxConfig: MapConfig = {
  center: { latitude: 28.3949, longitude: 84.1240 },
  zoom: 7,
  maxZoom: 18,
  // TODO: Replace 'your-mapbox-access-token' with actual token
  tileLayer: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=your-mapbox-access-token',
  attribution: '© Mapbox © OpenStreetMap'
};

// Google Maps configuration (requires API key)
// Note: Google Maps integration would need different implementation
export const googleMapsConfig = {
  center: { lat: 28.3949, lng: 84.1240 },
  zoom: 7,
  // TODO: Replace 'your-google-maps-api-key' with actual key
  apiKey: 'your-google-maps-api-key'
};

// Map utility functions
export class MapUtils {
  
  // Calculate distance between two coordinates (in kilometers)
  static calculateDistance(coord1: MapCoordinates, coord2: MapCoordinates): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(coord2.latitude - coord1.latitude);
    const dLon = this.toRadians(coord2.longitude - coord1.longitude);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(coord1.latitude)) * 
      Math.cos(this.toRadians(coord2.latitude)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  // Convert degrees to radians
  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  // Validate coordinates
  static isValidCoordinates(coords: MapCoordinates): boolean {
    return (
      coords.latitude >= -90 && coords.latitude <= 90 &&
      coords.longitude >= -180 && coords.longitude <= 180
    );
  }
  
  // Get bounds for a list of coordinates
  static getBounds(coordinates: MapCoordinates[]): {
    north: number;
    south: number;
    east: number;
    west: number;
  } {
    if (coordinates.length === 0) {
      return { north: 0, south: 0, east: 0, west: 0 };
    }
    
    const lats = coordinates.map(coord => coord.latitude);
    const lngs = coordinates.map(coord => coord.longitude);
    
    return {
      north: Math.max(...lats),
      south: Math.min(...lats),
      east: Math.max(...lngs),
      west: Math.min(...lngs)
    };
  }
}

// Map provider configuration - change this to switch between providers
export const getCurrentMapConfig = (): MapConfig => {
  // For now, using OpenStreetMap (free)
  // In production, you might want to use environment variables to determine provider
  const provider = process.env.MAP_PROVIDER || 'openstreetmap';
  
  switch (provider) {
    case 'mapbox':
      return mapboxConfig;
    case 'openstreetmap':
    default:
      return defaultMapConfig;
  }
};

// Instructions for switching to different map providers:
// 1. For Mapbox: 
//    - Install mapbox-gl: npm install mapbox-gl
//    - Get API key from mapbox.com
//    - Set MAP_PROVIDER=mapbox in environment variables
//    - Replace 'your-mapbox-access-token' with actual token
//
// 2. For Google Maps:
//    - Install @googlemaps/react-wrapper
//    - Get API key from Google Cloud Console
//    - Enable Maps JavaScript API
//    - Set MAP_PROVIDER=google in environment variables
//    - Replace 'your-google-maps-api-key' with actual key
//
// 3. Current setup uses OpenStreetMap tiles which are free and don't require API keys
//    This is suitable for development and testing
