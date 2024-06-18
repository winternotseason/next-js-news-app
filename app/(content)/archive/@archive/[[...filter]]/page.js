import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import { getAvailableNewsYears } from "@/lib/news";

import Link from "next/link";
import { notFound } from "next/navigation";

export default function FilteredNewsPage({ params }) {
  let links = getAvailableNewsYears(); // 가능한 연도
  const filter = params.filter; // ex) ['2024','1']

  const selectedYear = filter?.[0]; // = filter ? filter[0] : undefined
  const selectedMonth = filter?.[1];

  let news;
  // 연도만 선택되었을 경우 연도별 뉴스만 보여줌, 상단 링크는 월을 보여줌
  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }
  // 연도 미 선택시
  let newsContent = <p>No news found for the selected period.</p>;

  // 뉴스가 존재하면 뉴스를 보여줌
  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  // 선택된 연도가 존재하지만 뉴스가 존재하지 않는 연도일 때
  if (
    selectedYear &&
    !getAvailableNewsYears().includes(
      +selectedYear ||
        (selectedMonth &&
          !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
    )
  ) {
    throw new Error('Invalid Filter.');
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              {
                /* 연도가 선택되었다면 월을 보여줌 */
              }
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;
              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
