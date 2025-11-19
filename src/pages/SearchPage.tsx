import { MobileLayout } from "@/components/layout/MobileLayout";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchPage = () => {
  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-3xl font-bold mb-6">Search</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Artists, venues, or cities" 
            className="pl-10 h-12 text-base"
          />
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Search for Events</h2>
          <p className="text-muted-foreground max-w-sm">
            Find concerts by artist, venue, city, or genre
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SearchPage;
