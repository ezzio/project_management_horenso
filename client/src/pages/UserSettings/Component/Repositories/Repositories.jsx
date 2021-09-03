import React from 'react'
import './Repositories.scss'
import { BiBookBookmark } from 'react-icons/bi'
import { AiOutlineFork, AiOutlineStar, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

function Repositories() {
    return (
        <div className='repo-ctn'>
            <div className='repo-ctn__search-ctn'>
                <input className='repo-ctn__search-ctn__searchbar' placeholder='Find a repository...' />
                <details className='repo-ctn__search-ctn__type-btn'>
                    <summary className='repo-ctn__search-ctn__type-btn__summary'>Type</summary>
                    <div className='repo-ctn__search-ctn__type-btn__summary__option-ctn'>
                        <header className='repo-ctn__search-ctn__type-btn__summary__option-ctn__header'>
                            <span>Select type</span>
                            <AiOutlineClose style={{position: 'absolute', right: 14, top: 10}} />
                        </header>
                        <p className='repo-ctn__search-ctn__type-btn__summary__option-ctn__option'> 
                            <AiOutlineCheck style={{position: 'absolute', left: 14}} /> 
                            All
                        </p>
                        <p className='repo-ctn__search-ctn__type-btn__summary__option-ctn__option'>Public</p>
                        <p className='repo-ctn__search-ctn__type-btn__summary__option-ctn__option'>Private</p>
                        <p className='repo-ctn__search-ctn__type-btn__summary__option-ctn__option'>Sources</p>
                        <p className='repo-ctn__search-ctn__type-btn__summary__option-ctn__option'>Forks</p>
                        <p className='repo-ctn__search-ctn__type-btn__summary__option-ctn__option'>Archived</p>
                        <p className='repo-ctn__search-ctn__type-btn__summary__option-ctn__option'>Mirrors</p>
                    </div>
                </details>
                <details className='repo-ctn__search-ctn__language-btn'>
                    <summary className='repo-ctn__search-ctn__language-btn__summary'>Language</summary>
                    <div className='repo-ctn__search-ctn__language-btn__summary__option-ctn'>
                        <header className='repo-ctn__search-ctn__language-btn__summary__option-ctn__header'>
                            <span>Select language</span>
                            <AiOutlineClose style={{position: 'absolute', right: 14, top: 10}} />
                        </header>
                        <p className='repo-ctn__search-ctn__language-btn__summary__option-ctn__option'>
                            <AiOutlineCheck style={{position: 'absolute', left: 14}} /> 
                            All
                        </p>
                        <p className='repo-ctn__search-ctn__language-btn__summary__option-ctn__option'>JavaScript</p>
                        <p className='repo-ctn__search-ctn__language-btn__summary__option-ctn__option'>CSS</p>                       
                    </div>
                </details>
                <details className='repo-ctn__search-ctn__sort-btn'>
                    <summary className='repo-ctn__search-ctn__sort-btn__summary'>Sort</summary>
                    <div className='repo-ctn__search-ctn__sort-btn__summary__option-ctn'>
                        <header className='repo-ctn__search-ctn__sort-btn__summary__option-ctn__header'>
                            <span>Select order</span>
                            <AiOutlineClose style={{position: 'absolute', right: 14, top: 10}} />
                        </header>
                        <p className='repo-ctn__search-ctn__sort-btn__summary__option-ctn__option'>
                            <AiOutlineCheck style={{position: 'absolute', left: 14}} /> 
                            Last updated
                        </p>
                        <p className='repo-ctn__search-ctn__sort-btn__summary__option-ctn__option'>Name</p>
                        <p className='repo-ctn__search-ctn__sort-btn__summary__option-ctn__option'>Stars</p>                        
                    </div>
                </details>
                <button className='repo-ctn__search-ctn__new-btn'>
                    <BiBookBookmark style={{position: 'absolute', color: 'white', fontSize: 16, left: 14}} />
                    <span className='repo-ctn__search-ctn__new-btn__text'>New</span>
                </button>
            </div>
            <div className='repo-ctn__repositories'>
                <div className='repo-ctn__repositories__details-ctn'>
                    <h3 className='repo-ctn__repositories__details-ctn__name'>react-projects</h3>
                    <span className='repo-ctn__repositories__details-ctn__description'>This is a description for react-projects</span>
                    <div className='repo-ctn__repositories__other-details-ctn'>   
                        <span className='repo-ctn__repositories__other-details-ctn__lang-color' />
                        <span className='repo-ctn__repositories__other-details-ctn__language'>CSS</span>
                        <AiOutlineFork style={{position: 'relative', left: 21, top: 3}}/>
                        <span className='repo-ctn__repositories__other-details-ctn__forks'>1,375</span>
                        <span className='repo-ctn__repositories__other-details-ctn__update'>Updated on 5 Jul</span>
                    </div>
                    <button className='repo-ctn__repositories__star-btn'>
                        <AiOutlineStar style={{ position: 'relative', fontSize: 18, right: 4, top: 4}}/>
                        <span className='repo-ctn__repositories__star-btn__text'>Star</span>
                    </button>
                    <span className='repo-ctn__repositories__completion'>98%</span>
                </div>
            </div>
        </div>
    )
}

export default Repositories