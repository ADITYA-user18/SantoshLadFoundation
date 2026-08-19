export interface ImpactMetric {
  id: string;
  value: string;
  numValue: number;
  suffix: string;
  label: string;
  humanStory: string;
  category: 'food' | 'water' | 'community' | 'education' | 'healthcare' | 'inclusion';
}

export interface StoryChapter {
  id: string;
  chapterNumber: string;
  theme: string;
  headline: string;
  subhead: string;
  copy: string;
  impactMetrics: {
    highlight: string;
    description: string;
  }[];
  imageUrl: string;
  imageAlt: string;
  quote?: {
    text: string;
    author: string;
  };
  fieldNote?: string;
}

export interface CrisisEvent {
  id: string;
  title: string;
  location: string;
  year: string;
  impact: string;
  description: string;
  imageUrl: string;
}

export interface InclusionFeature {
  title: string;
  description: string;
  stat?: string;
  iconName: string;
}

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'meals',
    value: '30,00,000+',
    numValue: 30,
    suffix: ' Lakh+',
    label: 'Meals served through free canteens',
    humanStory: 'Daily nourishment across Dharwad, Ballari, and Vijayanagara without question or judgment.',
    category: 'food',
  },
  {
    id: 'borewells',
    value: '10,000',
    numValue: 10000,
    suffix: '',
    label: 'Borewells supporting farming families',
    humanStory: 'Restoring lifelines to parched agricultural fields and saving countless livelihoods.',
    category: 'water',
  },
  {
    id: 'marriages',
    value: '10,500',
    numValue: 10500,
    suffix: '',
    label: 'Couples supported in community marriages',
    humanStory: 'Removing crushing financial debt from underprivileged families starting their new lives.',
    category: 'community',
  },
  {
    id: 'students',
    value: '25,000+',
    numValue: 25000,
    suffix: '+',
    label: 'Students supported through education',
    humanStory: 'Scholarships, computer training centres, and free bus passes bridging dreams into reality.',
    category: 'education',
  },
  {
    id: 'warriors',
    value: '15,000',
    numValue: 15000,
    suffix: '',
    label: 'Frontline Corona warriors honoured & assisted',
    humanStory: 'Standing shoulder-to-shoulder with sanitation workers, nurses, and frontline staff.',
    category: 'healthcare',
  },
  {
    id: 'tricycles',
    value: '2,500+',
    numValue: 2500,
    suffix: '+',
    label: 'Tricycles distributed to specially-abled individuals',
    humanStory: 'Enabling independent movement, self-reliance, and pride in daily work.',
    category: 'inclusion',
  },
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'water',
    chapterNumber: '01',
    theme: 'Water, where it was needed most',
    headline: 'Water did more than reach the land. It restored possibility.',
    subhead: 'Rejuvenating rural agrarian livelihoods since 2004',
    copy: 'Since 2004, thousands of borewells have helped bring water to parched fields. For farmers, this was not simply an infrastructure project. It meant a crop saved, a debt avoided, and a reason to believe in tomorrow again.',
    impactMetrics: [
      {
        highlight: '10,000 borewells',
        description: 'drilled for rural agriculture across drylands',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Indian farmer in lush green agricultural field at sunrise',
    quote: {
      text: 'When a field receives water, it is not just crops that grow. Hope returns to an entire family.',
      author: 'Santosh S. Lad',
    },
    fieldNote: 'In regions facing recurrent droughts, accessing groundwater within days of harvest failure has prevented agricultural bankruptcies for over two decades.',
  },
  {
    id: 'education',
    chapterNumber: '02',
    theme: 'No child should have to leave a dream behind',
    headline: 'A book, a bus pass, a chance to continue.',
    subhead: 'Unlocking academic and digital potential for rural youth',
    copy: 'For talented students facing financial hardship, educational assistance became a bridge between potential and possibility. From computer training to scholarships and free bus passes, the Foundation has helped young people stay on the path to their future.',
    impactMetrics: [
      {
        highlight: '10,000+ students',
        description: 'empowered with free computer & digital skills training',
      },
      {
        highlight: 'Thousands supported',
        description: 'through bus passes, study kits, and college fees',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Determined young students learning together in a bright classroom',
    quote: {
      text: 'Education is the quietest yet strongest revolution. No child should stop studying because of their circumstance.',
      author: 'Foundation Educational Charter',
    },
    fieldNote: 'Dedicated digital learning centres in Kalaghatagi and Dharwad offer practical job-oriented computer training to youth from remote hamlets.',
  },
  {
    id: 'food',
    chapterNumber: '03',
    theme: 'A meal can be an answer',
    headline: 'In a moment of hunger, dignity was served too.',
    subhead: 'Zero-cost canteens nourishing people across districts',
    copy: 'Across Dharwad, Ballari, and Vijayanagara, free meal canteens continue to offer nourishment without judgment. In moments of uncertainty, a warm meal can say something profound: you have not been forgotten.',
    impactMetrics: [
      {
        highlight: '30 lakh+ meals',
        description: 'served with warmth across 10 free canteens',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Warm, freshly prepared wholesome meal served with dignity and care',
    quote: {
      text: 'Feeding someone is not charity. It is acknowledging their fundamental right to live with dignity and strength.',
      author: 'Santosh S. Lad',
    },
    fieldNote: 'Operating daily, the canteens welcome daily-wage earners, travelers, patients visiting district hospitals, and elders alike.',
  },
  {
    id: 'healthcare',
    chapterNumber: '04',
    theme: 'Care must be able to travel',
    headline: 'When hospitals felt far away, care came to the doorstep.',
    subhead: 'Mobile health clinics, free eye-surgeries, and diagnostic support',
    copy: 'Mobile health vans, eye-care services, free treatment, spectacles, and emergency ambulance support have brought essential healthcare closer to those who need it most.',
    impactMetrics: [
      {
        highlight: '7 lakh patients',
        description: 'reached through mobile health camps & doorstep clinics',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Compassionate healthcare worker providing checkup to an elderly rural citizen',
    quote: {
      text: 'Distance should never decide whether a person recovers or suffers. Good healthcare must travel to the people.',
      author: 'Foundation Health Team',
    },
    fieldNote: 'Equipped with diagnostic tests, free medicine distribution, and ophthalmological checkups, the vans navigate remote rural routes every week.',
  },
  {
    id: 'independence',
    chapterNumber: '05',
    theme: 'Independence has many forms',
    headline: 'A mobility aid. An electric auto. A skill. A livelihood.',
    subhead: 'Sustainable economic self-reliance for vulnerable groups',
    copy: 'The Foundation has supported specially-abled people, women, street vendors, unemployed youth, and rural communities with the tools to build independent lives - because empowerment is not charity. It is respect made real.',
    impactMetrics: [
      {
        highlight: '2,500+ tricycles',
        description: 'and retrofitted mobility vehicles distributed',
      },
      {
        highlight: 'Electric autos',
        description: 'helping youth earn sustainable daily income with dignity',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574958269340-fa927304f208?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Empowered artisan working diligently with tools and pride',
    quote: {
      text: 'True empowerment is when a person no longer needs to ask for help, but has the means to help others.',
      author: 'Santosh S. Lad',
    },
    fieldNote: 'Programs include micro-livelihood toolkits for women self-help groups, tailoring units, and commercial green e-autos for youth.',
  },
];

export const CRISIS_EVENTS: CrisisEvent[] = [
  {
    id: 'uttarakhand',
    title: 'Uttarakhand Floods',
    location: 'Himalayan Foothills & Kedarnath Valley',
    year: 'Humanitarian Ground Operation',
    impact: '250 Kannadigas safely evacuated and brought home',
    description: 'When massive flash floods isolated thousands of pilgrims in treacherous terrain, Santosh Lad personally travelled to the ground, coordinating helicopters, base camps, food, medical attention, and safe flights back to Karnataka.',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'balasore',
    title: 'Balasore Train Tragedy',
    location: 'Odisha Rail Corridor',
    year: 'Disaster Relief & Coordination',
    impact: 'Immediate support extended to affected Kannadigas & stranded athletes',
    description: 'During one of the most severe rail accidents, immediate ground teams and liaisons were mobilized to assist victims, locate missing travelers, provide medical supplies, and safely transport stranded youth athletes.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'wayanad',
    title: 'Wayanad Landslides',
    location: 'Western Ghats Border Region',
    year: 'Emergency Relief Mission',
    impact: 'Rescue and relief leadership for affected families',
    description: 'Providing urgent emergency resources, essential food supplies, shelter coordination, and emotional reassurance to families displaced by catastrophic landslides.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'pahalgam',
    title: 'Pahalgam Rescue Operation',
    location: 'Jammu & Kashmir',
    year: 'Emergency Evacuation',
    impact: '177 Kannadigas safely brought home',
    description: 'Swift logistical intervention to locate, shelter, and airlift 177 stranded pilgrims and citizens during sudden unrest and severe weather disruptions, ensuring every single person was safely reunited with their family.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
  },
];

export const INCLUSION_HIGHLIGHTS: InclusionFeature[] = [
  {
    title: 'Dedicated Special Schools',
    description: 'Providing comprehensive education, speech therapy, and holistic daily care at specialised institutions in Kalaghatagi and Dharwad.',
    stat: '500+ Specially-Abled Individuals Supported',
    iconName: 'School',
  },
  {
    title: 'AI Smart Vision Glasses',
    description: 'Equipping visually impaired students and workers with cutting-edge assistive optical technology that translates surroundings into audio cues.',
    stat: 'AI-Powered Smart Assistive Vision',
    iconName: 'Eye',
  },
  {
    title: 'Innov8Ability for India',
    description: 'A nationwide assistive technology and inclusive innovation network building accessible tools, vocational devices, and adaptive equipment.',
    stat: '100+ Planned Open Innovation Labs',
    iconName: 'Lightbulb',
  },
  {
    title: 'Custom Mobility & Hearing Aids',
    description: 'High-grade motorized tricycles, wheelchair adaptations, and advanced digital hearing aids fitted individually for lifelong self-sufficiency.',
    stat: 'Over 2,500 Mobility Devices Delivered',
    iconName: 'Accessibility',
  },
];

export const FOUNDATION_VALUES = [
  'Education',
  'Health',
  'Livelihood',
  'Inclusion',
  'Agriculture',
  'Food',
  'Relief',
  'Dignity',
  'Opportunity',
  'Hope',
];

export const REGIONS_SERVED = [
  { name: 'Dharwad', detail: 'Central Foundation Hub, Free Meal Canteens, Computer Labs, Mobile Health Fleet' },
  { name: 'Kalaghatagi', detail: 'Specially-Abled Residential School, Agricultural Borewell Network, Youth Training' },
  { name: 'Ballari', detail: 'Community Kitchens, Mass Wedding Programmes, Rural Health Outreach' },
  { name: 'Vijayanagara', detail: 'Nourishment Canteens, Farmer Support Infrastructure, Self-Help Toolkits' },
  { name: 'Uttara Kannada & Beyond', detail: 'Disaster Response, Flood Relief, Forest Hamlet Medical Vans' },
];
