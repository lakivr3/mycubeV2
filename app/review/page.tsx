"use client";
import { Box, Callout, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/Review/ErrorMessage";
// import SimpleMDE from "react-simplemde-editor";
import Spinner from "../components/Review/Spinner";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { reviewSchema } from "../validationSchema";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Review } from "@prisma/client";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type ReviewFormData = z.infer<typeof reviewSchema>;
const grade = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const ReviewPage = () => {
  const { status, data: session } = useSession();
  const [error, setError] = useState("");
  const [errorGrade, setGradeError] = useState("");
  const [errorDesc, setDescError] = useState("");
  const [form, setForm] = useState({
    description: "",
    grade: "",
    image: "",
    user: "",
    id: 1,
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<ReviewFormData>({
  //   resolver: zodResolver(reviewSchema),
  // });
  useEffect(() => {
    if (form.grade === "grade") setGradeError("Chose a grade");
    else setGradeError("");
  }, [form]);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (form.description.length <= 2) return;
    if (form.grade === "grade") return;
    try {
      setSubmitting(true);
      await axios.post(
        "/api/review",
        // description:
        { ...form, image: session?.user?.image, user: session?.user?.name }
      );
      router.push("/");
      router.refresh();
      setError("");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  };

  // console.log(register("grade"));
  return (
    <Flex direction="column" ml="8" mb="6">
      <Box my="6">
        <Text size="7" color="red">
          Write a review
        </Text>
      </Box>
      <div className="max-w-xl">
        {error && (
          <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
      </div>

      <form className=" space-y-3 max-w-[40%] ">
        <SimpleMDE
          placeholder="Desription"
          onChange={(e) => setForm({ ...form, description: e })}
        />

        <ErrorMessage>{errorDesc}</ErrorMessage>
        <Flex direction="column">
          <Select.Root
            defaultValue="grade"
            onValueChange={(e) => setForm({ ...form, grade: e })}
          >
            <Select.Trigger className="w-20 " />
            <Select.Content className="w-20">
              <Select.Group>
                <Select.Item value="grade">Grade</Select.Item>
                {grade.map((gr) => (
                  <Select.Item key={gr} value={gr}>
                    {gr}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <ErrorMessage>{errorGrade}</ErrorMessage>

          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-lg w-[200px]  rubiksimage-div-btn mt-10 "
          >
            Submit New Issue {isSubmitting && <Spinner />}
          </button>
        </Flex>
      </form>
    </Flex>
  );
};

export default ReviewPage;
