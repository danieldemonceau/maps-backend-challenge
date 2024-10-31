import { env } from './env';
import { getPlaceAutocomplete } from './maps-api';
import { AddressDetails } from './types';

export const getAutoCompleteDetails = async (address: string): Promise<AddressDetails[]> => {
    const apiKey = env.TOMTOM_API_KEY;

    const autocompleteResults = await getPlaceAutocomplete(apiKey, address);

    return autocompleteResults.map((result) => (
        {
            placeId: result.placeId,
            streetNumber: result.address.streetNumber,
            streetName: result.address.streetName,
            localName: result.address.localName,
            stateOrTerritory: result.address.countrySubdivision,
            postalCode: result.address.postalCode,
            country: result.address.country,
            municipality: result.address.municipality,
            countryCode: result.address.countryCode,
            freeformAddress: result.address.freeformAddress
        }
    ));
};
