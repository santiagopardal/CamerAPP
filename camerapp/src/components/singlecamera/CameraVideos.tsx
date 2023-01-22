import React, {useEffect, useState} from 'react'
import {DownloadOutlined} from '@ant-design/icons'
import {Collapse, DatePicker} from 'antd'
import {Video, getVideos, download} from '../../api/Videos'
import Camera from '../../models/Camera'
import moment from 'moment'

const { RangePicker } = DatePicker
const { Panel } = Collapse
const dateFormat = 'DD/MM/YYYY'

const genDownloadButton = (camera: Camera, date: string) => (
    <DownloadOutlined
        onClick={
        (event) => {
            event.stopPropagation()
            download(camera, date).catch(error => console.log(error, 'was error'))
        }}
    />
)

function CameraVideos({ camera }: { camera: Camera }) {
    const [dates, setDates] = useState<string[]>()
    const [videos, setVideos] = useState<Video[]>([])

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

    return (
        <>
            <h2>Videos</h2>
            <RangePicker onChange={(dates, datesAsString) => setDates(datesAsString)} format={dateFormat}></RangePicker>
            <Collapse defaultActiveKey={['1']}>
                {videos.length > 0 &&
                    videos.map(video =>
                        <Panel header={video.day} key={`camera_${camera?.getID()}_${video.day}_${video.file_size}`} extra={genDownloadButton(camera, video.day)}/>
                    )
                }
                {
                    videos.length === 0 && <span>No results!</span>
                }
            </Collapse>
        </>
    )
}

export default CameraVideos
