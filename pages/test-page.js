import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/thq-react-components'

import testPageResource from '../resources/test-page'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Chief Factors Coordinator</title>
          <meta
            property="og:title"
            content="test-page - Chief Factors Coordinator"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_kqdm2e) => (
            <>
              <h1>{context_kqdm2e?.name}</h1>
            </>
          )}
          initialData={props.contextKqdm2eProp}
          persistDataDuringLoading={true}
          key={props?.contextKqdm2eProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  const contextKqdm2eProp = await testPageResource({
    ...context?.params,
  })
  return {
    props: {
      contextKqdm2eProp: contextKqdm2eProp?.data?.[0],
    },
  }
}
