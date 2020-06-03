import React from 'react';
import s from './Paginator.module.css'

let Paginator = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }
    let pageElements = pages
        .filter(p => p < 12)
        .map(p => {
                return (<span key={p}
                              className={p === props.currentPage ? s.selectedPage : ""}
                              onClick={() => {
                                  props.onPageChanged(p)
                              }}>{p} </span>);
            }
        );
    return (
        <div>
            {pageElements}
        </div>
    )
}

export default Paginator;