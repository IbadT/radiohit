import {
  getAllEvents,
  getNextEventByCursor,
  getPreviousEventByCursor,
  getSingleEventByID,
} from "@/lib/appwrite/db_services/news.db.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import EventsDetailsPage from "@/components/Pages/EventsDetailsPage/EventsDetailsPage";

export const revalidate = 200;

type Props = {
  params: Promise<{
    id: string;
  }>;
};

//Generate static pages
export async function generateStaticParams() {
  const allEvents = await getAllEvents();
  return allEvents.documents.map((post) => ({
    id: post.$id,
  }));
}

//Generate Metadata
export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const singleEvent = await getSingleEventByID(params.id);

  //Check if data exists
  if (!singleEvent) return notFound();

  const newsMeta = `${singleEvent.title}`;

  return {
    title: newsMeta,
  };
};

const SingleEventPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const singleEvent = await getSingleEventByID(id);
  let nextPost = await getNextEventByCursor(id);
  let prevPost = await getPreviousEventByCursor(id);

  //Check if next post is exist
  if (!nextPost) {
    nextPost = null;
  }
  //Check if previous post is exist
  if (!prevPost) {
    prevPost = null;
  }

  //Check if data exists
  if (!singleEvent) return notFound();

  return (
    <EventsDetailsPage
      singleEvent={singleEvent}
      nextPost={nextPost}
      prevPost={prevPost}
    />
  );
};
export default SingleEventPage;
