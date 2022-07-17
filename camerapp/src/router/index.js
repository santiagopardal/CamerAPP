import Main from "@/views/MainView";
import CameraStatisticsView from "@/views/CameraStatisticsView";

const routes = [
    { path: '/', component: Main },
    { path: '/camera/:camera', component: CameraStatisticsView }
]

export default routes