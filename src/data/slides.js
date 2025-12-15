import heroImage1 from '../assets/HeroCarousel/image1.png';
import heroImage2 from '../assets/HeroCarousel/image2.png';
import heroImage3 from '../assets/HeroCarousel/image3.png';

export const heroSlides = [
  {
    id: 1,
    headline: 'Genetic Innovation',
    subheadline: 'Innovative seed on board',
    copy:
      'Your trusted CRO partner for advanced gene editing and delivery solutions, accelerating research from discovery to therapy.',
    stats: [
      { label: 'Avg. rating', value: '4.9/5' },
      { label: 'Trusted partners', value: '300+' },
      { label: 'Success Rate', value: '99%' },
    ],
    image: heroImage1,
  },
  {
    id: 2,
    eyebrow: 'Cell Therapy',
    headline: 'Cell Therapy',
    subheadline: 'Precise delivery for every study',
    copy:
      'Integrated platform spanning design, synthesis, and validation, giving translational teams a single partner from concept to clinic.',
    stats: [
      { label: 'Therapies launched', value: '120+' },
      { label: 'Labs worldwide', value: '18' },
      { label: 'Turnaround', value: '72 hrs' },
    ],
    image: heroImage2,
  },
  {
    id: 3,
    eyebrow: 'Bioinformatics',
    headline: 'Bioinformatics',
    subheadline: 'Insights that move discovery forward',
    copy:
      'Custom analytics, reagent sourcing, and regulatory-ready reporting that compresses R&D cycles for growing biotech teams.',
    stats: [
      { label: 'Papers supported', value: '650+' },
      { label: 'Review cycles saved', value: '40%' },
      { label: 'Client retention', value: '97%' },
    ],
    image: heroImage3,
  },
];
