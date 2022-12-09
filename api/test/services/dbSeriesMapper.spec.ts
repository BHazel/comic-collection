import type { DbEntity } from '../../src/types/db';
import type { Series } from '../../src/types/series';

import { mapDbSeries } from '../../src/services/dbSeriesMapper';

describe('DB Series Mapper', () => {
    it('when given database series with valid values should return correctly mapped series', () => {
        const dbSeries: DbEntity = {
            'id': 'series-id',
            'label': 'series',
            'type': 'vertex',
            'properties': {
                'title': [
                    {
                        'id': '2b8f526a-e4ea-4b2c-b2d5-fac82360f3e2',
                        'value': 'Series Title'
                    }
                ], 'publicationYear': [
                    {
                        'id': 'series-id|publicationYear',
                        'value': 2020
                    }
                ], 'url': [
                    {
                        'id': 'fd454073-b7f7-4aea-aef8-fb8479f7bb93',
                        'value': 'https://example.co.uk/series-id'
                    }
                ], 'imageUrl': [
                    {
                        'id': '3cf085c4-b267-4a09-b86f-1696ba309cc0',
                        'value': 'https://example.co.uk/series-id-image.png'
                    }
                ]
            }
        };

        const expectedSeries: Series = {
            id: 'series-id',
            title: 'Series Title',
            publicationYear: 2020,
            url: 'https://example.co.uk/series-id',
            imageUrl: 'https://example.co.uk/series-id-image.png'
        };

        const actualSeries: Series = mapDbSeries(dbSeries);
        expect(actualSeries).toStrictEqual(expectedSeries);
    }); 
    
    it('when given database series with missing required value should throw TypeError', () => {
        const dbSeries: DbEntity = {
            'id': 'series-id',
            'label': 'series',
            'type': 'vertex',
            'properties': {
                'publicationYear': [
                    {
                        'id': 'series-id|publicationYear',
                        'value': 2020
                    }
                ], 'url': [
                    {
                        'id': 'fd454073-b7f7-4aea-aef8-fb8479f7bb93',
                        'value': 'https://example.co.uk/series-id'
                    }
                ],
                'imageUrl': [
                    {
                        'id': '3cf085c4-b267-4a09-b86f-1696ba309cc0',
                        'value': 'https://example.co.uk/series-id-image.png'
                    }
                ]
            }
        };

        const callMapDbSeries= () => {
            mapDbSeries(dbSeries);
        };

        expect(callMapDbSeries).toThrow(TypeError);
        expect(callMapDbSeries).toThrow('Cannot read properties of undefined (reading \'0\')');
    });

    it('when given database series with missing non-required value should that value as undefined', () => {
        const dbSeries: DbEntity = {
            'id': 'series-id',
            'label': 'series',
            'type': 'vertex',
            'properties': {
                'title': [
                    {
                        'id': '2b8f526a-e4ea-4b2c-b2d5-fac82360f3e2',
                        'value': 'Series Title'
                    }
                ], 'publicationYear': [
                    {
                        'id': 'series-id|publicationYear',
                        'value': 2020
                    }
                ],
                'imageUrl': [
                    {
                        'id': '3cf085c4-b267-4a09-b86f-1696ba309cc0',
                        'value': 'https://example.co.uk/series-id-image.png'
                    }
                ]
            }
        };

        const expectedSeries: Series = {
            id: 'series-id',
            title: 'Series Title',
            publicationYear: 2020,
            url: undefined,
            imageUrl: 'https://example.co.uk/series-id-image.png'
        };

        const actualSeries: Series = mapDbSeries(dbSeries);
        expect(actualSeries).toStrictEqual(expectedSeries);
    });
});