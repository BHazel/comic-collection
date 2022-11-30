type DbProperty = {
    id: string,
    value: string | number
}

type DbEntity = {
    id: string,
    label: string,
    type: 'vertex' | 'edge',
    properties: Record<string, DbProperty[]>
}

type DbResponse = {
    _items: DbEntity[]
}

export {
    DbEntity,
    DbProperty,
    DbResponse
};