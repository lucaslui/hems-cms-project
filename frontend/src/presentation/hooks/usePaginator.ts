import { useEffect, useState } from 'react'
import paginate from '../contents/general/paginate'

type PaginatorParams= {
  initialPage?: number
  initialTotalItems?: number
}

type Paginator = {
  pagination: {
    totalPages: number
    startPage: number
    endPage: number
    startIndex: number
    endIndex: number
    pages: number[]
  }
  currentPage: number
  totalItems: number
  setCurrentPage: (page: number) => any
  setTotalItems: (page: number) => any
}

const PAGINATION_INITIAL_STATE = {
  totalPages: 10,
  startPage: 1,
  endPage: 1,
  startIndex: 1,
  endIndex: 1,
  pages: [1]
}

const CURRENT_PAGE_DEFAULT = 1

const TOTAL_ITEMS_DEFAULT = 1

const usePaginator = (params?: PaginatorParams): Paginator => {
  if (!params) {
    params = {}
  }

  const [currentPage, setCurrentPage] = useState(params.initialPage || CURRENT_PAGE_DEFAULT)
  const [totalItems, setTotalItems] = useState(params.initialTotalItems || TOTAL_ITEMS_DEFAULT)
  const [pagination, setPagination] = useState(PAGINATION_INITIAL_STATE)

  useEffect(() => {
    setPagination(paginate(totalItems, currentPage))
  }, [currentPage, totalItems])

  return {
    pagination,
    currentPage,
    totalItems,
    setCurrentPage,
    setTotalItems
  }
}

export default usePaginator
