import { Suspense } from "react";
import ContributePage from "../../contribute-page";

async function ProblemEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ContributePage key={id} problemId={id} />;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProblemEditor params={params} />
    </Suspense>
  );
}
