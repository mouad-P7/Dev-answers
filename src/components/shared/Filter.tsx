import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterProps {
  filters: { name: string; value: string }[];
  containerClasses?: string;
  otherClasses?: string;
}

export default function Filter({
  filters,
  containerClasses,
  otherClasses,
}: FilterProps) {
  return (
    <div className={containerClasses}>
      <Select>
        <SelectTrigger className={otherClasses}>
          <SelectValue placeholder="Select a Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
