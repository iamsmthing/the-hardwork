"use client";
import { register, signin } from "@/lib/api";
import { Spinner } from "@nextui-org/react";
import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "./Card";
import Button from "./Button";
import Input from "./Input";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
  actionText: "Creating your account...",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
  actionText: "Logging in...",
};

const initial = { email: "", password: "", firstName: "", lastName: "" };

export default function AuthForm(
  this: any,
  { mode }: { mode: "register" | "signin" }
) {
  const [formState, setFormState] = useState({ ...initial });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    const loginData = {
      email,
      password,
    };
    const registerData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      if (mode === "register") {
        await register(registerData);
        // router.replace("/signin");
      } else {
        await signin(loginData);

        // router.replace("/home");
      }
      router.replace("/home");

      // console.log(email, password);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const content = mode === "register" ? registerContent : signinContent;

  const Loader = ({ action }) => {
    return (
      <div className="w-full h-full  flex flex-col justify-center items-center ">
        <Spinner
          className="justify-center items-center "
          label={action}
          color="primary"
          labelColor="primary"
        />
      </div>
    );
  };

  return (
    <Card className={undefined}>
      {isLoading ? <Loader action={content.actionText} /> : <div></div>}

      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>

        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  required
                  name="firstName"
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e: { target: { value: any } }) =>
                    setFormState((s) => ({ ...s, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  placeholder="Last Name"
                  name="lastName"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e: { target: { value: any } }) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              name="email"
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e: { target: { value: any } }) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              name="password"
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e: { target: { value: any } }) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button intent="secondary">{content.buttonText}</Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
