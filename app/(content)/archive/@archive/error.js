"use client";

// 오류는 서버가 작동중일때 말고도 클라이언트 사이드에서도 발생할 수 있기 떄문에 클라이언트 컴포넌트로 사용
export default function FilterError({error}) {
  return (
    <div id="error">
      <h2>An error occurred!</h2>
      <p>{error.message}</p>
    </div>
  );
}
