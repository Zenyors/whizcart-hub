
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="rounded-full bg-primary p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-white"
            >
              <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
              <path d="M8 2v20" />
              <path d="M16 2v20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">WhizCart</h1>
          <p className="text-sm text-muted-foreground">
            Admin Panel Login
          </p>
        </div>
        <div className="card-shadow rounded-xl border bg-card p-6">
          <LoginForm />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} WhizCart. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
