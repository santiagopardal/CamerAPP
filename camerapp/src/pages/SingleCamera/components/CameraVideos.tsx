import React, {useState} from 'react'
import {DownloadOutlined} from '@ant-design/icons'
import {Collapse, DatePicker} from 'antd'
import {Video, download} from '../../../api/Videos'
import Camera from '../../../models/Camera'
import useCameraVideos from '../../../hooks/useCameraVideos'
import Pagination from '@mui/material/Pagination'
import './CameraVideos.css'

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
    const [dates, setDates] = useState<string[]>([])
    const [index, setIndex] = useState<number>(1)
    const [videosToDisplay, numberOfPages] = useCameraVideos(camera, dates, index, PAGINATION_SIZE)

    return (
        <div className='videos'>
            <h2>Videos</h2>
            <div className='search'>
                <span>Search by dates</span>
                <RangePicker onChange={(dates, datesAsString) => setDates(datesAsString)} format={dateFormat}></RangePicker>
            </div>
            <div className='list'>
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
                        count={ numberOfPages }
                    />
                }
            </div>
        </div>
    )
}

export default CameraVideos
