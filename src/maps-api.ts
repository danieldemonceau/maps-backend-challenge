import axios, { AxiosResponse } from 'axios';
import { TomTomFuzzySearchResponse, TomTomFuzzySearchResult } from './types';

export const getPlaceAutocomplete = async (key: string, address: string): Promise<(TomTomFuzzySearchResult & { placeId: string })[]> => {
    const autocomplete = await axios.get(`https://api.tomtom.com/search/2/search/${address}.json'`, {
        params: {
            key,
            limit: 100,
            countrySet: 'AUS',
        }
    }) as AxiosResponse<TomTomFuzzySearchResponse>;

    return autocomplete.data.results.map((result) => (
        {
            placeId: result.id,
            ...result
        }));
};
