import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Exercise from "@/models/Exercise";

export async function GET() {
  await dbConnect();

  try {}