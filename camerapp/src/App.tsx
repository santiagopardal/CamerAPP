import React from 'react'
import NavBar from './CamerAINavBar'
import CamerAIRoutes from './Routes'
import {Layout} from 'antd'
import {Content} from 'antd/es/layout/layout'

function App() {
    return (
        <>
            <NavBar/>
            <Layout className="site-layout">
                <Content>
                    <CamerAIRoutes/>
                </Content>
            </Layout>
        </>
    )
}

export default App
