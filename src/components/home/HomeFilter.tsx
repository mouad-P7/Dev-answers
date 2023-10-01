import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";

export default function HomeFilter() {
  const active = "frequent";

  return (
    <div className="mt-10 hidden flex-wrap gap-3 lg:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          // onClick={() => {}}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500"
          }`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}
