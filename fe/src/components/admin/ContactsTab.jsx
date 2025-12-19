import { useQuery } from "@tanstack/react-query";
import { contactsApi } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const ContactsTab = () => {
  const { data: contacts, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: contactsApi.getAll,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Contact Form Submissions</h2>
        <span className="text-sm text-muted-foreground">
          {contacts?.length || 0} submissions
        </span>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Submitted At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : contacts?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No contact form submissions yet.
                </TableCell>
              </TableRow>
            ) : (
              contacts?.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell className="font-medium">
                    {contact.full_name}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-primary hover:underline"
                    >
                      {contact.email}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href={`tel:${contact.mobile}`}
                      className="text-primary hover:underline"
                    >
                      {contact.mobile}
                    </a>
                  </TableCell>
                  <TableCell>{contact.city}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(contact.createdAt), "MMM d, yyyy h:mm a")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContactsTab;