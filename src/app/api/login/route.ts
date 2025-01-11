import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connect from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connect();
    const { email, password } = await request.json();
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return NextResponse.json(
        { message: "user not registered" },
        { status: 401 }
      );
    }
    const checkPwd = await bcrypt.compare(password, userExists.password);
    if (!checkPwd) {
      return NextResponse.json(
        {
          message: "Wrong password",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: userExists._id,
        email: userExists.email,
      },
      process.env.jwtSecret as string,
      { expiresIn: "1d" }
    );

    const finalData = {
      token,
      user: {
        email: userExists.email,
        name: userExists.name,
        _id: userExists._id,
      },
    };
    return NextResponse.json({
      success: true,
      message: "success",
      status: 200,
      finalData,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "POST error", status: 400 });
  }
}
