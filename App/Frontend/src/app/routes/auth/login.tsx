import { useNavigate, useSearchParams } from "react-router";

import { AuthLayout } from "@/components/layouts/authLayout";
import { paths } from "@/config/paths";
import { LoginForm } from "@/features/auth/components/loginForm";

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <AuthLayout title="SIGN IN">
      <LoginForm
        onSuccess={() => {
          navigate(
            redirectTo ? redirectTo : paths.app.dashboard.root.getHref(),
            { replace: true },
          );
        }}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
