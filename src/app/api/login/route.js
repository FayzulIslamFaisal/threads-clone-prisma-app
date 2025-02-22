import { loginSchema } from "@/app/validation/register";
import vine, { errors } from "@vinejs/vine";
import { NextResponse } from "next/server";
import { compareSync } from "bcrypt";
import { prisma } from "@/app/utils/db";
export const POST = async (req) => {
  try {
    const data = await req.json();
    console.log("Received data:", data);

    const validator = vine.compile(loginSchema);
    const payload = await validator.validate(data);

    // Find user by email
    const findUser = await prisma.User.findUnique({
      where: { email: payload.email },
    });

    console.log("User found:", findUser);

    if (!findUser) {
      return NextResponse.json(
        { errors: { email: "Email does not match. Please try again" } },
        { status: 400 }
      );
    }

    // Check password match
    const isPasswordMatch = compareSync(payload.password, findUser.password);
    console.log("Password match:", isPasswordMatch); // Debugging

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ errors: error.messages }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
