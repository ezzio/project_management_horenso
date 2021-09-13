import React from "react";
import "./Overview.scss"
import { BiBookBookmark } from 'react-icons/bi'
import { AiOutlineStar } from 'react-icons/ai'
import { GrDrag } from 'react-icons/gr'

function Overview() {

    return (
        <div className='overview-ctn'>
            <div className='overview-ctn__pinned-ctn'>
                <div className='overview-ctn__pinned-ctn__label-ctn'>
                    <span className='overview-ctn__pinned-ctn__label-ctn__label'>Your repositories</span>
                    <button className='overview-ctn__pinned-ctn__label-ctn__customize'>Customize your pins</button>
                </div>
                <div className='overview-ctn__repos-ctn'>
                    <div className='overview-ctn__repos-ctn__repo'>
                        <div className='overview-ctn__repos-ctn__repo__details'>
                            <div className='overview-ctn__repos-ctn__repo__details__title'>
                                <BiBookBookmark style={{position: "absolute", fontSize: 18}} />
                                <span className='overview-ctn__repos-ctn__repo__details__title__text'>react-projects</span>
                            </div>
                            <div className='overview-ctn__repos-ctn__repo__description'>
                                <span className='overview-ctn__repos-ctn__repo__description__text'>This is a description</span>
                            </div>
                            <div className='overview-ctn__repos-ctn__repo__other-details'>
                                <span className='overview-ctn__repos-ctn__repo__other-details__lang-color' style={{backgroundColor: 'purple'}}/>
                                <span className='overview-ctn__repos-ctn__repo__other-details__language'>CSS</span>
                                <AiOutlineStar style={{position: 'absolute', fontSize: 16, left: 85, top: 2}} />
                                <span className='overview-ctn__repos-ctn__repo__other-details__star-num'>2</span>
                            </div>
                            <GrDrag style={{position: 'absolute', top: 0, left: 398}}/>
                            <div className='overview-ctn__repos-ctn__repo__type-ctn'>
                                <span className='overview-ctn__repos-ctn__repo__type-ctn__text'>Public</span>
                            </div>
                        </div>
                    </div>
                    <div className='overview-ctn__repos-ctn__repo'>
                        <div className='overview-ctn__repos-ctn__repo__details'>
                            <div className='overview-ctn__repos-ctn__repo__details__title'>
                                <BiBookBookmark style={{position: "absolute", fontSize: 18}} />
                                <span className='overview-ctn__repos-ctn__repo__details__title__text'>react-projects</span>
                            </div>
                            <div className='overview-ctn__repos-ctn__repo__description'>
                                <span className='overview-ctn__repos-ctn__repo__description__text'>This is a description</span>
                            </div>
                            <div className='overview-ctn__repos-ctn__repo__other-details'>
                                <span className='overview-ctn__repos-ctn__repo__other-details__lang-color' style={{backgroundColor: 'purple'}}/>
                                <span className='overview-ctn__repos-ctn__repo__other-details__language'>CSS</span>
                                <AiOutlineStar style={{position: 'absolute', fontSize: 16, left: 85, top: 2}} />
                                <span className='overview-ctn__repos-ctn__repo__other-details__star-num'>2</span>
                            </div>
                            <div className='overview-ctn__repos-ctn__repo__type-ctn'>
                                <span className='overview-ctn__repos-ctn__repo__type-ctn__text'>Public</span>
                            </div>                            
                            <GrDrag style={{position: 'absolute', top: 0, left: 398}}/>
                        </div>
                    </div>
                    <div className='overview-ctn__repos-ctn__repo'>
                        <div className='overview-ctn__repos-ctn__repo__details'>
                            <div className='overview-ctn__repos-ctn__repo__details__title'>
                                <BiBookBookmark style={{position: "absolute", fontSize: 18}} />
                                <span className='overview-ctn__repos-ctn__repo__details__title__text'>react-projects</span>
                            </div>
                            <div className='overview-ctn__repos-ctn__repo__description'>
                                <span className='overview-ctn__repos-ctn__repo__description__text'>This is a description</span>
                            </div>
                            <div className='overview-ctn__repos-ctn__repo__other-details'>
                                <span className='overview-ctn__repos-ctn__repo__other-details__lang-color' style={{backgroundColor: 'purple'}}/>
                                <span className='overview-ctn__repos-ctn__repo__other-details__language'>CSS</span>
                                <AiOutlineStar style={{position: 'absolute', fontSize: 16, left: 85, top: 2}} />
                                <span className='overview-ctn__repos-ctn__repo__other-details__star-num'>2</span>
                            </div>
                            <div className='overview-ctn__repos-ctn__repo__type-ctn'>
                                <span className='overview-ctn__repos-ctn__repo__type-ctn__text'>Public</span>
                            </div>                            
                            <GrDrag style={{position: 'absolute', top: 0, left: 398}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview