import { registerSchema } from "@/app/validation/register";
import vine, { errors } from "@vinejs/vine";
import { NextResponse, NextRequest } from "next/server";
import { genSaltSync, hashSync } from "bcrypt";
import { prisma } from "@/app/utils/db";
export const POST = async (req, res) => {
  try {
    const data = await req.json();
    const validator = vine.compile(registerSchema);
    const payload = await validator.validate(data);

    const isEmailExist = await prisma.User.findUnique({
      where: { email: payload.email },
    });
    if (isEmailExist) {
      return NextResponse.json(
        { errors: { email: "Email already exists" } },
        { status: 400 }
      );
    }
    const isUsernameExist = await prisma.User.findUnique({
      where: { username: payload.username },
    });
    if (isUsernameExist) {
      return NextResponse.json(
        { errors: { username: "Username already exists" } },
        { status: 400 }
      );
    }

    const salt = genSaltSync(10);
    payload.password = hashSync(payload.password, salt);

    const user = await prisma.User.create({
      data: {
        payload,
      },
    });
    return NextResponse.json(
      { user, message: "User created successfully" },
      { status: 201 }
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
