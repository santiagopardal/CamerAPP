import React, { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination'
import './PaginatableCards.css'
import useSortAndFilterPaginatableItems from '../hooks/useSortAndFilterPaginatableItems'

interface PaginatableArguments {
    fetch: (howMany: number, startingIndex: number) => Promise<any[]>,
    createCard: (data: any) => any,
    paginationSize: number
    comparator: (first: any, second: any) => number,
    filterFunction: (element: any, index: number, array: any[]) => boolean
}

function PaginatableCards(props: PaginatableArguments) {
    const [data, setData] = useState<any[]>([])
    const [index, setIndex] = useState<number>(1)
    const [cards, setCards] = useState<React.Component[]>([])
    const [dataToShow, numberOfPages] = useSortAndFilterPaginatableItems(data, props.comparator, props.filterFunction, index, props.paginationSize)

    useEffect(() => {
        props.fetch(props.paginationSize, index).then(setData)
    }, [props.fetch, index]);

    useEffect(() => {
        setCards(
            dataToShow.map(
                pieceOfData => props.createCard(pieceOfData)
            )
        )
    }, [dataToShow]);

    return (
        <div className='paginatableCards'>
            <div className='cards'>
                <>
                    { cards }
                    { cards.length === 0 && <h1>Ooops, nothing here. Try searching something different...</h1> }
                </>
            </div>
            <div className='pagination'>
                <Pagination
                    onChange={ (event, index) => setIndex(index) }
                    count={ numberOfPages }
                />
            </div>
        </div>
    )
}

export default PaginatableCards
