'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useQueryState } from 'nuqs'

import { defaultLimit, defaultOffset } from '@/api/config/api'
import { Button } from '@/components/ui/button'
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    Pagination as PaginationWrapper
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

interface ProductListPaginationPaginationProps {
    count: number
    className?: string
}

export const ProductListPagination = ({
    count,
    className
}: ProductListPaginationPaginationProps) => {
    const [limit, setLimit] = useQueryState('limit', {
        defaultValue: defaultLimit,
        shallow: false,
        parse: Number
    })

    const handleLimitChange = () => setLimit(limit + defaultLimit)

    const [offset, setOffset] = useQueryState('offset', {
        defaultValue: defaultOffset,
        shallow: false,
        parse: Number
    })

    const totalPages = Math.ceil(count / limit) || 1
    const currentPage = Math.floor(offset / limit) + 1

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setOffset(currentPage * limit)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setOffset((currentPage - 2) * limit)
        }
    }

    const handleGoToPage = (page: number) => {
        setOffset((page - 1) * limit)
    }

    const renderPageNumbers = () => {
        const pageNumbers: (number | string)[] = []
        const maxVisiblePages = 5
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        if (startPage > 1) {
            pageNumbers.push(1)
            if (startPage > 2) pageNumbers.push('...')
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pageNumbers.push('...')
            pageNumbers.push(totalPages)
        }

        return pageNumbers
    }

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-y-4',
                className
            )}>
            {count > defaultLimit ? (
                <Button
                    onClick={handleLimitChange}
                    variant='ghost'>
                    Показати ще {defaultLimit}
                </Button>
            ) : null}
            <PaginationWrapper>
                <PaginationContent>
                    <PaginationItem>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={handleGoToPage.bind(null, 1)}
                            disabled={currentPage === 1}>
                            <ChevronsLeft className='size-4' />
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}>
                            <ChevronLeft className='size-4' />
                        </Button>
                    </PaginationItem>

                    {renderPageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                            {typeof page === 'number' ? (
                                <Button
                                    variant={currentPage === page ? 'default' : 'outline'}
                                    size='icon'
                                    onClick={() => handleGoToPage(page)}>
                                    {page}
                                </Button>
                            ) : (
                                <PaginationEllipsis key={index} />
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}>
                            <ChevronRight className='size-4' />
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={handleGoToPage.bind(null, totalPages)}
                            disabled={currentPage === totalPages}>
                            <ChevronsRight className='size-4' />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </PaginationWrapper>
        </div>
    )
}
