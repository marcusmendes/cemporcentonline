import React from 'react'
import Head from 'next/head'

export default function Home () {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">Olá Mundo</h1>
      </main>
      <footer></footer>
    </div>
  )
}
