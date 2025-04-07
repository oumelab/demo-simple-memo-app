import {Send} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {Button} from "./ui/button";
import {Textarea} from "./ui/textarea";
import clsx from "clsx";

type FormProps =
  | {
      mode: "memo",
      initialValue: string;
      placeholder: string;
      addMemo: (content: string) => void;
      addReply?: undefined;
      updateMemo?: undefined;
      updateReply?: undefined;
      borderStyle?: undefined;
      memoId?: undefined;
      replyId?: undefined;
      parentId?: undefined;
      onReplyIds?: undefined;
      setOnReplyIds?: undefined;
      onEditMemoIds?: undefined;
      onEditReplyIds?: undefined;
      setOnEditMemoIds?: undefined;
      setOnEditReplyIds?: undefined;
  }
  | {
      mode: "reply",
      initialValue: string;
      placeholder: string;
      addReply: (content: string, parentId: number) => void;
      parentId: number;
      onReplyIds: number[];
      setOnReplyIds: React.Dispatch<React.SetStateAction<number[]>>;
      borderStyle: boolean;
      addMemo?: undefined;
      updateMemo?: undefined;
      updateReply?: undefined;
      memoId?: undefined;
      replyId?: undefined;
      onEditMemoIds?: undefined;
      onEditReplyIds?: undefined;
      setOnEditMemoIds?: undefined;
      setOnEditReplyIds?: undefined;
  }
  | {
      mode: "editMemo";
      initialValue: string;
      updateMemo: (id: number, content: string) => void;
      onEditMemoIds: number[];
      setOnEditMemoIds: React.Dispatch<React.SetStateAction<number[]>>;
      borderStyle: boolean;
      placeholder?: undefined;
      addMemo?: undefined;
      addReply?: undefined;
      updateReply?: undefined;
      memoId: number;
      replyId?: undefined;
      parentId?: undefined;
      onReplyIds?: undefined;
      setOnReplyIds?: undefined;
      onEditReplyIds?: undefined;
      setOnEditReplyIds?: undefined;
  }
      | {
      mode: "editReply";
      initialValue: string;
      updateReply: (id: number, content: string) => void;
      onEditReplyIds: number[];
      setOnEditReplyIds: React.Dispatch<React.SetStateAction<number[]>>;
      borderStyle: boolean;
      placeholder?: undefined;
      addMemo?: undefined;
      addReply?: undefined;
      updateMemo?: undefined;
      memoId?: undefined;
      replyId: number;
      parentId?: undefined;
      onReplyIds?: undefined;
      setOnReplyIds?: undefined;
      onEditMemoIds?: undefined;
      setOnEditMemoIds?: undefined;
      };

export default function Form({
  mode,
  initialValue,
  placeholder,
  borderStyle,
  addMemo,
  addReply,
  updateMemo,
  updateReply,
  memoId,
  replyId,
  parentId,
  onReplyIds,
  setOnReplyIds,
  onEditMemoIds,
  onEditReplyIds,
  setOnEditMemoIds,
  setOnEditReplyIds,
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
        ref={mode === "memo" ? formRef : undefined}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={placeholder}
        className={clsx("max-w-lg h-32 bg-white mb-4 border-0 shadow-lg", {
          border: borderStyle,
        })}
        />
        {mode === "memo" && (
          <Button
            onClick={() => {
              addMemo?.(inputText);
              setInputText("");
            }}
            className={buttonStyle}
          >
            <Send />
          </Button>
        )}
      {mode === "reply" && (
        <Button
          onClick={() => {
            addReply?.(inputText, parentId ?? 0);
            const newOnReplyIds =
            onReplyIds?.filter((id) => id !== parentId) ?? [];
            setOnReplyIds?.(newOnReplyIds);
            setInputText("");
          }}
          className={buttonStyle}
        >
          <Send />
        </Button>
      )}
      {mode === "editMemo" && (
        <Button
          onClick={() => {
            updateMemo?.(memoId ?? 0, inputText);
            const newOnEditMemoIds =
              onEditMemoIds?.filter((id) => id !== memoId) ?? [];
            setOnEditMemoIds?.(newOnEditMemoIds);
            setInputText("");
          }}
          className={buttonStyle}
        >
          <Send />
        </Button>
      )}
      {mode === "editReply" && (
        <Button
        onClick={() => {
          updateReply?.(replyId ?? 0, inputText);
          const newOnEditReplyIds =
            onEditReplyIds?.filter((id) => id !== replyId) ?? [];
          setOnEditReplyIds?.(newOnEditReplyIds);
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