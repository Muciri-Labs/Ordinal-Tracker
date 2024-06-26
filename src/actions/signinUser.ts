"use server";

import { TSignInSchema } from "@/lib/types";
import "@/envConfig";

export const signinUser = async (data: TSignInSchema) => {
  // console.log(data);

  const url = process.env.BACKEND_BASE_URL;
  // console.log(url);

  try {
    let response = await fetch(`${url}/auth/signin`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    console.log("result: ", result);
    console.log("response: ", response.status);

    if (response.ok) {
      const jwt = result.jwt;
      // console.log("jwt has arrived: ", jwt);

      return {
        success: true,
        jwt,
      };
    } else {
      const error = result.error;
      return {
        success: false,
        error,
      };
    }
  } catch (error) {
    console.error("Error occurred:", error);

    return {
      success: false,
    };
  }
};
