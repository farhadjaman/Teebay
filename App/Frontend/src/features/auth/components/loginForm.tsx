import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas";
import { LOGIN_MUTATION } from "@/graphql/mutations/auth.ts";
import { paths } from "@/config/paths.ts";
import { tokenVar } from "@/cache.ts";

type SignInForm = z.infer<typeof signInSchema>;

type LogInFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LogInFormProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  // Set up the Apollo mutation hook for login.
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const onSubmit = async (data: SignInForm) => {
    try {
      const response = await loginMutation({
        variables: { input: data },
      });
      if (response.data?.login.token) {
        localStorage.setItem("token", response.data.login.token);
        tokenVar(response.data.login.token);
        onSuccess();
      } else {
        console.error("Login failed: No token returned.");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  {...field}
                  className={
                    form.formState.errors.email ? "border-red-500" : ""
                  }
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                    className={
                      form.formState.errors.password
                        ? "border-red-500 pr-10"
                        : "pr-10"
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" variant={"teebay"} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Display GraphQL error (if any) */}
        {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="text-blue-600 hover:underline p-0"
            onClick={() => navigate(paths.auth.register.path)}
          >
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
};
