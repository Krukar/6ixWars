import type { Item, Location } from './types'

export const ITEMS: Item[] = [
    { id: 'cocaine', name: 'Cocaine', minPrice: 15000, maxPrice: 30000 },
    { id: 'heroin', name: 'Heroin', minPrice: 5500, maxPrice: 13000 },
    { id: 'lsd', name: 'LSD', minPrice: 1000, maxPrice: 4500 },
    { id: 'weed', name: 'Weed', minPrice: 300, maxPrice: 900 },
    { id: 'mdma', name: 'MDMA', minPrice: 70, maxPrice: 250 },
    { id: 'shrooms', name: 'Shrooms', minPrice: 10, maxPrice: 60 },
]

export const LOCATIONS: Location[] = [
    { id: 'oldToronto', name: 'Old Toronto', isHome: true },
    { id: 'etobicoke', name: 'Etobicoke', isHome: false },
    { id: 'scarborough', name: 'Scarborough', isHome: false },
    { id: 'northYork', name: 'North York', isHome: false },
    { id: 'york', name: 'York', isHome: false },
    { id: 'eastYork', name: 'East York', isHome: false },
]

export const START = {
    days: 30,
    cash: 2000,
    debt: 5500,
    capacity: 100,
    dailyInterest: 0.1,
} as const
