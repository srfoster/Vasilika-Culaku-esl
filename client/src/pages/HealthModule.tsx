import ComingSoonModule from '@/components/ComingSoonModule';

const HealthModule = () => {
  const healthFeatures = [
    'Basic body parts vocabulary',
    'Common symptoms and medical terms',
    'Interactive emergency phrases practice',
    'Hospital and pharmacy vocabulary',
    'Doctor appointment scenarios',
    'Health insurance terminology'
  ];

  return (
    <ComingSoonModule
      title="Health Module"
      description="Learn important health and medical vocabulary to communicate effectively in medical situations. This module will help you describe symptoms, understand doctors, and navigate healthcare settings."
      featuresList={healthFeatures}
      imageUrl="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    />
  );
};

export default HealthModule;