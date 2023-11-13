"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Editor } from "@tinymce/tinymce-react";
import { usePathname } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/context/ThemeProvider";
import { postAnswer } from "@/server/actions/answer.action";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { answerSchema } from "@/lib/schema";
import { useToast } from "@/components/ui/use-toast";

interface AnswerFormProps {
  questionExplanation: string;
  questionId: string;
  authorId: string;
}

export default function AnswerForm({
  questionExplanation,
  questionId,
  authorId,
}: AnswerFormProps) {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const { mode } = useTheme();
  const pathname = usePathname();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof answerSchema>) {
    setIsSubmitting(true);
    try {
      await postAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        questionId: JSON.parse(questionId),
        path: pathname,
      });
      toast({
        title: "Answer Posted",
        description: "Your answer has been successfully posted",
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Answer not Posted",
        description: "Your answer has not been posted.\n Try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      console.log(values);
    }
  }

  async function generateAIAnswer() {
    if (!authorId) return;
    setIsSubmittingAI(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: "POST",
          body: JSON.stringify({ questionExplanation }),
        }
      );
      const AIAnswer = await response.json();
      const formattedAnswer = AIAnswer.reply.replace(/\n/g, "<br />");
      // format ```language to code block
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formattedAnswer);
      }
      toast({
        title: "AI Answer Generated",
        description:
          "The AI has successfully generated an answer based on your query.",
      });
    } catch (error) {
      console.log({ error });
      toast({
        title: "AI Answer Is Not Generated",
        description: "The AI answer has not been generated.\n Try Again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingAI(false);
    }
  }

  return (
    <>
      <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <p className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </p>
        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          disabled={isSubmittingAI}
          onClick={generateAIAnswer}
        >
          {isSubmittingAI ? (
            <>
              <ReloadIcon className="animate-spin text-primary-500" />
              Generating...
            </>
          ) : (
            <>
              <Image
                src="/assets/icons/stars.svg"
                alt="star"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-4 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
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
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
