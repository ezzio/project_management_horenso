import React, { useState } from 'react'
import './Issues.scss'
import { AiOutlineSearch, AiOutlineCheck } from 'react-icons/ai'
import { VscIssues } from 'react-icons/vsc'
import { MdChatBubbleOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'

function Issues() {

    const [button, setButton] = useState(1)
    const [sort, setSort] = useState(1)

    const selectButton = (n) => {
        setButton(n)
    }

    const selectSort = (n) => {
        setSort(n)
    }
    
    return (
        <div className='issues-ctn'>
            <div className='issues-ctn__search-ctn'>
                { (button === 1) ?
                    <button  className='issues-ctn__search-ctn__created-btn-selected'>
                        <span className='issues-ctn__search-ctn__created-btn-selected__text'>Created</span>
                    </button> :
                    <button onClick={() => selectButton(1)} className='issues-ctn__search-ctn__created-btn'>
                        <span className='issues-ctn__search-ctn__created-btn__text'>Created</span>
                    </button> 
                }
                { (button === 2) ?
                    <button className='issues-ctn__search-ctn__assigned-btn-selected'>
                        <span className='issues-ctn__search-ctn__assigned-btn-selected__text'>Assigned</span>
                    </button> :
                    <button onClick={() => selectButton(2)} className='issues-ctn__search-ctn__assigned-btn'>
                        <span className='issues-ctn__search-ctn__assigned-btn__text'>Assigned</span>
                    </button>
                }
                {  (button === 3) ?
                    <button className='issues-ctn__search-ctn__mentioned-btn-selected'>
                        <span className='issues-ctn__search-ctn__mentioned-btn-selected__text'>Mentioned</span>
                    </button> :
                    <button onClick={() => selectButton(3)} className='issues-ctn__search-ctn__mentioned-btn'>
                        <span className='issues-ctn__search-ctn__mentioned-btn__text'>Mentioned</span>
                    </button>
                }
                <AiOutlineSearch style={{position: 'absolute', top: 20, left: 330, zIndex: 3, fontSize: 20}}/>
                <input className='issues-ctn__search-ctn__search-bar' placeholder='Enter issues name...' /> 
            </div>
            <div className='issues-ctn__result-ctn'>
                <div className='issues-ctn__result-ctn__sort-ctn'>
                    {   (sort === 1) ?
                        <button className='issues-ctn__result-ctn__sort-ctn__open-btn'>
                            <VscIssues style={{position: 'relative', fontSize: 20, top: 3, left: 0, fontWeight: 600}} />
                            <span className='issues-ctn__result-ctn__sort-ctn__open-btn__text-selected'>3 Open</span>
                        </button> :
                        <button className='issues-ctn__result-ctn__sort-ctn__open-btn'>
                            <VscIssues style={{position: 'relative', fontSize: 20, top: 3, left: 0}} />
                            <span onClick={() => selectSort(1)} className='issues-ctn__result-ctn__sort-ctn__open-btn__text'>3 Open</span>
                        </button>
                    }
                    {   (sort === 2) ?
                        <button className='issues-ctn__result-ctn__sort-ctn__closed-btn'>
                            <AiOutlineCheck style={{position: 'relative', fontSize: 20, top: 3, left: 0}} />
                            <span className='issues-ctn__result-ctn__sort-ctn__closed-btn__text-selected'>0 Closed</span>
                        </button> :
                        <button className='issues-ctn__result-ctn__sort-ctn__closed-btn'>
                            <AiOutlineCheck style={{position: 'relative', fontSize: 20, top: 3, left: 0}} />
                            <span onClick={() => selectSort(2)} className='issues-ctn__result-ctn__sort-ctn__closed-btn__text'>0 Closed</span>
                        </button>
                    }
                    <details className='issues-ctn__result-ctn__sort-ctn__visibility-btn'>
                        <summary className='issues-ctn__result-ctn__sort-ctn__visibility-btn__summary'>Visibility</summary>
                        <div className='issues-ctn__result-ctn__sort-ctn__visibility-btn__summary__option-ctn'>
                            <header className='issues-ctn__result-ctn__sort-ctn__visibility-btn__summary__option-ctn__header'>
                                <span>Repository visibility</span> 
                            </header>
                            <p className='issues-ctn__result-ctn__sort-ctn__visibility-btn__summary__option-ctn__option'>Private repository only</p>
                            <p className='issues-ctn__result-ctn__sort-ctn__visibility-btn__summary__option-ctn__option'>Public repository only</p>
                        </div>
                    </details>
                    <details className='issues-ctn__result-ctn__sort-ctn__organization-btn'>
                        <summary className='issues-ctn__result-ctn__sort-ctn__organization-btn__summary'>Organization</summary>
                        <div className='issues-ctn__result-ctn__sort-ctn__organization-btn__summary__option-ctn'>
                            <header className='issues-ctn__result-ctn__sort-ctn__organization-btn__summary__option-ctn__header'>
                                <span>Filler by organization or owner</span>
                            </header>
                            <input className='issues-ctn__result-ctn__sort-ctn__organization-btn__summary__option-ctn__input' placeholder='Filler organizations'/>
                            <p className='issues-ctn__result-ctn__sort-ctn__organization-btn__summary__option-ctn__option'>UserName</p>
                        </div>
                    </details>
                    <details className='issues-ctn__result-ctn__sort-ctn__sort-btn'>
                        <summary className='issues-ctn__result-ctn__sort-ctn__sort-btn__summary'>Sort</summary>
                        <div className='issues-ctn__result-ctn__sort-ctn__sort-btn__summary__option-ctn'>
                            <header className='issues-ctn__result-ctn__sort-ctn__sort-btn__summary__option-ctn__header'>
                                <span>Sort by</span>
                            </header>
                            <p className='issues-ctn__result-ctn__sort-ctn__sort-btn__summary__option-ctn__option'>Newest</p>
                            <p className='issues-ctn__result-ctn__sort-ctn__sort-btn__summary__option-ctn__option'>Oldest</p>
                            <p className='issues-ctn__result-ctn__sort-ctn__sort-btn__summary__option-ctn__option'>Most commented</p>
                            <p className='issues-ctn__result-ctn__sort-ctn__sort-btn__summary__option-ctn__option'>Least commented</p>
                            <p className='issues-ctn__result-ctn__sort-ctn__sort-btn__summary__option-ctn__option'>Recently updated</p>
                            <p className='issues-ctn__result-ctn__sort-ctn__sort-btn__summary__option-ctn__option'>Least recently updated</p>
                        </div>
                    </details>
                </div>
                <div className='issues-ctn__result-ctn__display-ctn'>
                    {/* <div className='issues-ctn__result-ctn__display-ctn__no-result'>
                        <VscIssues style={{position: 'absolute', top: 80, left: 360, fontSize: 30, fontWeight: 600}} />
                        <h2 className='issues-ctn__result-ctn__display-ctn__no-result__text'>No results matched your search</h2>
                    </div> */}
                    <div className='issue'>
                        <VscIssues style={{position: 'absolute', fontSize: 24, top: 4, left: 12, color: 'green', fontWeight: 'bold'}} />
                        <div className='issue__detail-ctn'>
                            <Link className='issue__detail-ctn__repo-title-author'>UserName/my-branch</Link>
                            <Link className='issue__detail-ctn__issue-name'>React Projects</Link>
                            <div className='issue__comment-ctn'>
                                <MdChatBubbleOutline style={{position: 'relative', fontSize: 18, color: 'grey', top: 3}}/>
                                <span className='issue__comment-ctn__text'>2</span>
                            </div>
                        </div>
                        <span className='issue__detail-ctn__description'>#2 opened 21 minutes ago by UserName</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Issues
