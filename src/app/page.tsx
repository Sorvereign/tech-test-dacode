"use client";

import { useCallback } from "react";
import { Button } from "../components/shared/Button";
import { Checkbox } from "../components/shared/Checkbox";
import { InputField } from "../components/shared/InputField";
import { useForm } from "react-hook-form";
import axiosInstance from "../lib/axiosConfig";
import { GuestSession } from "../resTypes/guestSession";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type LoginValues = {
  email: string;
  password: string;
  tyc: boolean;
};

export default function Home() {
  const router = useRouter()
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
      tyc: false,
    },
  });

  const onSubmit = useCallback(async () => {
    try {
      const response = await axiosInstance.get<GuestSession>(
        "/authentication/guest_session/new"
      );

      localStorage.setItem("test", JSON.stringify(response.data));

      router.push("/movieList")
    } catch (error) {
      toast.error(`Tuvimos un error al iniciar sesión: ${error}`);
    }
  }, [isDirty, isValid]);

  return (
    <main>
      <div>
        <h1 className="text-3xl font-bold">Login</h1>
        <h3>¡Bienvenido!</h3>
      </div>

      <form
        className="flex flex-col gap-3 pt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          {...register("email", {
            required: "Este campo es requerido",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "El correo electrónico no es válido",
            },
          })}
          errors={errors.email}
          label="Correo electrónico de DaCodes"
        />
        <InputField
          {...register("password", {
            required: "Este campo es requerido",
            minLength: {
              value: 7,
              message: "La contraseña tiene que tener como minimo 7 caracteres",
            },
          })}
          type="password"
          errors={errors.password}
          label="Contraseña"
        />
        <div className="flex flex-row gap-2 ml-3 pt-3">
          <div className="flex items-center gap-2">
            <Checkbox
              {...register("tyc", {
                required: "Tienes que aceptar nuestros tyc",
              })}
            />
            <span className="italic text-[12px]">
              He leído y acepto los terminos y condiciones
            </span>
          </div>
          {errors.tyc && <p className="text-red-600">{errors.tyc.message}</p>}
        </div>
        <div className="pt-4">
          <Button type="submit" disabled={!isValid}>
            Crear cuenta
          </Button>
        </div>
      </form>
    </main>
  );
}
