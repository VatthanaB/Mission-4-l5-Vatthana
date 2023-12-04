//  Car Interface from MongoDB
export interface Car {
  _id: string;
  brand: string;
  image: string;
  color: string;
  price: number;
  type: string;
}
// Car Tags from Azure
export interface Tags {
  colorTags?: string | undefined;
  carTypeTag?: string | undefined;
  carBrandTag?: string | undefined;
}

export interface DataFromAzure {
  name: string;
  confidence: number;
}
