import React, {useState, useEffect} from 'react'

const useSortAndFilterPaginatableItems = (
    data: any[],
    comparator: (first: any, second: any) => number,
    filterFunction: (element: any, index: number, array: any[]) => boolean,
    index: number,
    paginationSize: number
): [any[], number] => {
    const [dataToShow, setDataToShow] = useState<any[]>([])
    const [numberOfPages, setNumberOfPages] = useState<number>(1)

    useEffect(() => {
        let tempData = data
            .sort(comparator)
            .filter(filterFunction)
            .slice(
                ((index - 1) * paginationSize),
                index * paginationSize
            )
        setNumberOfPages(Math.ceil(data.length / paginationSize))
        setDataToShow(tempData)
    }, [data, comparator, filterFunction, index, paginationSize]);

    return [dataToShow, numberOfPages]
}

export default useSortAndFilterPaginatableItems
