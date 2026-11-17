export type ItemId = 'cocaine' | 'heroin' | 'lsd' | 'weed' | 'mdma' | 'shrooms'
export type LocationId = 'oldToronto' | 'etobicoke' | 'scarborough' | 'northYork' | 'york' | 'eastYork'

export interface Item {
    id: ItemId
    name: string
    minPrice: number
    maxPrice: number
}

export interface Location {
    id: LocationId
    name: string
    isHome: boolean
}

export interface GameState {
    status: 'playing' | 'gameOver'
    day: number
    location: LocationId
    cash: number
    debt: number
    bank: number
    capacity: number
    inventory: Record<ItemId, number>
    prices: Partial<Record<ItemId, number>>
    rngState: number
    log: string[]
}
