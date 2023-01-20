import React, {useState} from 'react'
import CamerAIRoutes from './Routes'
import {NodeIndexOutlined, HomeOutlined, VideoCameraOutlined,} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import './index.css'
import {ItemType} from "antd/es/menu/hooks/useItems";
import {useNavigate} from "react-router-dom";

const { Sider, Content } = Layout;

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const navigate = useNavigate()

    const menuOptions: ItemType[] = [
        {
            key: '1',
            icon: <HomeOutlined />,
            label: 'Home',
            onClick: () => navigate('')
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'Cameras',
            onClick: () => navigate('/cameras')
        },
        {
            key: '3',
            icon: <NodeIndexOutlined />,
            label: 'Nodes',
        },
    ]

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={ collapsed } onMouseOver={ () => setCollapsed(false) } onMouseLeave={ () => setCollapsed(true) }>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuOptions}/>
            </Sider>
            <Layout className="site-layout">
                <Content style={ {background: colorBgContainer} }>
                    <CamerAIRoutes/>
                </Content>
            </Layout>
        </Layout>
    )
}

export default App
