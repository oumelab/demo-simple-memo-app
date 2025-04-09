import {Send} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {Button} from "./ui/button";
import {Textarea} from "./ui/textarea";
import clsx from "clsx";

type FormProps =
  | {
      mode: "add",
      initialValue: string;
      placeholder: string;
      addContent: (content: string, parentId?: number) => void;
      parentId?: number;
      onReplyId?: number;
      setOnReplyId?: React.Dispatch<React.SetStateAction<number | null>>;
      borderStyle?: boolean;
      updateContent?: undefined;
      memoId?: undefined;
      replyId?: undefined;
      onEditId?: {id: number, type: "memo" | "reply"} | null;
      setOnEditId?: undefined;
  }
  | {
      mode: "edit";
      initialValue: string;
      updateContent: (id: number, content: string, type: "memo" | "reply") => void;
      onEditId: {id: number, type: "memo" | "reply"};
      setOnEditId: React.Dispatch<React.SetStateAction<{id: number, type: "memo" | "reply"} | null>>;
      borderStyle: boolean;
      placeholder?: undefined;
      addContent?: undefined;
      memoId?: number;
      replyId?: number;
      parentId?: undefined;
      onReplyId?: undefined;
      setOnReplyId?: undefined;
  }
export default function Form({
  mode,
  initialValue,
  placeholder,
  borderStyle,
  addContent,
  updateContent,
  memoId,
  replyId,
  parentId,
  onReplyId,
  setOnReplyId,
  setOnEditId,
}: FormProps) {
  const [inputText, setInputText] = useState(initialValue);
  const buttonStyle = "w-24 bg-emerald-600 text-white cursor-pointer";
  const formRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.focus();
    }
  }, []);

  return (
    <div>
      <Textarea
        value={inputText}
        ref={formRef}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={placeholder}
        className={clsx("max-w-lg h-32 bg-white mb-4 border-0 shadow-lg", {
          "border shadow-none": borderStyle,
        })}
        />
        {mode === "add" && (
          <Button
            onClick={() => {
              if (parentId) {
                addContent(inputText, parentId);
                if (onReplyId && setOnReplyId) setOnReplyId(null);
              } else {
                addContent(inputText);
              }
              setInputText("");
            }}
            className={buttonStyle}
          >
            <Send />
          </Button>
        )}
        {mode === "edit" && (
          <Button
            onClick={() => {
              const type = memoId ? "memo" : "reply";
              const id = memoId ?? replyId;
              if (id) {
                updateContent(id, inputText, type);
              }
              setOnEditId(null);
              setInputText("");
            }}
            className={buttonStyle}
          >
            <Send />
          </Button>
        )}

    </div>
  );
}