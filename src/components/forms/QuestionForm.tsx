"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { questionSchema } from "@/lib/schema";
import {
  postQuestion,
  editQuestionById,
} from "@/server/actions/question.action";
import { useToast } from "@/components/ui/use-toast";
import { capitalize } from "@/lib/format";

interface QuestionFormProps {
  type: "post" | "edit";
  mongoUserId: string;
  question?: string;
}

export default function QuestionForm({
  type,
  mongoUserId,
  question,
}: QuestionFormProps) {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mode } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  // 1. Define your form.
  const parsedQuestion = question && JSON.parse(question || "");
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: parsedQuestion?.title || "",
      explanation: parsedQuestion?.explanation || "",
      tags: parsedQuestion?.tags.map((tag: any) => tag.name) || [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof questionSchema>) {
    setIsSubmitting(true);
    try {
      if (type === "post") {
        await postQuestion({
          title: values.title,
          explanation: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          path: pathname,
        });
        toast({
          title: "Question Posted",
          description: `Your question has been successfully posted`,
        });
        router.push("/");
      } else if (type === "edit") {
        await editQuestionById({
          questionId: parsedQuestion._id,
          title: values.title,
          explanation: values.explanation,
          path: pathname,
        });
        toast({
          title: "Question Edited",
          description: `Your question has been successfully edited`,
        });
        router.push(`/question/${parsedQuestion._id}`);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Question not ${capitalize(type)}ed`,
        description: `Your question has not been ${type}ed.\n Try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleInputKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }
        if (field.value.length === 3) {
          return form.setError("tags", {
            type: "required",
            message: "No more that 3 tags.",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  }

  function handleTagRemove(tag: string, field: any) {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem?{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="mt-3.5 min-h-[508px]">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue={parsedQuestion?.explanation || ""}
                    onInit={(evt, editor) =>
                      // @ts-ignore
                      (editorRef.current = editor)
                    }
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 50 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    disabled={type === "edit"}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                          onClick={() =>
                            type !== "edit"
                              ? handleTagRemove(tag, field)
                              : () => {}
                          }
                        >
                          {tag}
                          {type !== "edit" && (
                            <Image
                              src="/assets/icons/close.svg"
                              alt="Close icon"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>{type === "post" ? "Posting..." : "Editing..."}</>
            ) : (
              <>{type === "post" ? "Ask a Question" : "Edit Question"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
