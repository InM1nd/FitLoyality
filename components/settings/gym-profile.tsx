"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GYM } from "@/lib/mock-data";

interface ProfileForm {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export function GymProfile() {
  const { register, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      name: GYM.name,
      address: GYM.address,
      email: GYM.email,
      phone: GYM.phone,
    },
  });

  const onSubmit = () =>
    toast.success("Profile saved", { description: "Your gym details have been updated." });

  return (
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle className="text-base">Gym Profile</CardTitle>
        <CardDescription>Your studio&apos;s public details.</CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="g-name">Gym name</Label>
              <Input id="g-name" {...register("name")} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="g-phone">Phone</Label>
              <Input id="g-phone" {...register("phone")} />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="g-address">Address</Label>
              <Input id="g-address" {...register("address")} />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="g-email">Email</Label>
              <Input id="g-email" type="email" {...register("email")} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
