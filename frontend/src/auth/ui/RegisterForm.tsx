import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../auth.mutations.ts";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const registerUser = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded border space-y-4 w-full max-w-md"
    >
      <h1 className="text-2xl font-bold text-center">Register</h1>

      <input
        {...register("name")}
        placeholder="Name"
        className="border w-full px-3 py-2 rounded"
      />

      <input
        {...register("email")}
        placeholder="Email"
        className="border w-full px-3 py-2 rounded"
      />

      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="border w-full px-3 py-2 rounded"
      />

      <button
        type="submit"
        disabled={registerUser.isPending}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        {registerUser.isPending
          ? "Registering..."
          : "Register"}
      </button>

      {registerUser.isError && (
        <p className="text-red-600 text-sm text-center">
          Registration failed
        </p>
      )}
    </form>
  );
}
