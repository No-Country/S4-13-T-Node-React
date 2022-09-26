import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const Home: NextPage = () => {
	const [pepe, setpepe] = useState<String>('semi')

	return (
		<div>
			<Head>
				<title>Memex</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
		</div>
	)
}

export default Home
