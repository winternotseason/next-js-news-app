import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  // 데이터베이스를 소유하고 있음
 const news = await getAllNews();
  return ( 
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}
