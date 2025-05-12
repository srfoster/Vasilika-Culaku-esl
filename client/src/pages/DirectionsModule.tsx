import ComingSoonModule from '@/components/ComingSoonModule';

const DirectionsModule = () => {
  const directionsFeatures = [
    'Basic directional terms (left, right, north, south, etc.)',
    'Street and transportation vocabulary',
    'Reading maps and understanding addresses',
    'Interactive practice asking for and giving directions',
    'Public transit navigation vocabulary',
    'Common location names and landmarks'
  ];

  return (
    <ComingSoonModule
      title="Directions Module"
      description="Learn how to navigate your community and ask for directions. This module will help you find your way around, use public transportation, and reach important locations in your daily life."
      featuresList={directionsFeatures}
      imageUrl="https://images.unsplash.com/photo-1569396116180-210c182bedb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    />
  );
};

export default DirectionsModule;