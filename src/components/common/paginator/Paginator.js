import React, {useState} from 'react';
import s from './Paginator.module.css'
import cn from 'classnames';

let Paginator = ({currentPage, totalItemsCount, pageSize, onPageChanged}) => {
    let pageCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }
    let portionSize = 10;
    let [currentPageStart, setCurrentPageStart] = useState(currentPage - (currentPage - 1) % portionSize);

    let pageElements = pages
        .filter(p => p >= currentPageStart && p < currentPageStart + portionSize)
        .map(p => {
                return (<span key={p}
                              className={cn({[s.selectedPage]: p === currentPage}, s.pageNumber)}
                              onClick={() => {
                                  onPageChanged(p)
                              }}>{p}</span>);
            }
        );
    return (
        <div>
            {currentPageStart > 1
            && <button onClick={() => setCurrentPageStart(currentPageStart - portionSize)}>Prev</button>}
            {pageElements}
            {currentPageStart + portionSize - 1 < totalItemsCount
            && <button onClick={() => setCurrentPageStart(currentPageStart + portionSize)}>Next</button>}
        </div>
    )
}

export default Paginator;