import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/thq-react-components'
import PropTypes from 'prop-types'

import booksPageInitialPaths54d0bResource from '../../../resources/books-page-initial-paths-54d0b'
import booksPageInitialProps59fdfResource from '../../../resources/books-page-initial-props-59fdf'

const Books1 = (props) => {
  return (
    <>
      <div className="books1-container">
        <Head>
          <title>Books - Chief Factors Coordinator</title>
          <meta
            property="og:title"
            content="Books - Chief Factors Coordinator"
          />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(BooksEntities) => (
                  <>
                    <div className="books1-container1">
                      <h1>{BooksEntities?.title}</h1>
                      <span>{BooksEntities?.title}</span>
                      <span>{BooksEntities?.price}</span>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.booksEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .books1-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .books1-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Books1.defaultProps = {
  booksEntities: [],
}

Books1.propTypes = {
  booksEntities: PropTypes.array,
}

export default Books1

export async function getStaticPaths() {
  const response = await booksPageInitialPaths54d0bResource({})
  const totalCount = response?.meta?.pagination?.total
  const pagesCount = Math.ceil(totalCount / 10)
  return {
    paths: Array.from(
      {
        length: pagesCount,
      },
      (_, i) => ({
        params: {
          page: (i + 1).toString(),
        },
      })
    ),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const response = await booksPageInitialProps59fdfResource({
    ...context?.params,
    start: (context.params.page - 1) * 10,
  })
  return {
    props: {
      booksEntities: response?.data,
      ...response?.meta,
    },
    revalidate: 60,
  }
}
