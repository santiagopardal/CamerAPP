import React, {useEffect, useState} from 'react'
import {getVideos, Video} from '../api/Videos'
import moment from 'moment/moment'
import Camera from '../models/Camera'

const useCameraVideos = (camera: Camera, dates: string[], index: number, paginationSize: number): [Video[], Video[]] => {
    const [videos, setVideos] = useState<Video[]>([])
    const [videosToDisplay,  setVideosToDisplay] = useState<Video[]>([])

    useEffect(() => {
        let startDate = undefined
        let endDate = undefined

        if (dates.length > 0) {
            let datesToTransform = dates.map(
                date => moment(date, 'DD/MM/YYYY').format('DD-MM-YYYY').toString()
            )
            startDate = datesToTransform[0]
            endDate = datesToTransform[1]
        }

        let videos = getVideos(camera, startDate, endDate)
        videos
            .then(
                videos => videos.sort(
                    (first, second) =>
                        moment(first.day, 'DD/MM/YYYY') < moment(second.day, 'DD/MM/YYYY') ? -1 : 1)
            )
            .then(setVideos)
    }, [dates])

    useEffect(() =>
        setVideosToDisplay(
            videos.slice(
                ((index - 1) * paginationSize),
                index * paginationSize
            )
        ), [index, videos]);

    return [videos, videosToDisplay]
}

export default useCameraVideos
