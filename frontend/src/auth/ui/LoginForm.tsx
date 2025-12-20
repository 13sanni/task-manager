import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../auth.mutations.ts";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded border space-y-4 w-full max-w-md"
    >
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="border w-full px-3 py-2 rounded"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">
            Invalid email
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border w-full px-3 py-2 rounded"
        />
        {errors.password && (
          <p className="text-red-600 text-sm">
            Password must be at least 6 characters
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={login.isPending}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {login.isPending ? "Logging in..." : "Login"}
      </button>

      {login.isError && (
        <p className="text-red-600 text-sm text-center">
          Login failed
        </p>
      )}
    </form>
  );
}
