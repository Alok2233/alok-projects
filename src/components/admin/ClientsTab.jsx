import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
const ClientsTab = () => {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        description: "",
        image_url: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const { data: clients, isLoading } = useQuery({
        queryKey: ["admin-clients"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("clients")
                .select("*")
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return data;
        },
    });
    const uploadImage = async (file) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `clients/${fileName}`;
        const { error: uploadError } = await supabase.storage
            .from("images")
            .upload(filePath, file);
        if (uploadError)
            throw uploadError;
        const { data: { publicUrl } } = supabase.storage
            .from("images")
            .getPublicUrl(filePath);
        return publicUrl;
    };
    const createMutation = useMutation({
        mutationFn: async (data) => {
            let imageUrl = data.image_url;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }
            const { error } = await supabase.from("clients").insert([
                { ...data, image_url: imageUrl },
            ]);
            if (error)
                throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-clients"] });
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            toast.success("Client created successfully!");
            resetForm();
        },
        onError: () => toast.error("Failed to create client"),
    });
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }) => {
            let imageUrl = data.image_url;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }
            const { error } = await supabase
                .from("clients")
                .update({ ...data, image_url: imageUrl })
                .eq("id", id);
            if (error)
                throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-clients"] });
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            toast.success("Client updated successfully!");
            resetForm();
        },
        onError: () => toast.error("Failed to update client"),
    });
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase.from("clients").delete().eq("id", id);
            if (error)
                throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-clients"] });
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            toast.success("Client deleted successfully!");
        },
        onError: () => toast.error("Failed to delete client"),
    });
    const resetForm = () => {
        setFormData({ name: "", designation: "", description: "", image_url: "" });
        setImageFile(null);
        setEditingClient(null);
        setIsOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingClient) {
            updateMutation.mutate({ id: editingClient.id, data: formData });
        }
        else {
            createMutation.mutate(formData);
        }
    };
    const handleEdit = (client) => {
        setEditingClient(client);
        setFormData({
            name: client.name,
            designation: client.designation,
            description: client.description,
            image_url: client.image_url || "",
        });
        setIsOpen(true);
    };
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Clients</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2"/>
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingClient ? "Edit Client" : "Add New Client"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input id="designation" placeholder="e.g., CEO, Web Developer" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Testimonial</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Client Photo</Label>
                <Input id="image" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)}/>
                {formData.image_url && !imageFile && (<p className="text-sm text-muted-foreground">
                    Current image will be kept if no new image is selected
                  </p>)}
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingClient ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Testimonial</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (<TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>) : clients?.length === 0 ? (<TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No clients yet. Add your first client!
                </TableCell>
              </TableRow>) : (clients?.map((client) => (<TableRow key={client.id}>
                  <TableCell>
                    {client.image_url ? (<img src={client.image_url} alt={client.name} className="w-12 h-12 object-cover rounded-full"/>) : (<div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground">
                        No img
                      </div>)}
                  </TableCell>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.designation}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {client.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(client)}>
                        <Edit2 className="w-4 h-4"/>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(client.id)}>
                        <Trash2 className="w-4 h-4 text-destructive"/>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)))}
          </TableBody>
        </Table>
      </div>
    </div>);
};
export default ClientsTab;
