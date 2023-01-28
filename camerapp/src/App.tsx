import React from 'react'
import CamerAIRoutes from './Routes'
import {Layout} from 'antd'
import {Content} from 'antd/es/layout/layout'
import CamerAINavBar from './components/CamerAINavBar'

function App() {
    return (
        <>
            <CamerAINavBar/>
            <Layout className="site-layout">
                <Content>
                    <CamerAIRoutes/>
                </Content>
            </Layout>
        </>
    )
}

export default App
