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
const ProjectsTab = () => {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image_url: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const { data: projects, isLoading } = useQuery({
        queryKey: ["admin-projects"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
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
        const filePath = `projects/${fileName}`;
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
            const { error } = await supabase.from("projects").insert([
                { ...data, image_url: imageUrl },
            ]);
            if (error)
                throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project created successfully!");
            resetForm();
        },
        onError: () => toast.error("Failed to create project"),
    });
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }) => {
            let imageUrl = data.image_url;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }
            const { error } = await supabase
                .from("projects")
                .update({ ...data, image_url: imageUrl })
                .eq("id", id);
            if (error)
                throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project updated successfully!");
            resetForm();
        },
        onError: () => toast.error("Failed to update project"),
    });
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error)
                throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project deleted successfully!");
        },
        onError: () => toast.error("Failed to delete project"),
    });
    const resetForm = () => {
        setFormData({ name: "", description: "", image_url: "" });
        setImageFile(null);
        setEditingProject(null);
        setIsOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProject) {
            updateMutation.mutate({ id: editingProject.id, data: formData });
        }
        else {
            createMutation.mutate(formData);
        }
    };
    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            name: project.name,
            description: project.description,
            image_url: project.image_url || "",
        });
        setIsOpen(true);
    };
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2"/>
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Project Image</Label>
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
                  {editingProject ? "Update" : "Create"}
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
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (<TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>) : projects?.length === 0 ? (<TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No projects yet. Add your first project!
                </TableCell>
              </TableRow>) : (projects?.map((project) => (<TableRow key={project.id}>
                  <TableCell>
                    {project.image_url ? (<img src={project.image_url} alt={project.name} className="w-16 h-12 object-cover rounded"/>) : (<div className="w-16 h-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>)}
                  </TableCell>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {project.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(project)}>
                        <Edit2 className="w-4 h-4"/>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(project.id)}>
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
export default ProjectsTab;
