"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 import {  useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { settingsSchema } from "@/Schemas";
import { Checkbox } from "@/components/ui/checkbox";
import SettingsUpdate from "@/actions/update-settings";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";


const Page = () => {

   const user = useCurrentUser()
   const [showSuccess, setShowSuccess] = useState<null|undefined |string>('')
   const [showError, setShowError] = useState<null|undefined |string>('')
   const [isPending,startTransition] = useTransition()
   const {update:updateSession} = useSession()
   function onSubmit(values: z.infer<typeof settingsSchema>) {
   
    
    startTransition(()=>{
    updateSession({data:values})
    SettingsUpdate(values).then(res=>{
     setShowError(res?.error)
     setShowSuccess(res?.success)
   })
    })
   
   
  }
  
   const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: '',
      isTwoFactorEnabled:user?.isTwoFactorEnabled,
      
    },
  })
   return (
    <Card className="p-2">
      <CardTitle className=" text-center text-xl mx-2">
        Settings
      </CardTitle>
      <CardContent>
      <Form {...form}>
       <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                disabled={isPending}
                placeholder={user?.name as string} {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="isTwoFactorEnabled"
          render={({ field:fields }) => (
            <FormItem>
              <FormLabel>Two Factor</FormLabel>
              <FormControl>
              <Checkbox 
              disabled={isPending}
              className="ml-3"
                 checked={fields.value}
                  onCheckedChange={fields.onChange}
             
              />
                        
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isPending} type="submit">Save</Button>
      </form>
      {showError && <FormError message={showError}/>}
      {showSuccess && <FormSuccess message={showSuccess}/>}
     </Form>
    </CardContent>
    </Card>
  )
};
export default Page;
