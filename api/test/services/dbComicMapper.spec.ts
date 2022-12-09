import type { Comic } from '../../src/types/comic';
import type { DbEntity } from '../../src/types/db';

import { mapDbComic } from '../../src/services/dbComicMapper';

describe('DB Comic Mapper', () => {
    it('when given database comic with valid values should return correctly mapped comic', () => {
        const dbComic: DbEntity = {
            'id': 'comic-id',
            'label': 'comic',
            'type': 'vertex',
            'properties': {
                'title': [
                    {
                        'id': '33b21a20-40ed-42b5-94cc-28d322aba058',
                        'value': 'Comic Title'
                    }
                ], 'publicationYear': [
                    {
                        'id': 'comic-id|publicationYear',
                        'value': 2021
                    }
                ], 'storyTitle': [
                    {
                        'id': 'e650ddd8-8eb0-4e58-8d49-48eabf7dfa8e',
                        'value': 'Comic Story Title'
                    }
                ], 'issue': [
                    {
                        'id': '9cf719f1-cf01-41e5-96d5-a7a2f92655ce',
                        'value': 2
                    }
                ], 'publicationDate': [
                    {
                        'id': 'a2917048-abaf-4b2e-a694-1fef309f91cb',
                        'value': '2021-05-12'
                    }
                ], 'summary': [
                    {
                        'id': 'd72b3552-e876-4204-9bf3-2ca3b1b13b59',
                        'value': 'Comic Summary'
                    }
                ], 'url': [
                    {
                        'id': '1ccd6cf8-daac-4013-9032-9dda057debd9',
                        'value': 'https://example.co.uk/comic-id'
                    }
                ], 'imageUrl': [
                    {
                        'id': '75d3da72-6dce-43cd-afe3-50d19d532f77',
                        'value': 'https://example.co.uk/comic-id-image.png'
                    }
                ]
            }
        };

        const expectedComic: Comic = {
            id: 'comic-id',
            title: 'Comic Title',
            storyTitle: 'Comic Story Title',
            issue: 2,
            publicationDate: '2021-05-12',
            summary: 'Comic Summary',
            url: 'https://example.co.uk/comic-id',
            imageUrl: 'https://example.co.uk/comic-id-image.png'
        };

        const actualComic: Comic = mapDbComic(dbComic);
        expect(actualComic).toStrictEqual(expectedComic);
    });

    it('when given database comic with missing required value should throw TypeError', () => {
        const dbComic: DbEntity = {
            'id': 'comic-id',
            'label': 'comic',
            'type': 'vertex',
            'properties': {
                'title': [
                    {
                        'id': '33b21a20-40ed-42b5-94cc-28d322aba058',
                        'value': 'Comic Title'
                    }
                ], 'publicationYear': [
                    {
                        'id': 'comic-id|publicationYear',
                        'value': 2021
                    }
                ], 'storyTitle': [
                    {
                        'id': 'e650ddd8-8eb0-4e58-8d49-48eabf7dfa8e',
                        'value': 'Comic Story Title'
                    }
                ], 'publicationDate': [
                    {
                        'id': 'a2917048-abaf-4b2e-a694-1fef309f91cb',
                        'value': '2021-05-12'
                    }
                ], 'summary': [
                    {
                        'id': 'd72b3552-e876-4204-9bf3-2ca3b1b13b59',
                        'value': 'Comic Summary'
                    }
                ], 'url': [
                    {
                        'id': '1ccd6cf8-daac-4013-9032-9dda057debd9',
                        'value': 'https://example.co.uk/comic-id'
                    }
                ], 'imageUrl': [
                    {
                        'id': '75d3da72-6dce-43cd-afe3-50d19d532f77',
                        'value': 'https://example.co.uk/comic-id-image.png'
                    }
                ]
            }
        };

        const callMapDbComic = () => {
            mapDbComic(dbComic);
        };

        expect(callMapDbComic).toThrow(TypeError);
        expect(callMapDbComic).toThrow('Cannot read properties of undefined (reading \'0\')')
    });

    it('when given database series with missing non-required value should that value as undefined', () => {
        const dbComic: DbEntity = {
            'id': 'comic-id',
            'label': 'comic',
            'type': 'vertex',
            'properties': {
                'title': [
                    {
                        'id': '33b21a20-40ed-42b5-94cc-28d322aba058',
                        'value': 'Comic Title'
                    }
                ], 'publicationYear': [
                    {
                        'id': 'comic-id|publicationYear',
                        'value': 2021
                    }
                ], 'storyTitle': [
                    {
                        'id': 'e650ddd8-8eb0-4e58-8d49-48eabf7dfa8e',
                        'value': 'Comic Story Title'
                    }
                ], 'issue': [
                    {
                        'id': '9cf719f1-cf01-41e5-96d5-a7a2f92655ce',
                        'value': 2
                    }
                ], 'publicationDate': [
                    {
                        'id': 'a2917048-abaf-4b2e-a694-1fef309f91cb',
                        'value': '2021-05-12'
                    }
                ], 'url': [
                    {
                        'id': '1ccd6cf8-daac-4013-9032-9dda057debd9',
                        'value': 'https://example.co.uk/comic-id'
                    }
                ], 'imageUrl': [
                    {
                        'id': '75d3da72-6dce-43cd-afe3-50d19d532f77',
                        'value': 'https://example.co.uk/comic-id-image.png'
                    }
                ]
            }
        };

        const expectedComic: Comic = {
            id: 'comic-id',
            title: 'Comic Title',
            storyTitle: 'Comic Story Title',
            issue: 2,
            publicationDate: '2021-05-12',
            summary: undefined,
            url: 'https://example.co.uk/comic-id',
            imageUrl: 'https://example.co.uk/comic-id-image.png'
        };

        const actualComic: Comic = mapDbComic(dbComic);
        expect(actualComic).toStrictEqual(expectedComic);
    });
});