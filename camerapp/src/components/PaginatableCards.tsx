import React, { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination'
import './PaginatableCards.css'

interface PaginatableArguments {
    fetch: (howMany: number, startingIndex: number) => Promise<[]>,
    createCard: (data: any) => any,
    paginationSize: number
    sort?: (data: []) => [],
    filter?: (data: []) => []
}

function PaginatableCards({fetch, createCard, paginationSize, sort, filter}: PaginatableArguments) {
    const [data, setData] = useState([])
    const [index, setIndex] = useState(0)
    const [cards, setCards] = useState([]);

    sort = sort == null ? data => data : sort
    filter = filter == null ? data => data : filter

    useEffect(() => {
        return () => {
            fetch(paginationSize, index)
                .then(data => filter(data))
                .then(data => sort(data))
                .then(fetchedData => {
                    setData(fetchedData)
                    let cardsToSet = fetchedData.map(pieceOfData => createCard(pieceOfData))
                    setCards(cardsToSet)
                })
        };
    }, [index]);


    return (
        <div className='paginatableCards'>
            <div className='cards'>
                {cards}
            </div>
            <div className='pagination'>
                <Pagination
                    onChange={ (event, index) => setIndex(index) }
                    count={Math.ceil(data.length / paginationSize)}
                />
            </div>
        </div>
    )
}

export default PaginatableCards
