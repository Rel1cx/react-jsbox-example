import React, { useEffect, useMemo } from 'react'
import { useLatest } from 'react-jsbox'
import { useSWRInfinite } from 'swr'

const fetcher = async url => $http.get(url).then(res => res.data)

export default function InfiniteLoadingExample(props) {
  const { data, error, mutate, size, setSize } = useSWRInfinite(
    index => `https://api.github.com/repos/facebook/react/issues?per_page=50&page=${index + 1}`,
    fetcher
  )

  const issues = useMemo(() => (data ? [].concat(...data) : []), [data])
  const isLoadingInitialData = !data && !error
  const isLoadingMore = isLoadingInitialData || (data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 50)

  const latests = useLatest({ isReachingEnd })

  useEffect(() => {
    $ui.toast(`showing ${size} page(s) of ${isLoadingMore ? '...' : issues.length} issue(s)`)
  }, [size, isLoadingMore, issues])

  return (
    <list
      data={issues.map(item => item.title)}
      events={{
        didReachBottom(sender) {
          if (latests.current.isReachingEnd) {
            return $ui.toast('已无更多数据')
          }
          sender.endFetchingMore()
          setSize(x => x + 1)
          $ui.toast('fetching...')
        },
        async pulled(sender) {
          sender.beginRefreshing()
          await mutate()
          sender.endRefreshing()
        }
      }}
      {...props}
    />
  )
}
