import React from "react";
import "./Project.scss"
import { BiBookBookmark } from 'react-icons/bi'
import { AiOutlineStar } from 'react-icons/ai'
import { GrDrag } from 'react-icons/gr'


function Project() {

    return (
        <div className='project-ctn'>
            <div className='project-ctn__pinned-ctn'>
                <div className='project-ctn__pinned-ctn__label-ctn'>
                    <span className='project-ctn__pinned-ctn__label-ctn__label'>Your projects</span>
                    <button className='project-ctn__pinned-ctn__label-ctn__customize'>Customize your pins</button>
                </div>
                <div className='project-ctn__repos-ctn'>
                    <div className='project-ctn__repos-ctn__repo'>
                        <div className='project-ctn__repos-ctn__repo__details'>
                            <div className='project-ctn__repos-ctn__repo__details__title'>
                                <BiBookBookmark style={{position: "absolute", fontSize: 18}} />
                                <span className='project-ctn__repos-ctn__repo__details__title__text'>react-projects</span>
                                <AiOutlineStar style={{position: 'absolute', fontSize: 16, left: 130, top: 2}} />
                                <span className='project-ctn__repos-ctn__repo__details__star-num'>2</span>
                            </div>
                            <div className='project-ctn__repos-ctn__repo__description'>
                                <span className='project-ctn__repos-ctn__repo__description__text'>This is a description</span>
                                <span className='project-ctn__repos-ctn__repo__description__create-date'>Created on 5 Jul 2021</span>
                            </div>
                            <div className='project-ctn__repos-ctn__repo__type-ctn'>
                                <span className='project-ctn__repos-ctn__repo__type-ctn__text'>Public</span>
                            </div>                            
                            <GrDrag style={{position: 'absolute', top: 0, left: 398}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project