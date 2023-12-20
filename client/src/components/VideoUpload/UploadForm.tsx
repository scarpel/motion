import Button from "@components/common/Button";
import MultilineTextInput from "@components/common/TextInput/Multiline";
import { ICommonProps } from "@customTypes/common";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { UploadFormSchema } from "./schemas";
import { TUploadFormValues } from "./types";
import VideoThumbnailImport from "@components/VideoThumbnailImport";
import {
  formatVideoDurationFromSeconds,
  getDurationFromVideoFile,
} from "@src/utils/videos";
import VideoDuration from "@components/VideoItem/components/VideoDuration";
import { TDuration } from "@customTypes/videos";
import TagInput from "@components/common/TagInput";

interface IProps extends ICommonProps {
  initialValues?: Partial<TUploadFormValues>;
  onSubmit: (values: TUploadFormValues) => void;
  video: File;
}

export default function UploadForm({
  initialValues = {
    name: "",
    tags: [],
  },
  onSubmit,
  video,
}: IProps) {
  // States
  const [duration, setDuration] = useState<TDuration>();

  // Effects
  useEffect(() => {
    if (video) calculateDuration(video);
  }, [video]);

  // Functions
  const calculateDuration = useCallback(async (video: File) => {
    try {
      const duration = await getDurationFromVideoFile(video);
      setDuration(formatVideoDurationFromSeconds(duration));
    } catch (err) {
      console.error("Unable to calculate duration", err);
    }
  }, []);

  const handleSubmit = async (
    values: typeof initialValues,
    setSubmitting: (value: boolean) => void
  ) => {
    onSubmit(values as any);
    setSubmitting(false);
  };

  // Render
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting)
      }
      validationSchema={UploadFormSchema}
      validateOnMount
    >
      {({ isSubmitting, setFieldValue, values, isValid }) => (
        <Form className="flex p-10 space-x-10">
          <div className="w-2/5">
            <VideoThumbnailImport
              className="w-full aspect-video video-round overflow-hidden relative border border-gray-200 bg-gray-200 transition-all duration-500"
              image={values.thumbnail}
              onChange={(image) => setFieldValue("thumbnail", image, true)}
            >
              {duration ? (
                <VideoDuration
                  className="bottom-4 right-4 z-50"
                  duration={duration}
                />
              ) : null}
            </VideoThumbnailImport>
          </div>

          <div className="w-3/5">
            <div className="space-y-6">
              <label className="block" htmlFor="tags">
                <h3 className="label">Tags</h3>

                <TagInput
                  value={values.tags!}
                  onChange={(value) => setFieldValue("tags", value, true)}
                />
              </label>

              <label className="block" htmlFor="name">
                <h3 className="label">Name</h3>

                <MultilineTextInput
                  className="input block text-left text-md outline-none bg-transparent w-full"
                  name="name"
                  value={values.name}
                  onChange={(value) => setFieldValue("name", value, true)}
                  maxLength={100}
                />

                <ErrorMessage name="name" component="div" />
              </label>
            </div>

            <Button
              className="rounded-lg mt-16"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Upload video
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
