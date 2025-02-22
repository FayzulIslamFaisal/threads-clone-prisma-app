export const UserPostRegister = async (payload) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("User Registration Error:", error.message);
    return { error: "Registration failed. Please try again." };
  }
};
