import React, {useEffect, useState} from 'react'
import {getVideos, Video} from '../api/Videos'
import moment from 'moment/moment'
import Camera from '../models/Camera'
import useSortAndFilterPaginatableItems from './useSortAndFilterPaginatableItems'
import {useNavigate} from 'react-router-dom'

const comparator = (first: Video, second: Video) => moment(first.day, 'DD/MM/YYYY') < moment(second.day, 'DD/MM/YYYY') ? -1 : 1
const filterFunction = () => true

const useCameraVideos = (camera: Camera, dates: string[], index: number, paginationSize: number): [Video[], number] => {
    const [videos, setVideos] = useState<Video[]>([])
    const [videosToDisplay, numberOfPages] = useSortAndFilterPaginatableItems(videos, comparator, filterFunction, index, paginationSize)
    const navigate = useNavigate()

    const sortAndSetVideos = async (camera: Camera, startDate?: string, endDate?: string) => {
        try {
             let videos = await getVideos(camera, startDate, endDate)
            videos = videos.sort(
                (first, second) =>
                    moment(first.day, 'DD/MM/YYYY') < moment(second.day, 'DD/MM/YYYY') ? -1 : 1
            )
            setVideos(videos)
        } catch (error) {
            navigate('/error')
        }
    }

    useEffect(() => {
        let startDate = undefined
        let endDate = undefined

        if (dates.length > 0 && dates[0] !== '' && dates[1] !== '') {
            let datesToTransform = dates.map(
                date => moment(date, 'DD/MM/YYYY').format('DD-MM-YYYY').toString()
            )
            startDate = datesToTransform[0]
            endDate = datesToTransform[1]
        }

        sortAndSetVideos(camera, startDate, endDate)
    }, [dates])

    return [videosToDisplay, numberOfPages]
}

export default useCameraVideos
