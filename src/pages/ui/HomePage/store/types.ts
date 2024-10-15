export interface NewsItem {
    creator_name: string;
    title: string;
    description: string;
    image_url: string;
    link: string;
  }

export interface MarketItem {
    symbol: string;
    name: string;
    image: string;
    address: string;
    price: number;
    market_cap: number;
    total_volume: number;
    price_change_percentage_24h: number;
  }

export interface MarketQueryParams {
    sort_by: string;
    sort: string;
}