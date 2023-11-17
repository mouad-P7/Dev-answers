import LocalSearch from "@/components/shared/LocalSearch";
import Filter from "@/components/shared/Filter";
import UserCard from "@/components/cards/UserCard";
import { CommunityPageFilters } from "@/constants/filters";
import { getAllUsers } from "@/server/actions/user.action";
import Pagination from "@/components/shared/Pagination";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Community({ searchParams }: SearchParamsProps) {
  const { users, isNext } = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });

  return (
    <div className="text-dark100_light900 flex-start w-full flex-col gap-4">
      <p className="h3-bold sm:h2-bold w-full text-start">All Users</p>
      <div className="flex w-full items-center justify-between gap-5 max-xs:flex-col max-xs:items-end max-xs:gap-2">
        <LocalSearch route="/community" otherClasses="w-full">
          Search by username...
        </LocalSearch>
        <Filter
          filters={CommunityPageFilters}
          defaultValue="new_users"
          otherClasses="w-36 sm:w-40"
        />
      </div>
      {/* <CommunityFilter /> */}
      <div className="flex-center w-full flex-wrap gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard
              key={user._id}
              id={user._id}
              clerkId={user.clerkId}
              picture={user.picture}
              name={user.name}
              userName={user.userName}
            />
          ))
        ) : (
          <p className="h3-bold">User not found.</p>
        )}
      </div>
      <Pagination
        pageNumber={searchParams?.page ? Number(searchParams.page) : 1}
        isNext={isNext}
      />
    </div>
  );
}
