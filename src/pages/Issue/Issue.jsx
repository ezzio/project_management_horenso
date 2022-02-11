import React from 'react'
import { BiBookBookmark } from 'react-icons/bi'
import "./Issue.scss";
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { IoEllipsisVerticalSharp } from 'react-icons/io5'
import { VscIssues } from 'react-icons/vsc'

function Issue() {

    const pfp = 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png';

    return (
        <div className='issue-ctn'>
            <div className='issue-ctn__repo-ctn-header'>
                <BiBookBookmark style={{position: 'relative', top: 25, left: 30 ,fontSize: 25}}/>
                <span className='issue-ctn__repo-ctn-header__author'>Jeff</span>
                <span style={{position: 'relative', top: 15, left: 45, fontSize: 30}}>/</span>
                <span className='issue-ctn__repo-ctn-header__repo-name'>pee pee</span>
                <div className='issue-ctn__repo-ctn-header__type-ctn'>
                    <span className='issue-ctn__repo-ctn-header__type-ctn__text'>Public</span>
                </div>
            </div>
            <div className='issue-ctn__user-issue-ctn'>
                <div className='issue-ctn__user-issue-ctn__header'>
                    <div className='issue-ctn__user-issue-ctn__header__title-ctn'>
                        <span className='issue-ctn__user-issue-ctn__header__title-ctn__title'>I have an issue</span>
                        <span className='issue-ctn__user-issue-ctn__header__title-ctn__number'>#69</span>
                    </div>
                    <div className='issue-ctn__user-issue-ctn__header__poster-ctn'>
                        {/* <button className='issue-ctn__user-issue-ctn__header__poster-ctn__closed'>
                            <IoIosCheckmarkCircleOutline 
                            style={{position: 'absolute', color: 'white', fontSize: 20, top: 55, left: 10}} />
                            <span className='issue-ctn__user-issue-ctn__header__poster-ctn__closed__text'>Closed</span>
                        </button> */}
                        <button className='issue-ctn__user-issue-ctn__header__poster-ctn__open'>
                            <VscIssues style={{position: 'absolute', color: 'white', fontSize: 20, top: 53, left: 10}}/>
                            <span className='issue-ctn__user-issue-ctn__header__poster-ctn__open__text'>Open</span>
                        </button>
                        <span className='issue-ctn__user-issue-ctn__header__poster-ctn__poster-and-comment'>Dylan opened this issue 3 minutes ago - 1 comment</span>
                    </div>
                    <button className='issue-ctn__user-issue-ctn__header__title-ctn__new-btn'>
                        <span className='issue-ctn__user-issue-ctn__header__title-ctn__new-btn__text'>New Issue</span>
                    </button>
                    <div className='issue-ctn__user-issue-ctn__post-ctn'>
                        <div className='issue-ctn__user-issue-ctn__post-ctn__author-ctn'>
                            <img className='issue-ctn__user-issue-ctn__post-ctn__author-ctn__pic' src={pfp} alt='default profile pic'></img>
                            <span className='issue-ctn__user-issue-ctn__post-ctn__author-ctn__author'>Dylan</span>
                            <span className='issue-ctn__user-issue-ctn__post-ctn__author-ctn__time'> posted this 1 minute ago</span>
                            <IoEllipsisVerticalSharp style={{position: 'absolute', fontSize: 25, left: 1180, top: 10}}/>
                        </div>
                        <div className='issue-ctn__user-issue-ctn__post-ctn__content-ctn'>
                            <span>I have this issue where this app just wont work lmao what a garbage app</span>
                        </div>
                    </div>
                    <div className='issue-ctn__user-issue-ctn__comment-section'>
                        <div className='issue-ctn__user-issue-ctn__comment-ctn'>
                            <div className='issue-ctn__user-issue-ctn__comment-ctn__author-ctn'>
                                <img className='issue-ctn__user-issue-ctn__comment-ctn__author-ctn__pic' src={pfp} alt='default profile pic'></img>
                                <span className='issue-ctn__user-issue-ctn__comment-ctn__author-ctn__author'>Minh</span>
                                <span className='issue-ctn__user-issue-ctn__comment-ctn__author-ctn__time'> posted this 30 seconds ago</span>
                                <IoEllipsisVerticalSharp style={{position: 'absolute', fontSize: 25, left: 1180, top: 10}}/>
                            </div>
                            <div className='issue-ctn__user-issue-ctn__post-ctn__content-ctn'>
                                <span>Have you tried turning it on and off again?</span>
                            </div>
                        </div>
                        <div className='issue-ctn__user-issue-ctn__comment-ctn'>
                            <div className='issue-ctn__user-issue-ctn__comment-ctn__author-ctn'>
                                <img className='issue-ctn__user-issue-ctn__comment-ctn__author-ctn__pic' src={pfp} alt='default profile pic'></img>
                                <span className='issue-ctn__user-issue-ctn__comment-ctn__author-ctn__author'>Dylan</span>
                                <span className='issue-ctn__user-issue-ctn__comment-ctn__author-ctn__time'> posted this 10 seconds ago</span>
                                <div className='issue-ctn__user-issue-ctn__comment-ctn__author-ctn__op-ctn'>
                                    <span className='issue-ctn__user-issue-ctn__comment-ctn__author-ctn__op-ctn__text'>OP</span>
                                </div>
                                <IoEllipsisVerticalSharp style={{position: 'absolute', fontSize: 25, left: 1180, top: 10}}/>
                            </div>
                            <div className='issue-ctn__user-issue-ctn__post-ctn__content-ctn'>
                                <span>yeah</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='reply-ctn'>
                <div className='reply-ctn__author-ctn'>
                    <img className='reply-ctn__author-ctn__pic' src={pfp} alt='default profile pic'></img>
                    <span className='reply-ctn__author-ctn__author'>You</span>
                    <button className='reply-ctn__author-ctn__bold-btn'>
                        <span className='reply-ctn__author-ctn__bold-btn__text'>B</span>
                    </button>
                    <button className='reply-ctn__author-ctn__italic-btn'>
                        <span className='reply-ctn__author-ctn__italic-btn__text'>I</span>
                    </button>
                    <button className='reply-ctn__author-ctn__quote-btn'>
                        <span className='reply-ctn__author-ctn__quote-btn__text'>" "</span>
                    </button>
                </div>
                <textarea className='reply-ctn__content-ctn' rows="4" cols="50" 
                placeholder='Write your comment here (drag and dropping, or pasting a file to attach files)...'
                />
                <div className='reply-ctn__guideline'>
                    <span className='reply-ctn__guideline__text'>
                        Please make sure your comments are respectful toward others. Hate speech is absolutely not tolerated!
                    </span>
                    <button className='reply-ctn__post-btn'>
                        <span className='reply-ctn__post-btn__text'>Post</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Issue
