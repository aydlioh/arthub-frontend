import BrushesSkeleton from "../../../components/UI/skeletons/brushes-skeleton";
import BrushesNotFound from "../../../components/UI/not-found/brushes-notfound";
import BrushesFetchError from "../../../components/UI/error/brushes-error";
import getCookieData from "@/utils/get-cookie";
import { useGetBrushesQuery } from "@/store/features/brushes/brushesApi";
import BrushList from "./brush-list";

const Brushes = ({
  search,
  select,
  currentPage,
  setCurrentPage,
}: {
  search: string;
  select: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  const { data, isLoading, isError, error } = useGetBrushesQuery({
    search,
    program: select,
    page: currentPage,
    size: 8,
    like: getCookieData("auth-data").token ? true : false,
  });

  const totalCountHeader = data?.totalCount;
  const totalPages = totalCountHeader ? Math.ceil(totalCountHeader / 8) : 1;

  if (isLoading) return <BrushesSkeleton />;

  if (isError) {
    if ("status" in error && error.status === 404) {
      return <BrushesNotFound />;
    }
    return <BrushesFetchError />;
  }

  if (!data || !data?.response.length) return <BrushesNotFound />;

  return (
    <BrushList
      data={data?.response}
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default Brushes;