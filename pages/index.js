import Head from 'next/head'
import { Layout } from '../components/Layout';
const Home = () => (
  <div className="container">
    <Head>
      <title>Magic Matrix</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout/>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)

export default Home
