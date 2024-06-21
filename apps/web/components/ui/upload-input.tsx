import { cn } from "@/lib/utils";
import {
  ChangeEventHandler,
  PropsWithChildren,
  useEffect,
  useId,
  useRef,
} from "react";
import imageCompression from "browser-image-compression";

interface UploadInputProps extends PropsWithChildren {
  rootProps?: React.HTMLAttributes<HTMLLabelElement>;
  maxSizeKB: number;
  onError?: (e: unknown) => unknown;
  onChange?: (file: File) => unknown;
  accept?: string;
  isCompressed?: boolean;
  maxWidthOrHeight?: number;
}

export function UploadInput({
  rootProps,
  children,
  isCompressed,
  maxSizeKB = 4096,
  onError,
  onChange,
  maxWidthOrHeight = 1024,
  accept,
}: UploadInputProps): React.JSX.Element {
  const id = useId();

  const onChangeRef = useRef<UploadInputProps["onChange"]>(onChange);

  useEffect(() => {
    if (!onChange) return;

    onChangeRef.current = onChange;
  }, [onChange]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files?.length) return;

    const imageFile = e.target.files[0];
    const fileSizeInKB = imageFile.size / 1024;

    if (!isCompressed) {
      if (fileSizeInKB > maxSizeKB) {
        onError?.("File size is too big!");
        return;
      }
    }

    const options = {
      maxSizeMB: Math.round(maxSizeKB / 1024),
      maxWidthOrHeight,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);

      onChangeRef.current?.(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
      onError?.(error);
    }
  };

  return (
    <label {...rootProps} htmlFor={id}>
      {children}
      <input
        accept={accept}
        onChange={handleChange}
        id={id}
        className={cn("hidden")}
        type="file"
      />
    </label>
  );
}
