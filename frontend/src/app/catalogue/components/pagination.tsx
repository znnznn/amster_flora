'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useQueryState } from 'nuqs'

import { Button } from '@/components/ui/button'
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    Pagination as PaginationWrapper
} from '@/components/ui/pagination'

interface CataloguePaginationProps {
    count: number
}

export const CataloguePagination = ({ count }: CataloguePaginationProps) => {
    const limitStep = 24

    const [limit, setLimit] = useQueryState('limit', {
        defaultValue: limitStep,
        parse: Number
    })

    const handleLimitChange = () => setLimit(limit + limitStep)

    const [offset, setOffset] = useQueryState('offset', {
        shallow: false
    })

    const totalPages = Math.ceil(count / limit) || 1
    const currentPage = Math.floor(parseInt(offset || '0') / limit) + 1

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setOffset((currentPage * limit).toString())
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setOffset(((currentPage - 2) * limit).toString())
        }
    }

    const handleGoToPage = (page: number) => {
        setOffset(((page - 1) * limit).toString())
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
        <div className='flex flex-col items-center justify-center gap-y-4'>
            <Button
                onClick={handleLimitChange}
                variant='ghost'>
                Показати ще {limitStep}
            </Button>
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
