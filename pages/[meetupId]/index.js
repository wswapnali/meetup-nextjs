import Head from "next/head";

import { MongoClient, ObjectId } from "mongodb";

import MeetupDetailPage from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";

function MeetupDetailsPage (props) {
    return <Fragment>
        <Head>
            <title>
                Meetup: {props.meetupData.data.title} 
            </title>
            <meta name="description" content={props.meetupData.data.description} />
        </Head>
        <MeetupDetailPage 
            id ={props.meetupData.id}
            title = {props.meetupData.data.title}
            image = {props.meetupData.data.image}
            address = {props.meetupData.data.address}
            description = {props.meetupData.data.description}
            />
    </Fragment>
}


export async function getStaticPaths () {
    const client = await MongoClient.connect('mongodb+srv://Swapnali:Swapnalimongodb43@cluster0.lojthpf.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
    client.close();
    return {
        fallback: 'blocking', 
        paths: meetups.map((meetup) => ({
            params: {meetupId: meetup._id.toString()}
        }))
    }
}


export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    
    const client = await MongoClient.connect('mongodb+srv://Swapnali:Swapnalimongodb43@cluster0.lojthpf.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const selectedMeetup = await meetupCollection.findOne({
        _id: new ObjectId(meetupId)
    });
    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                data: selectedMeetup.data
            }
        }
    }
}

export default MeetupDetailsPage;