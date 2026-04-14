export interface Operator {
  id: string;
  name: string;
  regions: string[];
  countries: string[];
  logoPath: string;
}

export const OPERATORS: Operator[] = [
  // North America
  { id: 'att', name: 'AT&T', regions: ['North America'], countries: ['USA', 'Mexico', 'Canada'], logoPath: '/logos/att.svg' },
  { id: 'tmobile', name: 'T-Mobile', regions: ['North America'], countries: ['USA', 'Puerto Rico'], logoPath: '/logos/tmobile.svg' },
  { id: 'verizon', name: 'Verizon', regions: ['North America'], countries: ['USA'], logoPath: '/logos/verizon.svg' },
  { id: 'telus', name: 'Telus', regions: ['North America'], countries: ['Canada'], logoPath: '/logos/telus.svg' },
  { id: 'rogers', name: 'Rogers', regions: ['North America'], countries: ['Canada'], logoPath: '/logos/rogers.svg' },
  { id: 'bell', name: 'Bell', regions: ['North America'], countries: ['Canada'], logoPath: '/logos/bell.svg' },

  // Europe
  { id: 'vodafone', name: 'Vodafone', regions: ['Europe', 'Africa', 'Asia'], countries: ['UK', 'Germany', 'Italy', 'Spain', 'Greece'], logoPath: '/logos/vodafone.svg' },
  { id: 'orange', name: 'Orange', regions: ['Europe', 'Africa', 'Middle East'], countries: ['France', 'Spain', 'Poland', 'Belgium'], logoPath: '/logos/orange.svg' },
  { id: 'o2', name: 'O2', regions: ['Europe'], countries: ['UK', 'Germany', 'Czech Republic'], logoPath: '/logos/o2.svg' },
  { id: 'three', name: 'Three', regions: ['Europe', 'Asia'], countries: ['UK', 'Ireland', 'Italy', 'Austria', 'Sweden', 'Denmark', 'Hong Kong'], logoPath: '/logos/three.svg' },
  { id: 'deutsche-telekom', name: 'Deutsche Telekom', regions: ['Europe'], countries: ['Germany', 'Austria', 'Poland'], logoPath: '/logos/deutsche-telekom.svg' },
  { id: 'telefonica', name: 'Telefónica', regions: ['Europe', 'Latin America'], countries: ['Spain', 'UK', 'Germany', 'Brazil', 'Argentina'], logoPath: '/logos/telefonica.svg' },
  { id: 'swisscom', name: 'Swisscom', regions: ['Europe'], countries: ['Switzerland', 'Liechtenstein'], logoPath: '/logos/swisscom.svg' },
  { id: 'ee', name: 'EE', regions: ['Europe'], countries: ['UK'], logoPath: '/logos/ee.svg' },
  { id: 'bouygues', name: 'Bouygues Telecom', regions: ['Europe'], countries: ['France'], logoPath: '/logos/bouygues.svg' },

  // Asia
  { id: 'chinamobile', name: 'China Mobile', regions: ['Asia'], countries: ['China', 'Hong Kong', 'Pakistan'], logoPath: '/logos/chinamobile.svg' },
  { id: 'chinaunicom', name: 'China Unicom', regions: ['Asia'], countries: ['China', 'Hong Kong', 'Macau'], logoPath: '/logos/chinaunicom.svg' },
  { id: 'singtel', name: 'Singtel', regions: ['Asia', 'Oceania'], countries: ['Singapore', 'Australia', 'Thailand'], logoPath: '/logos/singtel.svg' },
  { id: 'softbank', name: 'SoftBank', regions: ['Asia'], countries: ['Japan'], logoPath: '/logos/softbank.svg' },
  { id: 'kddi', name: 'KDDI', regions: ['Asia'], countries: ['Japan'], logoPath: '/logos/kddi.svg' },
  { id: 'sk-telecom', name: 'SK Telecom', regions: ['Asia'], countries: ['South Korea'], logoPath: '/logos/sk-telecom.svg' },
  { id: 'kt-corp', name: 'KT Corporation', regions: ['Asia'], countries: ['South Korea'], logoPath: '/logos/kt-corp.svg' },

  // Oceania
  { id: 'telstra', name: 'Telstra', regions: ['Oceania'], countries: ['Australia'], logoPath: '/logos/telstra.svg' },
  { id: 'optus', name: 'Optus', regions: ['Oceania'], countries: ['Australia'], logoPath: '/logos/optus.svg' },

  // Africa
  { id: 'mtn', name: 'MTN', regions: ['Africa', 'Middle East'], countries: ['South Africa', 'Nigeria', 'Ghana', 'Uganda'], logoPath: '/logos/mtn.svg' },
  { id: 'airtel', name: 'Airtel', regions: ['Africa', 'Asia'], countries: ['India', 'Nigeria', 'Kenya', 'Tanzania'], logoPath: '/logos/airtel.svg' },

  // Latin America
  { id: 'movistar', name: 'Movistar', regions: ['Latin America', 'Europe'], countries: ['Spain', 'Mexico', 'Argentina', 'Chile', 'Peru'], logoPath: '/logos/movistar.svg' },
  { id: 'claro', name: 'Claro', regions: ['Latin America'], countries: ['Brazil', 'Mexico', 'Argentina', 'Chile'], logoPath: '/logos/claro.svg' },
  { id: 'tim', name: 'TIM', regions: ['Latin America', 'Europe'], countries: ['Brazil', 'Italy'], logoPath: '/logos/tim.svg' },
];
