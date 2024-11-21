'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useScopedI18n } from '@/locales/client';
import {
  BedDouble,
  Bike,
  Car,
  CheckCircle,
  Info,
  Languages,
  Mountain,
  Search,
  Shield,
  TreePine,
  Tv,
  Utensils,
  Wifi,
} from 'lucide-react';
import * as React from 'react';

export function Features() {
  const tFeatures = useScopedI18n('features');

  const amenities = [
    {
      icon: <Car className='h-6 w-6' />,
      title: tFeatures('parking'),
      description: tFeatures('parkingDescription'),
      items: [tFeatures('parkingAccessibility')],
    },
    {
      icon: <Wifi className='h-6 w-6' />,
      title: tFeatures('internet'),
      description: tFeatures('internetDescription'),
      items: [
        tFeatures('freeWiFi'),
        tFeatures('highSpeed'),
        tFeatures('ethernet'),
      ],
    },
    {
      icon: <Utensils className='h-6 w-6' />,
      title: tFeatures('kitchen'),
      items: [
        tFeatures('diningTable'),
        tFeatures('coffeeMachine'),
        tFeatures('cleaningProducts'),
        tFeatures('toaster'),
        tFeatures('cookingPlate'),
        tFeatures('kitchenUtensils'),
        tFeatures('electricKettle'),
        tFeatures('kitchen'),
        tFeatures('washingMachine'),
        tFeatures('dishwasher'),
        tFeatures('microwave'),
        tFeatures('refrigerator'),
      ],
    },
    {
      icon: <Tv className='h-6 w-6' />,
      title: tFeatures('highTech'),
      items: [
        tFeatures('streamingService'),
        tFeatures('flatScreenTV'),
        tFeatures('satelliteChannels'),
        tFeatures('radio'),
        tFeatures('television'),
      ],
    },
    {
      icon: <BedDouble className='h-6 w-6' />,
      title: tFeatures('roomEquipment'),
      items: [
        tFeatures('socketNearBed'),
        tFeatures('dryingRack'),
        tFeatures('clothesRack'),
        tFeatures('parquetFlooring'),
        tFeatures('soundproofing'),
        tFeatures('connectingRooms'),
        tFeatures('ironingEquipment'),
        tFeatures('iron'),
      ],
    },
    {
      icon: <TreePine className='h-6 w-6' />,
      title: tFeatures('outdoor'),
      items: [
        tFeatures('picnicArea'),
        tFeatures('outdoorFurniture'),
        tFeatures('outdoorDiningArea'),
        tFeatures('wellExposedTerrace'),
        tFeatures('barbecue'),
        tFeatures('barbecueFacilities'),
        tFeatures('balcony'),
        tFeatures('terrace'),
        tFeatures('garden'),
      ],
    },
    {
      icon: <Mountain className='h-6 w-6' />,
      title: tFeatures('views'),
      items: [tFeatures('mountainView'), tFeatures('view')],
    },
    {
      icon: <Bike className='h-6 w-6' />,
      title: tFeatures('activities'),
      items: [
        { name: tFeatures('concertsShows'), note: tFeatures('additionalCost') },
        { name: tFeatures('bikeTours'), note: tFeatures('additionalCost') },
        { name: tFeatures('walkingTours') },
        { name: tFeatures('skiInOut') },
        { name: tFeatures('skiPassSales') },
        { name: tFeatures('skiEquipmentRental') },
        { name: tFeatures('skiSchool'), note: tFeatures('additionalCost') },
        { name: tFeatures('skiStorage') },
        { name: tFeatures('cycling'), note: tFeatures('outsideProperty') },
        { name: tFeatures('hiking'), note: tFeatures('outsideProperty') },
        { name: tFeatures('ski') },
      ],
    },
    {
      icon: <Shield className='h-6 w-6' />,
      title: tFeatures('security'),
      items: [
        tFeatures('fireExtinguishers'),
        tFeatures('surveillanceCamerasOutside'),
        tFeatures('surveillanceCamerasCommonAreas'),
        tFeatures('smokeDetectors'),
      ],
    },
    {
      icon: <Languages className='h-6 w-6' />,
      title: tFeatures('languages'),
      items: [tFeatures('english'), tFeatures('spanish'), tFeatures('french')],
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(2);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter items based on the active category and search term
  const filteredItems = React.useMemo(() => {
    const items = amenities[activeIndex].items;
    if (!searchTerm) return items;

    return items.filter((item) => {
      const itemName = typeof item === 'string' ? item : item.name;
      return itemName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [activeIndex, searchTerm]);

  return (
    <div>
      <div className='mx-auto my-10 w-full max-w-4xl'>
        <div className='flex flex-col items-center gap-4'>
          <h3 className='mx-auto text-3xl font-semibold tracking-tight text-foreground md:text-7xl'>
            {tFeatures('title')}
          </h3>
        </div>
      </div>
      <TooltipProvider>
        <div className='min-h-screen p-8'>
          <div className='mx-auto max-w-7xl'>
            <div className='flex flex-col gap-8 lg:flex-row'>
              {/* Left Panel - Categories */}
              <Card className='lg:w-1/3'>
                <CardContent className='p-6'>
                  <h2 className='mb-6 text-2xl font-bold'>
                    {tFeatures('categories')}
                  </h2>
                  <ScrollArea className='h-[600px] pr-4'>
                    <div className='space-y-2'>
                      {amenities.map((category, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveIndex(index)}
                          className={`flex w-full items-center gap-3 rounded-lg p-4 transition-all duration-200 ${
                            activeIndex === index
                              ? 'scale-105 bg-primary text-primary-foreground shadow-lg'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <div
                            className={`${
                              activeIndex === index
                                ? 'text-primary-foreground'
                                : 'text-primary'
                            }`}
                          >
                            {category.icon}
                          </div>
                          <div className='flex-1 text-left'>
                            <span className='font-medium'>
                              {category.title}
                            </span>
                            {category.description && (
                              <p className='mt-1 text-sm opacity-80'>
                                {category.description}
                              </p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Right Panel - Details */}
              <Card className='flex-1'>
                <CardContent className='p-6'>
                  <div className='mb-6 flex items-center justify-between'>
                    <h2 className='text-2xl font-bold'>
                      {amenities[activeIndex].title}
                    </h2>
                    <div className='relative'>
                      <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
                      <input
                        type='text'
                        placeholder={tFeatures('searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='rounded-full bg-muted py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary'
                      />
                    </div>
                  </div>

                  <ScrollArea className='h-[600px]'>
                    <div className='grid gap-3 pr-4'>
                      {filteredItems.map((item, i) => (
                        <div
                          key={i}
                          className='group relative flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md'
                        >
                          <CheckCircle className='h-5 w-5 text-primary' />
                          <span className='flex-1'>
                            {typeof item === 'string' ? item : item.name}
                          </span>
                          {typeof item !== 'string' && item.note && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className='h-4 w-4 text-muted-foreground' />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{item.note}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
