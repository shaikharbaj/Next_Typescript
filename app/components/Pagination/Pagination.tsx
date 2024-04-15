import React from 'react';
import styles from './pagination.module.css'; // Import your CSS styles

type Proptype = {
       currentpage:number,
       setCurrentPage:any,
       total:number,
       perpage:number
}
function Pagination({ currentpage, setCurrentPage, total, perpage }:Proptype) {
    // Calculate total pages
    const totalPages = Math.ceil(total / perpage);

    // Handle page change
    const handlePageChange = (page:number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Determine range of pages to display
    const getPageRange = () => {
        const range = [];
        const maxVisiblePages = 5; // Maximum visible page numbers in the range

        let startPage = Math.max(1, currentpage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Adjust startPage if endPage is at the end of the range
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }

        return range;
    };

    return (
        <div className={styles.pagination}>
            {/* Previous button */}
            <button
                onClick={() => handlePageChange(currentpage - 1)}
                disabled={currentpage === 1}
                className={styles.navButton}
            >
                Previous
            </button>

            {/* Page numbers */}
            {getPageRange().map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${styles.pageButton} ${currentpage === page ? styles.activeButton : ''}`}
                >
                    {page}
                </button>
            ))}

            {/* Next button */}
            <button
                onClick={() => handlePageChange(currentpage + 1)}
                disabled={currentpage === totalPages}
                className={styles.navButton}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
