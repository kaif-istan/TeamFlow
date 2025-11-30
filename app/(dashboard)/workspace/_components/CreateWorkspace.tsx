"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { workspaceSchema, workspaceSchemaType } from "@/app/schema/workspaceSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { toast } from "sonner";
import { create } from "domain";
import { isDefinedError } from "@orpc/client";
const CreateWorkspace = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient()

  // 2. Define form
  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const createWorkspaceMutation = useMutation(orpc.workspace.create.mutationOptions({
    onSuccess: (newWorkspace) => {
      toast.success(`Workspace ${newWorkspace.workspaceName} created successfully`);

      queryClient.invalidateQueries({
        queryKey: orpc.workspace.list.queryKey()
      })

      form.reset()

      setOpen(false)
    },
    onError: (error) => {
      if (isDefinedError(error)) {
        if (error.code === "RATE_LIMITED") {
          toast.error('Rate limit exceeded. Try again after 60s.')
          return
        }
        toast.error(error.message)
        return
      }
      toast.error('Failed to create workspace, try again!')
    }
  }))

  // 3. Define a submit handler.
  const onSubmit = (values: workspaceSchemaType) => {
    // Do something with the form values.
    // This will be type-safe and validated
    createWorkspaceMutation.mutate(values)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-12 rounded-xl border-2 border-dashed border-muted-foreground/50 text-muted-foreground hover:border-muted-foreground hover:text-foreground hover:rounded-lg transition-all duration-200"
            >
              <Plus className="size-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="text-sm font-semibold">Create workspace</p>
        </TooltipContent>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>
              Create a new workspace to get started.
            </DialogDescription>
          </DialogHeader>
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My workspace" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={createWorkspaceMutation.isPending} type="submit" className="w-full">
                {createWorkspaceMutation.isPending ? 'Creating...' : 'Create Workspace'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Tooltip>
    </Dialog>
  );
};

export default CreateWorkspace;
