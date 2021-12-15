import React from 'react'
import { List, Checkbox } from 'antd'

const Links = () => {
  const { Item } = List

  const tasks = [
    {
      title: 'Fix bugs',
      status: 'In Progress',
    },
    {
      title: 'Design UI for login page',
      status: 'Approved',
    },
    {
      title: 'Add change language feature',
      status: 'In Review',
    },
  ]

  return (
    <List
      itemLayout='horizontal'
      dataSource={tasks}
      renderItem={item => (
        <Item>
          <Checkbox style={{marginRight: 15}}/>
          <Item.Meta 
            title={
              <a style={{fontSize: 20}}>
                {item.title}
              </a>
            }
          />
          <button
            className={
              item.status ==='Approved' ? 'approved-decor' :
              (item.status ==='In Progress' ? 'progress-decor' :
                'review-decor'
              )
            }
          >
            <p
              className={
              item.status ==='Approved' ? 'approved-decor__text' :
              (item.status ==='In Progress' ? 'progress-decor__text' :
                'review-decor__text'
              )
            }
            >
              {item.status}
            </p>
          </button>
        </Item>
      )}
    />
  )
}


export default Links
