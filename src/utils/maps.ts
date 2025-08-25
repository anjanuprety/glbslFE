// Map utility types and constants for branch locations
// This file provides TypeScript types and helper functions for map integrations

export interface MapCoordinates {
  latitude: number;
  longitude: number;
}

export interface MapLocation {
  coordinates: MapCoordinates;
  name: string;
  address: string;
}

// Helper function to validate coordinates
export const isValidCoordinates = (coords: MapCoordinates): boolean => {
  return (
    coords.latitude >= -90 && 
    coords.latitude <= 90 && 
    coords.longitude >= -180 && 
    coords.longitude <= 180
  );
};

// Helper function to format coordinates for display
export const formatCoordinates = (coords: MapCoordinates): string => {
  const lat = coords.latitude.toFixed(6);
  const lng = coords.longitude.toFixed(6);
  return `${lat}, ${lng}`;
};

// Default coordinates for Nepal (center of country)
export const DEFAULT_NEPAL_COORDINATES: MapCoordinates = {
  latitude: 28.3949,
  longitude: 84.1240
};
