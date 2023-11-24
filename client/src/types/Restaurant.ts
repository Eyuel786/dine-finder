export interface RestaurantData {
  name: string;
  cuisine: string;
  image: string;
  address: string;
  description: string;
}

export default interface Restaurant extends RestaurantData {
  id: string;
  // name: string;
  // cuisine: string;
  // image: string;
  // address: string;
  // description: string;
  author: string;
}
