import { getPlaceAutocomplete } from '../src/maps-api';
import { getAutoCompleteDetails } from '../src';
import { env } from '../src/env';

describe('Tomtom Places E2E Tests', () => {
    describe('getAutoCompleteDetails', () => {
        it('returns a promise', () => {
            const res = getAutoCompleteDetails('Charlotte Street');
            expect(res).toBeInstanceOf(Promise);
        });

        it('can fetch from the autocomplete api', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street');
            const firstRes = res[0];
            expect(firstRes).toHaveProperty('placeId');
            expect(firstRes).toHaveProperty('streetNumber');
            expect(firstRes).toHaveProperty('streetName');
            expect(firstRes).toHaveProperty('localName');
            expect(firstRes).toHaveProperty('stateOrTerritory');
            expect(firstRes).toHaveProperty('postalCode');
            expect(firstRes).toHaveProperty('country');
            expect(firstRes).toHaveProperty('municipality');
            expect(firstRes).toHaveProperty('countryCode');
            expect(firstRes).toHaveProperty('freeformAddress');
        });
    });

    describe('getPlaceAutocomplete', () => {
        const apiKey = env.TOMTOM_API_KEY;

        it('returns a promise', () => {
            const res = getPlaceAutocomplete(apiKey, 'Charlotte Street');
            expect(res).toBeInstanceOf(Promise);
        });

        it('only returns Australian addresses', async () => {
            const res = await getPlaceAutocomplete(apiKey, 'Charlotte Street');
            res.every(result => expect(result.address.countryCode).toBe('AU'));
        });

        it('handles no results', async () => {
            const res = await getPlaceAutocomplete(apiKey, 'asfasffasfasafsafs');
            expect(res).toStrictEqual([]);
        });

        it('handles error when empty address part is provided', async () => {
            expect(getPlaceAutocomplete(apiKey, '')).rejects.toThrow();
        });

        it('handles error when no apiKey is provided', async () => {
            expect(getPlaceAutocomplete('', 'Charlotte Street')).rejects.toThrow();
        });

        it('handles error when invalid apiKey is provided', async () => {
            expect(getPlaceAutocomplete('INVALID_KEY', 'Charlotte Street')).rejects.toThrow();
        });
    });
});
