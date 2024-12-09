import { AuthContext } from "@/context/auth";
import { FormEvent, useCallback, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuLoader } from "react-icons/lu";

import LoginGraphic from "@/assets/login-graphic.png";
import { toast } from "sonner";
import { RBAC_ROLES } from "@/types/user";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const { logIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (loading) {
        return toast.error("Please wait for a while");
      }
      setLoading(true);
      const form = formRef.current;
      if (!form) return;
      const formData = new FormData(e.target as HTMLFormElement);
      const formValues = Object.fromEntries(
        formData.entries()
      ) as LoginFormValues;

      await logIn({
        email: formValues.email,
        password: formValues.password,
        role: formValues.email.includes("admin")
          ? RBAC_ROLES.ADMIN
          : RBAC_ROLES.USER,
      });
      setLoading(false);
      toast.success("You are successfully loggged in");

      navigate("/dashboard");
    },
    [loading, logIn, navigate]
  );

  const Login = useCallback(
    async (values: LoginFormValues) => {
      setLoading(true);
      await logIn({
        ...values,
        role: values.email.includes("admin")
          ? RBAC_ROLES.ADMIN
          : RBAC_ROLES.USER,
      });
      setLoading(false);
      toast.success("You are successfully logged in");
      navigate("/dashboard");
    },
    [logIn, navigate]
  );

  return (
    <section className="h-full flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img src={LoginGraphic} alt="Sample image" />
      </div>
      <form onSubmit={handleLogin} ref={formRef} className="md:w-1/3 max-w-sm">
        <div className="md:text-left my-4">
          <p className="text-center text-xl font-bold">Sign in</p>
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="email"
          placeholder="Email Address"
          name="email"
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
          name="password"
        />
        <div className="flex flex-wrap items-center justify-center space-x-4 mt-4">
          <button
            className="h-10 w-32 flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="button"
            onClick={() =>
              Login({ email: "admin@admin.com", password: "admin" })
            }
          >
            Login as Admin
          </button>
          <button
            className="h-10 w-32 flex items-center justify-center bg-green-600 hover:bg-green-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="button"
            onClick={() => Login({ email: "user@user.com", password: "user" })}
          >
            Login as User
          </button>
        </div>
        <div className="flex items-center justify-center text-center md:text-left">
          <button
            className="mt-4 h-8 w-20 flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            {loading ? <LuLoader className="animate-spin w-5 h-5" /> : "Login"}
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account?{" "}
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            to="/register"
          >
            Register
          </Link>
        </div>
      </form>
    </section>
  );
}
