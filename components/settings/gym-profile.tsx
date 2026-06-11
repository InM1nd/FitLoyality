"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GYM } from "@/lib/data";

const profileSchema = z.object({
  name: z.string().min(2, "Gym name is required"),
  address: z.string().min(5, "Address is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(6, "Phone number is too short")
    .regex(/^[+\d][\d\s/-]+$/, "Enter a valid phone number"),
});

type ProfileForm = z.infer<typeof profileSchema>;

export function GymProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
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
              <Input id="g-name" aria-invalid={!!errors.name} {...register("name")} />
              {errors.name && <p className="text-[11px] text-error">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="g-phone">Phone</Label>
              <Input id="g-phone" aria-invalid={!!errors.phone} {...register("phone")} />
              {errors.phone && <p className="text-[11px] text-error">{errors.phone.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="g-address">Address</Label>
              <Input id="g-address" aria-invalid={!!errors.address} {...register("address")} />
              {errors.address && (
                <p className="text-[11px] text-error">{errors.address.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="g-email">Email</Label>
              <Input id="g-email" type="email" aria-invalid={!!errors.email} {...register("email")} />
              {errors.email && <p className="text-[11px] text-error">{errors.email.message}</p>}
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
