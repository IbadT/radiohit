import {
  getAllNews,
  getNextNewsByCursor,
  getPreviousNewsByCursor,
  getSingleNewsByID,
} from '@/lib/appwrite/db_services/news.db.service';
import { notFound } from 'next/navigation';
import NewsDetailsPage from '@/components/Pages/NewsDetailsPage/NewsDetailsPage';

export const revalidate = 200;

export async function generateStaticParams() {
  const allNews = await getAllNews();
  return allNews.documents.map((post) => ({
    id: post.$id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const singleNews = await getSingleNewsByID(params.id);
    if (!singleNews) return notFound();

    return {
      title: singleNews.title,
      description: singleNews.description || '',
    };
  } catch (error) {
    return {
      title: 'News Post',
      description: 'News post details',
    };
  }
}

export default async function SingleNewsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id; // Деструктурируем params.id заранее

  try {
    const [singleNews, nextPost, prevPost] = await Promise.all([
      getSingleNewsByID(id),
      getNextNewsByCursor(id),
      getPreviousNewsByCursor(id),
    ]);

    if (!singleNews) return notFound();

    return (
      <NewsDetailsPage 
        singleNews={singleNews} 
        nextPost={nextPost || null} 
        prevPost={prevPost || null} 
      />
    );
  } catch (error) {
    console.error('Error loading news post:', error);
    return notFound();
  }
}











// import {
//   getAllNews,
//   getNextNewsByCursor,
//   getPreviousNewsByCursor,
//   getSingleNewsByID,
// } from '@/lib/appwrite/db_services/news.db.service';
// import { notFound } from 'next/navigation';
// import NewsDetailsPage from '@/components/Pages/NewsDetailsPage/NewsDetailsPage';

// export const revalidate = 200;

// export async function generateStaticParams() {
//   try {
//     const allNews = await getAllNews();
//     return allNews.documents.map((post) => ({
//       id: post.$id,
//     }));
//   } catch (error) {
//     console.error('Error generating static params:', error);
//     return [];
//   }
// }

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   try {
//     const singleNews = await getSingleNewsByID(params.id);
//     if (!singleNews) return notFound();

//     return {
//       title: singleNews.title,
//       description: singleNews.description || '',
//     };
//   } catch (error) {
//     console.error('Error generating metadata:', error);
//     return {
//       title: 'News Post',
//       description: 'News post details',
//     };
//   }
// }

// export default async function SingleNewsPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   try {
//     const [singleNews, nextPost, prevPost] = await Promise.all([
//       getSingleNewsByID(params.id),
//       getNextNewsByCursor(params.id),
//       getPreviousNewsByCursor(params.id),
//     ]);

//     if (!singleNews) return notFound();

//     return (
//       <NewsDetailsPage 
//         singleNews={singleNews} 
//         nextPost={nextPost || null} 
//         prevPost={prevPost || null} 
//       />
//     );
//   } catch (error) {
//     console.error('Error loading news post:', error);
//     return notFound();
//   }
// }










// import {
//   getAllNews,
//   getNextNewsByCursor,
//   getPreviousNewsByCursor,
//   getSingleNewsByID,
// } from '@/lib/appwrite/db_services/news.db.service';
// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import NewsDetailsPage from '@/components/Pages/NewsDetailsPage/NewsDetailsPage';

// export const revalidate = 200;

// type Props = {
//   params: Promise<{
//     id: string;
//   }>;
// };

// //Generate static pages
// export async function generateStaticParams() {
//   const allNews = await getAllNews();
//   return allNews.documents.map((post) => ({
//     id: post.$id,
//   }));
// }

// //Generate Metadata
// export const generateMetadata = async (props: Props): Promise<Metadata> => {
//   const params = await props.params;
//   const singleNews = await getSingleNewsByID(params.id);

//   //Check if data exists
//   if (!singleNews) return notFound();

//   const newsMeta = `${singleNews.title}`;

//   return {
//     title: newsMeta,
//   };
// };

// const SingleNewsPage = async (props: Props) => {
//   const params = await props.params;

//   const { id } = params;

//   const singleNews = await getSingleNewsByID(id);
//   let nextPost = await getNextNewsByCursor(id);
//   let prevPost = await getPreviousNewsByCursor(id);

//   //Check if next post is exist
//   if (!nextPost) {
//     nextPost = null;
//   }
//   //Check if previous post is exist
//   if (!prevPost) {
//     prevPost = null;
//   }

//   //Check if data exists
//   if (!singleNews) return notFound();

//   return <NewsDetailsPage singleNews={singleNews} nextPost={nextPost} prevPost={prevPost} />;
// };

// export default SingleNewsPage;
