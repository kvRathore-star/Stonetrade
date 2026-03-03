
export enum StoneType {
  MARBLE = 'Marble',
  GRANITE = 'Granite',
  SANDSTONE = 'Sandstone',
  QUARTZITE = 'Quartzite',
  LIMESTONE = 'Limestone',
  TRAVERTINE = 'Travertine',
  HANDICRAFT = 'Handicraft',
  DECORATION = 'Decoration',
}

export enum Origin {
  KISHANGARH = 'Kishangarh, Rajasthan',
  MAKRANA = 'Makrana, Rajasthan',
  RAJASTHAN = 'Rajasthan, India',
  INDIA = 'India',
  ITALY = 'Italy',
  TURKEY = 'Turkey',
  SPAIN = 'Spain',
}

export enum Finish {
  POLISHED = 'Polished',
  HONED = 'Honed',
  LEATHER = 'Leather',
  MATTE = 'Matte',
  BRUSHED = 'Brushed',
  FLAMED = 'Flamed',
  NATURAL = 'Natural',
  HAND_CRAFTED = 'Hand Crafted',
}

export enum SizeType {
  SLAB = 'Slab',
  TILE = 'Tile',
  BLOCK = 'Block',
  CUSTOM = 'Custom',
  PIECE = 'Piece',
}

export enum PriceUnit {
  SQ_FT = 'sq.ft',
  SQ_M = 'sq.m',
  TON = 'ton',
  PER_PIECE = 'per piece',
}

export enum UseCase {
  HOME = 'Home',
  HOSPITAL = 'Hospital',
  HOTEL = 'Hotel',
  COMMERCIAL = 'Commercial',
  TEMPLE = 'Temple',
  INFRASTRUCTURE = 'Infrastructure',
  DECORATION = 'Decoration',
}

export interface Seller {
  id: number;
  name: string;
  location: string;
  isVerified: boolean;
  verificationLevel: 'Basic' | 'Gold' | 'Quarry-Direct';
  rating: number;
  reviews: number;
  contact?: {
    phone: string;
    email: string;
    whatsapp?: string;
  }
}

export interface Product {
  id: number;
  name: string;
  stoneType: StoneType;
  origin: Origin;
  finish: Finish;
  size: {
    type: SizeType;
    dimensions?: string;
  };
  thickness: string;
  color: string;
  price: number;
  priceUnit: PriceUnit;
  minOrderQty: number;
  stock: number;
  images: string[];
  seller: Seller;
  description: string;
  useCases: UseCase[];
  hasInspectionReport?: boolean;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  isLoading?: boolean;
}

export interface RFQ {
  id: string;
  buyerName: string;
  stoneType: StoneType;
  quantity: number;
  unit: PriceUnit;
  budget: string;
  location: string;
  status: 'active' | 'closed';
  postedAt: Date;
}
