import React from "react";
import { useForm } from "react-hook-form";
import Title from "../Title/Title";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth";

export default function ChangePassword() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const { changePassword } = useAuth();
  const submit = (passwords) => {
    changePassword(passwords);
  };

  return (
    <div>
      <Title title="Changer Le Mot De Passe" />
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="password"
          label="Mot de passe actuel"
          {...register("currentPassword", {
            required: true,
          })}
          error={errors.currentPassword}
        />

        <Input
          type="password"
          label="Nouveau Mot De Passe"
          {...register("newPassword", {
            required: true,
            minLength: 5,
          })}
          error={errors.newPassword}
        />

        <Input
          type="password"
          label="Confirmer Le Mot De passe"
          {...register("confirmNewPassword", {
            required: true,
            validate: (value) =>
              value != getValues("newPassword")
                ? "Passwords Do No Match"
                : true,
          })}
          error={errors.confirmNewPassword}
        />

        <Button type="submit" text="Changer" />
      </form>
    </div>
  );
}
