import React from 'react'
import { Empty } from 'antd'

function NoProject() {
    return (
        <div>
            <Empty imageStyle={{position: "relative", top: 80}}
                description={
                    <p style={{position: "relative", top: 80}}>No data</p>
                }
            />
        </div>
    )
}

export default NoProject
