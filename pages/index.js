import Head from 'next/head'
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from 'react';

function HomePage (props) {
  return <Fragment>
    <Head>
      <title>React meetups</title>
      <meta name="description" content="Browse meetup dummy data here" />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>
}


// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//    return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }

// }

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://Swapnali:Swapnalimongodb43@cluster0.lojthpf.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const meetups = await meetupCollection.find().toArray();
  await client.close()
 
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        description: meetup.data.description,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1
  }

}

export default HomePage;