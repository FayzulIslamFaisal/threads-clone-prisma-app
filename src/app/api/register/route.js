import { registerSchema } from "@/app/validation/register";
import vine, { errors } from "@vinejs/vine";
import { NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt";
import { prisma } from "@/app/utils/db";
export const POST = async (req) => {
  try {
    const data = await req.json();
    const validator = vine.compile(registerSchema);
    const payload = await validator.validate(data);

    const isEmailExist = await prisma.User.findUnique({
      where: { email: payload.email },
    });
    if (isEmailExist) {
      return NextResponse.json({
        status: 400,
        message: "Email already exists",
      });
    }
    const isUsernameExist = await prisma.User.findUnique({
      where: { username: payload.username },
    });
    if (isUsernameExist) {
      return NextResponse.json({
        status: 400,
        message: "Username already exists",
      });
    }

    const salt = genSaltSync(10);
    payload.password = hashSync(payload.password, salt);

    const user = await prisma.User.create({
      data: {
        name: payload.name,
        username: payload.username,
        email: payload.email,
        password: payload.password,
      },
    });
    return NextResponse.json(
      { status: 201 },
      { message: "User created successfully", user }
    );
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
