import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import { getAvailableNewsYears } from "@/lib/news";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function FilteredHeader({ year, month }) {
  const availableYear = await getAvailableNewsYears();
  let links = await getAvailableNewsYears(); // 가능한 연도
  // 연도만 선택되었을 경우 연도별 뉴스만 보여줌, 상단 링크는 월을 보여줌
  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = [];
  }

  // 선택된 연도가 존재하지만 뉴스가 존재하지 않는 연도일 때
  if (
    year &&
    !availableYear.includes(
      year || (month && !getAvailableNewsMonths(year).includes(month))
    )
  ) {
    throw new Error("Invalid Filter.");
  }
  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            {
              /* 연도가 선택되었다면 월을 보여줌 */
            }
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

// loading.js만으로는 데이터 로딩을 감지할 수 없는 경우
async function FilteredNews({ year, month }) {
  let news;
  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }
  let newsContent = <p>No news found for the selected period.</p>;
  // 뉴스가 존재하면 뉴스를 보여줌
  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
}

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter; // ex) ['2024','1']

  const selectedYear = filter?.[0]; // = filter ? filter[0] : undefined
  const selectedMonth = filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading filter...</p>}>
        <FilteredHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
