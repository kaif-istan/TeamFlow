"use client"
import { channelNameSchema, channelNameSchemaType, transformChannelName } from "@/app/schema/channelNameSchema"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput, Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function CreateNewChannel() {
    const [open, setOpen] = useState(false)

    const form = useForm<channelNameSchemaType>({
        resolver: zodResolver(channelNameSchema),
        defaultValues: {
            name: "",
        }
    })

    const watchedName = form.watch("name")
    const transformedName = watchedName ? transformChannelName(watchedName) : ""

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Plus />
                    Create Channel
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Channel</DialogTitle>
                    <DialogDescription>
                        Create a new channel to get started.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-6">
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="My channel" {...field} />
                                    </FormControl>
                                    {transformedName && transformedName !== watchedName && (
                                        <p className="text-sm text-muted-foreground">
                                            Will be created as: <code className="px-1 py-0.5 bg-muted rounded text-xs">{transformedName}</code>
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Create Channel</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}
