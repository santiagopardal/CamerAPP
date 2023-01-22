import React, {useEffect, useState} from 'react'
import {DownloadOutlined} from '@ant-design/icons'
import {Collapse, DatePicker} from 'antd'
import {Video, getVideos, download} from '../../api/Videos'
import Camera from '../../models/Camera'
import moment from 'moment'
import Pagination from '@mui/material/Pagination'

const { RangePicker } = DatePicker
const { Panel } = Collapse
const dateFormat = 'DD/MM/YYYY'
const PAGINATION_SIZE = 10

const genDownloadButton = (camera: Camera, date: string) => (
    <DownloadOutlined
        onClick={
        (event) => {
            event.stopPropagation()
            download(camera, date).catch(error => console.log(error, 'was error'))
        }}
    />
)

const createVideoPanel = (camera: Camera, video: Video) =>
    <Panel
        header={video.day}
        key={`camera_${camera?.getID()}_${video.day}_${video.file_size}`}
        extra={genDownloadButton(camera, video.day)}
    />

function CameraVideos({ camera }: { camera: Camera }) {
    const [dates, setDates] = useState<string[]>()
    const [index, setIndex] = useState<number>(1)
    const [videos, setVideos] = useState<Video[]>([])
    const [videosToDisplay,  setVideosToDisplay] = useState<Video[]>([])

    useEffect(() => {
        let startDate = undefined
        let endDate = undefined

        if (dates) {
            let datesToTransform = dates.map(
                date => moment(date, 'DD/MM/YYYY').format('DD-MM-YYYY').toString()
            )
            startDate = datesToTransform[0]
            endDate = datesToTransform[1]
        }

        let videos = getVideos(camera, startDate, endDate)
        videos.then(setVideos)
    }, [dates])

    useEffect(() =>
        setVideosToDisplay(
            videos.slice(
                ((index - 1) * PAGINATION_SIZE),
                index * PAGINATION_SIZE
            )
        ), [index, videos]);


    return (
        <>
            <h2>Videos</h2>
            <RangePicker onChange={(dates, datesAsString) => setDates(datesAsString)} format={dateFormat}></RangePicker>
            <Collapse defaultActiveKey={['1']}>
                {
                    videosToDisplay.length > 0 && videosToDisplay.map(video => createVideoPanel(camera, video))
                }
                {
                    videosToDisplay.length === 0 && <span>No results!</span>
                }
            </Collapse>
            {
                videosToDisplay.length > PAGINATION_SIZE &&
                <Pagination
                    onChange={ (event, index) => setIndex(index) }
                    count={Math.ceil(videos.length / PAGINATION_SIZE)}
                />
            }
        </>
    )
}

export default CameraVideos
