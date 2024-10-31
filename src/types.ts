export interface TomTomFuzzySearchResponse {
  results: TomTomFuzzySearchResult[];
}

export interface TomTomFuzzySearchResult {
  id: string;
  address: TomTomAddress;
}

interface TomTomAddress extends AddressDetails {
  municipalitySubdivision: string;
  countrySecondarySubdivision: string;
  countrySubdivision: string;
  countrySubdivisionName: string;
  countrySubdivisionCode: string;
  countryCodeISO3: string;
};

export interface AddressDetails {
  placeId: string;
  streetNumber: string;
  streetName: string;
  localName: string,
  stateOrTerritory: string,
  postalCode: string;
  country: string;
  municipality: string;
  freeformAddress: string;
  countryCode: string;
}