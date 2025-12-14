export interface Userprops {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressProps;
  phone: string;
  website: string;
  company: CompanyProps;
}

export interface AddressProps {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoProps;
}

export interface GeoProps {
  lat: string;
  lng: string;
}

export interface CompanyProps {
  name: string;
  catchPhrase: string;
  bs: string;
}
