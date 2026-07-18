export interface CoinGeckoPrice {
  bitcoin: { usd: number; usd_24h_change: number };
  ethereum: { usd: number; usd_24h_change: number };
}

export interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export async function fetchTickerPrices(): Promise<TickerData[]> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 300 } }
    );

    if (!res.ok) throw new Error('CoinGecko API error');

    const data: CoinGeckoPrice = await res.json();

    return [
      {
        symbol: 'BTC/USD',
        name: 'Bitcoin',
        price: data.bitcoin.usd,
        change: data.bitcoin.usd * (data.bitcoin.usd_24h_change / 100),
        changePercent: Number(data.bitcoin.usd_24h_change.toFixed(2)),
      },
      {
        symbol: 'ETH/USD',
        name: 'Ethereum',
        price: data.ethereum.usd,
        change: data.ethereum.usd * (data.ethereum.usd_24h_change / 100),
        changePercent: Number(data.ethereum.usd_24h_change.toFixed(2)),
      },
    ];
  } catch {
    return [
      { symbol: 'BTC/USD', name: 'Bitcoin', price: 0, change: 0, changePercent: 0 },
      { symbol: 'ETH/USD', name: 'Ethereum', price: 0, change: 0, changePercent: 0 },
    ];
  }
}
