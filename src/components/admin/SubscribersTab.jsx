import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { format } from "date-fns";
const SubscribersTab = () => {
    const { data: subscribers, isLoading } = useQuery({
        queryKey: ["admin-subscribers"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("newsletters")
                .select("*")
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return data;
        },
    });
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Newsletter Subscribers</h2>
        <span className="text-sm text-muted-foreground">
          {subscribers?.length || 0} subscribers
        </span>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email Address</TableHead>
              <TableHead>Subscribed At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (<TableRow>
                <TableCell colSpan={2} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>) : subscribers?.length === 0 ? (<TableRow>
                <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                  No newsletter subscribers yet.
                </TableCell>
              </TableRow>) : (subscribers?.map((subscriber) => (<TableRow key={subscriber.id}>
                  <TableCell>
                    <a href={`mailto:${subscriber.email}`} className="text-primary hover:underline font-medium">
                      {subscriber.email}
                    </a>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(subscriber.created_at), "MMM d, yyyy h:mm a")}
                  </TableCell>
                </TableRow>)))}
          </TableBody>
        </Table>
      </div>
    </div>);
};
export default SubscribersTab;
