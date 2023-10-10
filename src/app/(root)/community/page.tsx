import LocalSearch from "@/components/shared/LocalSearch";
import Filter from "@/components/shared/Filter";
import UserCard from "@/components/cards/UserCard";
import { CommunityPageFilters } from "@/constants/filters";
import { getAllUsers } from "@/server/actions/user.action";

export default async function Community() {
  const result = await getAllUsers({});

  return (
    <div className="text-dark100_light900 flex-start w-full flex-col gap-6">
      <p className="h3-bold sm:h2-bold w-full text-start">All Users</p>
      <div className="flex w-full items-center justify-between gap-5">
        <LocalSearch otherClasses="sm:w-full">
          Search by username...
        </LocalSearch>
        <Filter filters={CommunityPageFilters} otherClasses="w-36 sm:w-40" />
      </div>
      {/* <CommunityFilter /> */}
      <div className="flex-center w-full flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => (
            <UserCard
              key={user._id}
              id={user._id}
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
