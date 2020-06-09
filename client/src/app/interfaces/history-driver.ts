export interface HistoryDriver {
  start_time: Date;
  package_type: string;
  address_start: string;
  address_destination: string;
  state: string;
  price: number;
}
