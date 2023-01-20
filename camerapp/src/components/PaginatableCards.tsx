import React, { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination'
import './PaginatableCards.css'

interface PaginatableArguments {
    fetch: (howMany: number, startingIndex: number) => Promise<any[]>,
    createCard: (data: any) => any,
    paginationSize: number
    comparator?: (first: any, second: any) => number,
    filterFunction?: (element: any, index: number, array: any[]) => boolean
}

const fetchData = async ({fetch, filterFunction, comparator, paginationSize}: PaginatableArguments, index: number) => {
    let data = await fetch(paginationSize, index)
    return data.sort(comparator).filter(filterFunction)
}

function PaginatableCards(props: PaginatableArguments) {
    const [data, setData] = useState<any>([])
    const [index, setIndex] = useState<number>(1)
    const [cards, setCards] = useState<React.Component[]>([]);

    let args = {...props}

    args.comparator = props.comparator == null ? () => 0 : props.comparator
    args.filterFunction = props.filterFunction == null ? () => true : props.filterFunction

    useEffect(() => {
        fetchData(args, index)
            .then(data => {
                setData(data)
                let newCards = data.map(
                    pieceOfData => props.createCard(pieceOfData)
                )
                setCards(newCards)
            })
    }, [index, props.filterFunction, props.fetch])

    return (
        <div className='paginatableCards'>
            <div className='cards'>
                {cards}
                { cards.length === 0 && <h1>Ooops, nothing here. Try searching something different...</h1> }
            </div>
            <div className='pagination'>
                <Pagination
                    onChange={ (event, index) => setIndex(index) }
                    count={Math.ceil(data.length / args.paginationSize)}
                />
            </div>
        </div>
    )
}

export default PaginatableCards
