import React, { Fragment } from 'react';
import BookmarkList from './BookmarkList';
import { H6, UL } from '../../../AbstractElements';
import { Bookmarks } from '../../../Constant';
import { Bookmark } from "react-feather";

const RemoveBookmark = ({ bookmarkItems }) => {
    return (
        <Fragment>
            <div className="front dropdown-title p-0">
            <Bookmark />
                <H6  className= 'f-18 p-20' >{Bookmarks}</H6>
                <UL  className= 'simple-list pt-0 p-3 bookmark-dropdown' >
                    <BookmarkList bookmarkItems={bookmarkItems} />
                </UL>
            </div>
        </Fragment>
    );
};
export default RemoveBookmark;