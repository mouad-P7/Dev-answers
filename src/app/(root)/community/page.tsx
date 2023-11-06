import LocalSearch from "@/components/shared/LocalSearch";
import Filter from "@/components/shared/Filter";
import UserCard from "@/components/cards/UserCard";
import { CommunityPageFilters } from "@/constants/filters";
import { getAllUsers } from "@/server/actions/user.action";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Community({ searchParams }: SearchParamsProps) {
  const users = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <div className="text-dark100_light900 flex-start w-full flex-col gap-6">
      <p className="h3-bold sm:h2-bold w-full text-start">All Users</p>
      <div className="flex w-full items-center justify-between gap-5">
        <LocalSearch route="/community" otherClasses="sm:w-full">
          Search by username...
        </LocalSearch>
        <Filter
          filters={CommunityPageFilters}
          defaultValue="old_users"
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
          <p className="h3-bold">No users yet</p>
        )}
      </div>
    </div>
  );
}
