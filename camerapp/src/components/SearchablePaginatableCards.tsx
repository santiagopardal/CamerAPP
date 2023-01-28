import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import PaginatableCards from './PaginatableCards'
import Camera from '../models/Camera'

export type SearchablePaginatableCardsProps = {
    fetch: (howMany: number, startingIndex: number) => Promise<any[]>,
    createCard: (searchable: any) => JSX.Element
}

type GetPropertyToCompare = {
    getPropertyToCompare: (searchable: any) => string
}

const createFilterFunction = (text: string, getPropertyToCompare: (searchable: any) => string):
    () => (searchable: any) => boolean => {
    let filter = () => (searchable: any) => true
    if (text != '') {
        filter = () => (searchable: any) => {
            let propertyToCompare = getPropertyToCompare(searchable)
            propertyToCompare = propertyToCompare.toLowerCase()
            text = text.toLowerCase()
            return propertyToCompare.includes(text)
        }
    }

    return filter
}

const comparator = () => 0

export default function SearchablePaginatableCards (props: SearchablePaginatableCardsProps & GetPropertyToCompare) {
    const [filterFunction, setFilterFunction] = useState<(camera: Camera) => boolean>(createFilterFunction('', props.getPropertyToCompare))

    const newTextSearch = (searcher: any) => {
        let text = searcher ? searcher.target.value : ''
        let filter = createFilterFunction(text, props.getPropertyToCompare)
        setFilterFunction(filter)
    }

    return <div className='searchables'>
        <div className='actions'>
            <Form.Control type='search' placeholder='Search' aria-label='Search' onChange={newTextSearch}></Form.Control>
        </div>
        <PaginatableCards
            fetch={ props.fetch }
            paginationSize={ 10 }
            createCard={ props.createCard }
            filterFunction={ filterFunction }
            comparator={ comparator }
        />
    </div>
}
