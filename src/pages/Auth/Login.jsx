import { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirection
import TextInput from "../../components/UI/TextInput";
import TitleText from "../../components/UI/TitleText";
import CheckboxLabel from "../../components/UI/CheckBoxLabel";
import FormWrapper from "../../components/UI/FormWrapper";
import AppButton from "../../components/UI/AppButton";
import axiosInstance from "../../api/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ useNavigate hook

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard using navigate
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <FormWrapper
        onSubmit={handleLogin}
        className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border"
      >
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
          <div className="flex items-center gap-8 my-8 ml-10">
            <img
              className="h-20 w-20 object-cover object-center rounded-full"
              src="https://picsum.photos/100"
              alt="Sample"
            />

            <div>
              <TitleText
                variant="h3"
                color="blue-gray"
                className="block font-sans text-4xl antialiased font-semibold leading-tight tracking-normal text-blue-gray-900"
              >
                Student Service
              </TitleText>
              <TitleText
                variant="small"
                color="blue-gray"
                className="block font-sans antialiased leading-tight tracking-normal text-blue-gray-900"
              >
                Management Module
              </TitleText>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="relative h-11 w-full min-w-[200px]">
              <TextInput
                data-testid="email-input"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email} // controlled input
                onChange={handleEmailChange}
              />
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <TextInput
                data-testid="password-input"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password} // controlled input
                onChange={handlePasswordChange}
              />
            </div>
            <div className="-ml-2.5">
              <div className="inline-flex items-center">
                <CheckboxLabel
                  label="Remember Me"
                  color="blue"
                  defaultChecked={false}
                  onChange={(e) => console.log("Checked:", e.target.checked)}
                />
              </div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <AppButton
              className="bg-blue-800 hover:bg-blue-900 text-white"
              type="submit"
            >
              Sign In
            </AppButton>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
};

export default Login;
