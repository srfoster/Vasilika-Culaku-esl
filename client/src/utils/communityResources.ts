export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  phoneNumber?: string;
  address?: string;
  imageUrl: string;
  audioUrl: string;
  category: 'emergency' | 'health' | 'education' | 'government' | 'transportation' | 'shopping' | 'religious';
}

export interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
}

// Categories of community resources
export const resourceCategories: ResourceCategory[] = [
  {
    id: 'emergency',
    name: 'Emergency',
    description: 'Who to call in emergency situations',
    imageUrl: 'https://images.unsplash.com/photo-1521776943084-9a3512bd6311?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#ef4444'
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Medical and health services',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#3b82f6'
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Educational resources and services',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#22c55e'
  },
  {
    id: 'government',
    name: 'Government',
    description: 'Government offices and services',
    imageUrl: 'https://images.unsplash.com/photo-1562751362-404243c2eea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#a855f7'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'How to get around your community',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#f59e0b'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    description: 'Places to buy essential items',
    imageUrl: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#ec4899'
  },
  {
    id: 'religious',
    name: 'Religious Services',
    description: 'Churches and places of worship',
    imageUrl: 'https://images.unsplash.com/photo-1548690596-f1722c190938?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#06b6d4'
  }
];

// Collection of community resources for Kitsap County/Bremerton, WA
export const communityResources: ResourceItem[] = [
  // Emergency resources
  {
    id: 'emergency-911',
    title: 'Emergency - 911',
    description: 'Call 911 for ANY emergency situations - fire, medical emergency, or crime in progress. In emergencies, always call 911 first.',
    phoneNumber: '911',
    imageUrl: 'https://images.unsplash.com/photo-1606768666853-403c90a981ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/emergency',
    category: 'emergency'
  },
  {
    id: 'emergency-211',
    title: 'Community Resources - 211',
    description: 'Call 211 for information about community resources, social services, food assistance, housing help, and utility assistance programs in Kitsap County.',
    phoneNumber: '211',
    imageUrl: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/emergency',
    category: 'emergency'
  },
  {
    id: 'police',
    title: 'Bremerton Police Department',
    description: 'For non-emergency police assistance in Bremerton.',
    phoneNumber: '(360) 473-5220',
    address: '1025 Burwell Street, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/police',
    category: 'emergency'
  },
  {
    id: 'fire-department',
    title: 'Bremerton Fire Department',
    description: 'For non-emergency fire-related concerns or questions in Bremerton.',
    phoneNumber: '(360) 473-5380',
    address: '911 Park Avenue, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1617886322168-72b886573c35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/fire-department',
    category: 'emergency'
  },
  {
    id: 'central-kitsap-fire',
    title: 'Central Kitsap Fire & Rescue',
    description: 'Fire and emergency services for Central Kitsap area.',
    phoneNumber: '(360) 447-3550',
    address: '5300 NW Newberry Hill Rd, Silverdale, WA 98383',
    imageUrl: 'https://images.unsplash.com/photo-1582551272941-9fc59e9db56d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/fire-department',
    category: 'emergency'
  },
  {
    id: 'kitsap-mental-health',
    title: 'Kitsap Mental Health Crisis Line',
    description: 'Call for emergency mental health assistance and crisis intervention.',
    phoneNumber: '(360) 479-3033',
    address: '5455 Almira Dr NE, Bremerton, WA 98311',
    imageUrl: 'https://images.unsplash.com/photo-1527689638836-411945a2b57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/emergency',
    category: 'emergency'
  },
  
  // Health resources
  {
    id: 'st-michaels',
    title: 'St. Michael Medical Center',
    description: 'Main hospital serving the Kitsap County area.',
    phoneNumber: '(360) 744-3092',
    address: '1800 NW Myhre Rd, Silverdale, WA 98383',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/hospital',
    category: 'health'
  },
  {
    id: 'peninsula-community-health',
    title: 'Peninsula Community Health Services',
    description: 'Local healthcare clinic serving Kitsap County residents regardless of ability to pay.',
    phoneNumber: '(360) 377-3776',
    address: '616 6th Street, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/clinic',
    category: 'health'
  },
  {
    id: 'rite-aid',
    title: 'Rite Aid Pharmacy',
    description: 'Local pharmacy for medications and health supplies.',
    phoneNumber: '(360) 479-1418',
    address: '4220 Wheaton Way, Bremerton, WA 98310',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/pharmacy',
    category: 'health'
  },
  
  // Education resources
  {
    id: 'kitsap-regional-library',
    title: 'Kitsap Regional Library - Bremerton',
    description: 'Public library providing free books, internet access, educational resources, and ESL classes. Library cards are free for all Kitsap County residents.',
    phoneNumber: '(360) 377-3955',
    address: '1301 Sylvan Way, Bremerton, WA 98310',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/library',
    category: 'education'
  },
  {
    id: 'downtown-bremerton-library',
    title: 'Downtown Bremerton Library',
    description: 'Second library branch in downtown Bremerton with books, computers, free WiFi, and community programs including English conversation groups.',
    phoneNumber: '(360) 377-3955',
    address: '612 Fifth Street, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/library',
    category: 'education'
  },
  {
    id: 'olympic-college',
    title: 'Olympic College',
    description: 'Community college offering associate degrees and professional training in Bremerton.',
    phoneNumber: '(360) 792-6050',
    address: '1600 Chester Ave, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/community-college',
    category: 'education'
  },
  {
    id: 'bremerton-adult-education',
    title: 'Bremerton Adult Education Center',
    description: 'Offers ESL classes, citizenship preparation, and adult basic education.',
    phoneNumber: '(360) 473-0550',
    address: '1500 13th Street, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/adult-education',
    category: 'education'
  },
  {
    id: 'kitsap-community-resources',
    title: 'Kitsap Community Resources (KCR)',
    description: 'Comprehensive community assistance center offering many services including: ESL classes, WIC (Women, Infants & Children) nutrition program, housing assistance, kinship care support, and GED preparation.',
    phoneNumber: '(360) 377-0053',
    address: '845 8th Street, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/community',
    category: 'education'
  },
  {
    id: 'bremerton-school-district',
    title: 'Bremerton School District',
    description: 'Public school district serving Bremerton. Contact for information about enrolling children in school and ESL programs for students.',
    phoneNumber: '(360) 473-1000',
    address: '134 Marion Ave N, Bremerton, WA 98312',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/school',
    category: 'education'
  },
  {
    id: 'head-start',
    title: 'Kitsap Community Resources Head Start',
    description: 'Free preschool program for eligible children ages 3-5. Also offers Early Head Start for children 0-3.',
    phoneNumber: '(360) 473-2075',
    address: '1201 Park Avenue, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/school',
    category: 'education'
  },
  
  // Government resources
  {
    id: 'bremerton-city-hall',
    title: 'Bremerton City Hall',
    description: 'Local government office for city services and information.',
    phoneNumber: '(360) 473-5266',
    address: '345 6th Street, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1568213816046-0a293e8ba474?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/city-hall',
    category: 'government'
  },
  {
    id: 'kitsap-county-courthouse',
    title: 'Kitsap County Courthouse',
    description: 'Main courthouse for Kitsap County including court services, records, and legal assistance.',
    phoneNumber: '(360) 337-7140',
    address: '614 Division St, Port Orchard, WA 98366',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/courthouse',
    category: 'government'
  },
  {
    id: 'dshs-bremerton',
    title: 'Department of Social & Health Services',
    description: 'DSHS provides cash assistance, food benefits, childcare services, health insurance, and other social services for eligible residents.',
    phoneNumber: '(877) 501-2233',
    address: '4710 Auto Center Blvd, Bremerton, WA 98312',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/government',
    category: 'government'
  },
  {
    id: 'wa-dol',
    title: 'WA Department of Licensing',
    description: 'Where to get driver\'s licenses and ID cards in Bremerton.',
    phoneNumber: '(360) 475-4222',
    address: '4181 State Highway 3 W, Bremerton, WA 98312',
    imageUrl: 'https://images.unsplash.com/photo-1593346344081-c49bedb719ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/dmv',
    category: 'government'
  },
  {
    id: 'bremerton-post-office',
    title: 'Bremerton Post Office',
    description: 'For mailing services, PO boxes, and passport applications.',
    phoneNumber: '(360) 373-9561',
    address: '602 Pacific Ave, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/post-office',
    category: 'government'
  },
  
  // Transportation resources
  {
    id: 'kitsap-transit',
    title: 'Kitsap Transit',
    description: 'Public bus service throughout Kitsap County with routes in Bremerton.',
    phoneNumber: '(360) 479-6962',
    address: '60 Washington Ave, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/bus',
    category: 'transportation'
  },
  {
    id: 'bremerton-ferry',
    title: 'Bremerton-Seattle Ferry',
    description: 'Ferry service connecting Bremerton to Seattle.',
    phoneNumber: '(888) 808-7977',
    address: '10 Washington Ave, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1518131469562-999d662e62bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/ferry',
    category: 'transportation'
  },
  {
    id: 'taxi-rideshare',
    title: 'Taxi/Rideshare Services',
    description: 'On-demand transportation options available in Bremerton (Uber, Lyft).',
    imageUrl: 'https://images.unsplash.com/photo-1597346908500-28cda8acfe4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/taxi',
    category: 'transportation'
  },
  
  // Shopping resources
  {
    id: 'safeway-bremerton',
    title: 'Safeway',
    description: 'Grocery store in Bremerton for food and household items.',
    phoneNumber: '(360) 377-7307',
    address: '900 N Callow Ave, Bremerton, WA 98312',
    imageUrl: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/grocery',
    category: 'shopping'
  },
  {
    id: 'walmart-bremerton',
    title: 'Walmart',
    description: 'Department store selling a wide variety of goods at affordable prices.',
    phoneNumber: '(360) 478-4300',
    address: '4214 Wheaton Way, Bremerton, WA 98310',
    imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/store',
    category: 'shopping'
  },
  {
    id: 'goodwill-bremerton',
    title: 'Goodwill',
    description: 'Thrift store with affordable secondhand items and employment services.',
    phoneNumber: '(360) 373-1445',
    address: '4209 Wheaton Way, Bremerton, WA 98310',
    imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/thrift',
    category: 'shopping'
  },
  
  // Religious resources
  {
    id: 'emmanuel-apostolic',
    title: 'Emmanuel Apostolic Church',
    description: 'Christian church offering services in English and Spanish.',
    phoneNumber: '(360) 479-3674',
    address: '1023 6th St, Bremerton, WA 98337',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/church',
    category: 'religious'
  },
  {
    id: 'st-nicholas-church',
    title: 'St. Nicholas Catholic Church',
    description: 'Catholic church with services in English, Spanish, and Tagalog.',
    phoneNumber: '(360) 377-4674',
    address: '3510 Cheyenne Dr, Bremerton, WA 98310',
    imageUrl: 'https://images.unsplash.com/photo-1548690596-f1722c190938?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/church',
    category: 'religious'
  },
  {
    id: 'summit-avenue',
    title: 'Summit Avenue Presbyterian Church',
    description: 'Presbyterian church with community services and outreach programs.',
    phoneNumber: '(360) 377-2740',
    address: '403 S Summit Ave, Bremerton, WA 98312',
    imageUrl: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/church',
    category: 'religious'
  }
];

// Filter resources by category
export function getResourcesByCategory(categoryId: string): ResourceItem[] {
  return communityResources.filter(item => item.category === categoryId);
}

// Get a specific resource by ID
export function getResourceById(id: string): ResourceItem | undefined {
  return communityResources.find(item => item.id === id);
}