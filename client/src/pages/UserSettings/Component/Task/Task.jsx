import React, { useState } from 'react'
import './Task.scss'
import { BiBookBookmark } from 'react-icons/bi'
import { AiOutlineClockCircle, AiOutlineStar, AiOutlineCheck, AiOutlineClose, AiFillStar } from 'react-icons/ai'

function Task() {

    const [star, setStar] = useState([])

    const starring = (n) => {
        if (star.includes(n)) {
            const removeStar = star.filter((starred) => starred !== n)
            setStar(removeStar)
        }
        else {
            const newStar = [...star, n]
            setStar(newStar)
        }
    }

    return (
        <div className='task-ctn'>
            <div className='task-ctn__search-ctn'>
                <input className='task-ctn__search-ctn__searchbar' placeholder='Find a task...' />
                <details className='task-ctn__search-ctn__type-btn'>
                    <summary className='task-ctn__search-ctn__type-btn__summary'>Type</summary>
                    <div className='task-ctn__search-ctn__type-btn__summary__option-ctn'>
                        <header className='task-ctn__search-ctn__type-btn__summary__option-ctn__header'>
                            <span>Select type</span>
                            <AiOutlineClose style={{position: 'absolute', right: 14, top: 10}} />
                        </header>
                        <p className='task-ctn__search-ctn__type-btn__summary__option-ctn__option'> 
                            <AiOutlineCheck style={{position: 'absolute', left: 14}} /> 
                            All
                        </p>
                        <p className='task-ctn__search-ctn__type-btn__summary__option-ctn__option'>Public</p>
                        <p className='task-ctn__search-ctn__type-btn__summary__option-ctn__option'>Private</p>
                        <p className='task-ctn__search-ctn__type-btn__summary__option-ctn__option'>Sources</p>
                        <p className='task-ctn__search-ctn__type-btn__summary__option-ctn__option'>Forks</p>
                        <p className='task-ctn__search-ctn__type-btn__summary__option-ctn__option'>Archived</p>
                        <p className='task-ctn__search-ctn__type-btn__summary__option-ctn__option'>Mirrors</p>
                    </div>
                </details>
                <details className='task-ctn__search-ctn__language-btn'>
                    <summary className='task-ctn__search-ctn__language-btn__summary'>Language</summary>
                    <div className='task-ctn__search-ctn__language-btn__summary__option-ctn'>
                        <header className='task-ctn__search-ctn__language-btn__summary__option-ctn__header'>
                            <span>Select language</span>
                            <AiOutlineClose style={{position: 'absolute', right: 14, top: 10}} />
                        </header>
                        <p className='task-ctn__search-ctn__language-btn__summary__option-ctn__option'>
                            <AiOutlineCheck style={{position: 'absolute', left: 14}} /> 
                            All
                        </p>
                        <p className='task-ctn__search-ctn__language-btn__summary__option-ctn__option'>JavaScript</p>
                        <p className='task-ctn__search-ctn__language-btn__summary__option-ctn__option'>CSS</p>                       
                    </div>
                </details>
                <details className='task-ctn__search-ctn__sort-btn'>
                    <summary className='task-ctn__search-ctn__sort-btn__summary'>Sort</summary>
                    <div className='task-ctn__search-ctn__sort-btn__summary__option-ctn'>
                        <header className='task-ctn__search-ctn__sort-btn__summary__option-ctn__header'>
                            <span>Select order</span>
                            <AiOutlineClose style={{position: 'absolute', right: 14, top: 10}} />
                        </header>
                        <p className='task-ctn__search-ctn__sort-btn__summary__option-ctn__option'>
                            <AiOutlineCheck style={{position: 'absolute', left: 14}} /> 
                            Last updated
                        </p>
                        <p className='task-ctn__search-ctn__sort-btn__summary__option-ctn__option'>Name</p>
                        <p className='task-ctn__search-ctn__sort-btn__summary__option-ctn__option'>Stars</p>                        
                    </div>
                </details>
                <button className='task-ctn__search-ctn__new-btn'>
                    <BiBookBookmark style={{position: 'absolute', color: 'white', fontSize: 16, left: 14}} />
                    <span className='task-ctn__search-ctn__new-btn__text'>New</span>
                </button>
            </div>
            <div className='task-ctn__user-tasks-ctn'>
                <div className='task-ctn__user-tasks'>
                    <div className='task-ctn__user-tasks__details-ctn'>
                        <h3 className='task-ctn__user-tasks__details-ctn__name'>react-projects</h3>
                        <span className='task-ctn__user-tasks__details-ctn__description'>This is a description for react-projects</span>
                        <div className='task-ctn__user-tasks__other-details-ctn'>   
                            <AiOutlineClockCircle style={{position: 'absolute', top: 93, left: 20}} />
                            <span className='task-ctn__user-tasks__other-details-ctn__update'>Updated on 5 Jul</span>
                        </div>
                        <button className='task-ctn__user-tasks__star-btn' onClick={() => starring(1)}>
                            {
                                star.includes(1) ?
                                <AiFillStar style={{ position: 'relative', fontSize: 18, right: 4, top: 4, color: 'yellow'}}/> :                                
                                <AiOutlineStar style={{ position: 'relative', fontSize: 18, right: 4, top: 4}}/> 
                            }
                            <span className='task-ctn__user-tasks__star-btn__text'>Star</span>
                        </button>
                        <div className='task-ctn__user-tasks__completion'>
                            <p className='task-ctn__user-tasks__completion__text'>Completion:</p>
                            <p className='task-ctn__user-tasks__completion__number'>98%</p>
                        </div>
                    </div>
                </div>
                <div className='task-ctn__user-tasks'>
                    <div className='task-ctn__user-tasks__details-ctn'>
                        <h3 className='task-ctn__user-tasks__details-ctn__name'>react-projects</h3>
                        <span className='task-ctn__user-tasks__details-ctn__description'>This is a description for react-projects</span>
                        <div className='task-ctn__user-tasks__other-details-ctn'>   
                            <AiOutlineClockCircle style={{position: 'absolute', top: 93, left: 20}} />
                            <span className='task-ctn__user-tasks__other-details-ctn__update'>Updated on 5 Jul</span>
                        </div>
                        <button className='task-ctn__user-tasks__star-btn' onClick={() => starring(2)}>
                            {
                                star.includes(2) ?
                                <AiFillStar className='icon-outline' style={{ position: 'relative', fontSize: 18, right: 4, top: 4, color: 'yellow'}}/> :                                
                                <AiOutlineStar style={{ position: 'relative', fontSize: 18, right: 4, top: 4}}/> 
                            }
                            <span className='task-ctn__user-tasks__star-btn__text'>Star</span>
                        </button>
                        <div className='task-ctn__user-tasks__completion'>
                            <p className='task-ctn__user-tasks__completion__text'>Completion:</p>
                            <p className='task-ctn__user-tasks__completion__number'>98%</p>
                        </div>
                    </div>
                </div>
                {/* <div className='task-ctn__no-task'>
                    <h3 className='task-ctn__no-repo__text'>You don't have any task yet.</h3>
                </div>         display this when user have no repository */}
            </div>
        </div>
    )
}

export default Task