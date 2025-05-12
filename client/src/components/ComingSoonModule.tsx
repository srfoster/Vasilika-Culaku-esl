import { Link } from 'wouter';

interface ComingSoonModuleProps {
  title: string;
  description: string;
  featuresList: string[];
  imageUrl: string;
  returnPath?: string;
}

const ComingSoonModule = ({
  title,
  description,
  featuresList,
  imageUrl,
  returnPath = '/'
}: ComingSoonModuleProps) => {
  return (
    <div className="coming-soon-module">
      <div className="flex items-center mb-6">
        <Link href={returnPath} className="mr-3 bg-light rounded-full p-2" aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
        </Link>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-lg mb-4">{description}</p>
            <Link href={returnPath} className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-md">
              Return to Home
            </Link>
          </div>
          
          <div className="md:w-1/2">
            <div className="p-6 bg-light rounded-xl">
              <h3 className="text-xl font-bold mb-4">Coming Soon!</h3>
              <div className="flex items-center mb-4">
                <span className="bg-primary text-white p-1 rounded-full flex items-center justify-center w-8 h-8 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
                  </svg>
                </span>
                <div>This module is currently in development and will be available soon!</div>
              </div>
              
              <h4 className="font-bold mt-6 mb-3">Planned Features:</h4>
              <ul className="list-disc pl-5 space-y-2">
                {featuresList.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModule;